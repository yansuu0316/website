"""Create web image derivatives without changing source artwork."""
from pathlib import Path
from PIL import Image, ImageOps
import json, shutil
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist/assets'
ORIGINALS = ROOT.parent / 'zju-sis-demo-original-assets'
ORIGINALS.mkdir(exist_ok=True)
for f in list(OUT.iterdir()):
    if f.suffix.lower() in ('.jpg', '.png') and not f.name.startswith('logo') and f.name != 'stone-inscription.png':
        if not (ORIGINALS/f.name).exists(): shutil.copy2(f, ORIGINALS/f.name)
manifest = {}; report = []
hero_names = {'magnolia','students','books','go-global'}
for source in sorted(ORIGINALS.iterdir()):
    if source.suffix.lower() not in ('.jpg', '.png'): continue
    original = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    poster = source.stem.startswith('poster-')
    variants = [('full', 2000 if poster else 1920, 90 if poster else 83), ('thumb', 480 if poster else 640, 84 if poster else 80)]
    if poster: variants.append(('detail', 1000, 88))
    elif source.stem in hero_names: variants.append(('medium', 960, 82))
    entry = {}
    for kind, max_width, quality in variants:
        img = original.copy()
        if img.width > max_width: img = img.resize((max_width, round(img.height*max_width/img.width)), Image.Resampling.LANCZOS)
        if source.stem == 'magnolia' and kind == 'full': quality = 74
        name = source.stem + ('' if kind=='full' else '-'+kind) + '.webp'
        img.save(OUT/name, 'WEBP', quality=quality, method=6)
        entry[kind] = {'file':name, 'width':img.width, 'height':img.height}
    manifest[source.name] = entry
    report.append({'file':source.name,'original':source.stat().st_size,**{k:(OUT/v['file']).stat().st_size for k,v in entry.items()}})
(ROOT/'dist/media.js').write_text('const IMAGE_ASSETS = '+json.dumps(manifest,separators=(',',':'))+';\n')
(ROOT/'image-size-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
# Source files remain in the adjacent original-assets folder and in prior Git history.
for name in manifest:
    old=OUT/name
    if old.exists(): old.unlink()
print(json.dumps({'original_bytes':sum(r['original'] for r in report),'all_web_derivatives_bytes':sum(f.stat().st_size for f in OUT.iterdir() if f.is_file()),'poster_thumbnails_bytes':sum(r['thumb'] for r in report if r['file'].startswith('poster-'))}))
