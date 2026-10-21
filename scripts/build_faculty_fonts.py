"""Build B's compact portrait-section fonts from the licensed Source Han originals."""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from html import unescape
import re, argparse
p=argparse.ArgumentParser();p.add_argument('--source-dir',required=True);a=p.parse_args()
r=Path(__file__).resolve().parents[1]/'dist'
text=unescape(re.sub('<[^>]+>','',r.joinpath('editorial.html').read_text().split('<section id="faculty"')[1].split('</section>')[0]))+''.join(chr(i) for i in range(32,127))
css=[]
for source,name,family,weight in [('SourceHanSansCN-Regular','FacultySans-Regular','Faculty Sans','100 500'),('SourceHanSansCN-Bold','FacultySans-Bold','Faculty Sans','501 900'),('SourceHanSerifCN-Bold','FacultySerif-Bold','Faculty Serif','100 900')]:
 f=TTFont(Path(a.source_dir)/(source+'.otf'));opt=subset.Options();opt.name_IDs=['*'];s=subset.Subsetter(options=opt);s.populate(text=text);s.subset(f);f.flavor='woff2';f.save(r/'assets/type'/f'{name}.woff2')
 assert all(ord(c) in f.getBestCmap() for c in text if '\u4e00'<=c<='\u9fff')
 css.append(f'@font-face{{font-family:"{family}";src:url("assets/type/{name}.woff2") format("woff2");font-weight:{weight};font-style:normal;font-display:swap}}')
p=r/'editorial-faculty.css';body=re.sub(r'@font-face\{[^}]+\}\n?','',p.read_text());p.write_text('\n'.join(css)+'\n'+body)
print('Faculty fonts generated; all Chinese characters covered.')
