"""Build fixed motto artwork and compact, self-hosted fonts. Requires fonttools + brotli.

Pass licensed original font paths; original font files are not copied to the site.
Re-run after adding copy to include new characters in the web-font subsets.
"""
import argparse
import html
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

p = argparse.ArgumentParser()
p.add_argument('--script-font', required=True)
p.add_argument('--script-index', type=int, default=2)
p.add_argument('--sans-regular', required=True)
p.add_argument('--sans-bold', required=True)
p.add_argument('--serif-bold', required=True)
a = p.parse_args()
root = Path(__file__).resolve().parents[1] / 'dist'
out = root / 'assets' / 'type'
out.mkdir(parents=True, exist_ok=True)
font = TTFont(a.script_font, fontNumber=a.script_index)
glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
upm = font['head'].unitsPerEm
phrases = {'world': '语通世界', 'china': '言载九州', 'future': '文传未来',
           'culture': '化成天下', 'study': '学贯中西', 'knowledge': '格物致知',
           'research': '学贯中西　格物致知', 'seal': '求是', 'hello': '你好'}
for key, text in phrases.items():
    vertical = key == 'seal'
    parts = []
    for i, char in enumerate(text):
        if char.isspace():
            continue
        pen = SVGPathPen(glyphs)
        glyphs[cmap[ord(char)]].draw(pen)
        x = .05 * upm if vertical else (i * 1.1 + .05) * upm
        y = (i * 1.1 + .95) * upm if vertical else .95 * upm
        parts.append(f'<path transform="translate({x:g} {y:g}) scale(1 -1)" d="{pen.getCommands()}"/>')
    width = 1.1 if vertical else len(text) * 1.1
    height = len(text) * 1.1 if vertical else 1.2
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width*upm:g} {height*upm:g}" fill="#b21e2b"><title>{html.escape(text)}</title>{"".join(parts)}</svg>'
    (out / f'motto-{key}.svg').write_text(svg)

text = ''.join(f.read_text() for f in root.iterdir() if f.suffix in ['.html', '.js', '.css'])
text += ''.join(chr(i) for i in range(32, 127))
for source, name in [(a.sans_regular, 'CampusSans-Regular'),
                     (a.sans_bold, 'CampusSans-Bold'),
                     (a.serif_bold, 'CampusSerif-Bold')]:
    f = TTFont(source)
    options = subset.Options()
    options.name_IDs = ['*']
    options.name_legacy = True
    options.name_languages = ['*']
    sub = subset.Subsetter(options=options)
    sub.populate(text=text)
    sub.subset(f)
    # Give the subset a distinct family name, preserving copyright/license records.
    for n in f['name'].names:
        if n.nameID in [1, 3, 4, 6, 16]:
            n.string = name.encode(n.getEncoding(), errors='replace')
    if 'CFF ' in f:
        f['CFF '].cff.fontNames = [name]
        top = f['CFF '].cff.topDictIndex[0]
        top.FamilyName = name
        top.FullName = name
    f.flavor = 'woff2'
    target = out / f'{name}.woff2'
    f.save(target)
    print(target.name, target.stat().st_size)
