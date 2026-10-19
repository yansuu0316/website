// B version only: reveal a topic's reading list beside its cover.
(() => {
  if (!document.body.matches('.editorial-version:not(.calligraphy-version)')) return;
  const interviews = [
    ['interview-wu', 'masters', '情韵人生 文心载道——吴洁敏教授访谈纪实'],
    ['interview-xu', 'masters', '译心铸典 师道传薪——许钧教授访谈纪实'],
    ['interview-shen', 'masters', '访书觅影 辨真归实——沈弘教授访谈纪实'],
    ['mentor-stories', 'stories', '弦歌不辍，芳华待灼 —— 浙江大学优秀班主任、优秀新生之友、优秀研究生德育导师专访'],
    ['interview-guo', 'masters', '译海扬帆 师者匠心——郭建中教授访谈纪实'],
    ['freshman-friends', 'stories', '用心陪伴，以爱引领：浙江大学2022级优秀“新生之友”专访'],
    ['scholarship-dai', 'stories', '国奖获得者专访：戴颖——“紫金港的戴同学”'],
    ['scholarship-zhang', 'stories', '研究生国奖专访 | 张桃红：“仰望星空，更要脚踏实地”'],
    ['alumni-invitation', 'centenary', '陌上花开，可缓缓归矣｜2026年外国语学院校友秩年返校邀请函'],
    ['history-collection', 'centenary', '百年弦歌 共叙华章：浙江大学外国语学院院史资料和实物征集公告'],
    ['alumni-council', 'centenary', '新闻 | 浙江大学外国语学院校友分会常务理事会四届四次扩大会议顺利召开']
  ];
  for (const [id, topic, title] of interviews) {
    const fullTitle = topic === 'centenary' || id === 'scholarship-zhang' ? title : topics[topic].title + ' | ' + title;
    stories[id] = {title: fullTitle, tag: topics[topic].title, body: '', source: '标题由学院提供，完整正文待补充。'};
  }
  const lists = {
    masters: interviews.filter(item => item[1] === 'masters').map(item => item[0]),
    stories: interviews.filter(item => item[1] === 'stories').map(item => item[0]),
    centenary: interviews.filter(item => item[1] === 'centenary').map(item => item[0]),
    gallery: topics.gallery.keys
  };
  topics.masters.keys = lists.masters;
  topics.centenary.keys = lists.centenary;
  topics.stories.keys = [...lists.stories, ...topics.stories.keys];
  const grid = document.querySelector('#topics .topic-grid');
  if (!grid) return;
  const covers = Array.from(grid.querySelectorAll('.topic-card')).map(a => ({key: a.hash.split('/')[1], art: a.querySelector('.topic-art').outerHTML}));
  grid.classList.add('topic-accordion');
  grid.innerHTML = covers.map(({key, art}) => {
    const topic = topics[key];
    const items = lists[key];
    return `<section class="topic-slide" data-topic="${key}"><button class="topic-cover" type="button" aria-label="展开${esc(topic.title)}内容" aria-expanded="false" aria-controls="topic-panel-${key}">${art}</button><div class="topic-panel" id="topic-panel-${key}" aria-label="${esc(topic.title)}内容" aria-hidden="true" inert><div class="topic-panel-inner"><p class="topic-panel-label">${esc(topic.title)}</p><p class="topic-panel-hint">${items.length} 篇内容 · 点按封面展开</p>${items.length ? `<ul class="topic-reading-list">${items.map(id => `<li><a href="#article/${id}">${esc(stories[id].title)}</a></li>`).join('')}</ul>` : `<p class="topic-panel-intro">${esc(topic.intro)}</p><p class="topic-panel-empty">专题内容待补充</p>`}<a class="topic-panel-more" href="#topic/${key}">浏览${esc(topic.title)}<span aria-hidden="true"> ›</span></a></div></div></section>`;
  }).join('');
  const slides = Array.from(grid.querySelectorAll('.topic-slide'));
  let active = null;
  function open(slide) {
    active = slide;
    grid.classList.toggle('has-active', Boolean(slide));
    for (const item of slides) {
      const selected = item === slide;
      item.classList.toggle('is-open', selected);
      item.querySelector('.topic-cover').setAttribute('aria-expanded', String(selected));
      const panel = item.querySelector('.topic-panel');
      panel.inert = !selected;
      panel.setAttribute('aria-hidden', String(!selected));
    }
  }
  for (const slide of slides) {
    const button = slide.querySelector('.topic-cover');
    slide.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') open(slide); });
    button.addEventListener('click', e => {
      if (e.detail > 0 && matchMedia('(hover:hover)').matches) open(slide);
      else open(active === slide ? null : slide);
    });
    slide.addEventListener('focusin', e => { if (e.target !== button || button.matches(':focus-visible')) open(slide); });
  }
  grid.addEventListener('pointerleave', () => { if (!grid.contains(document.activeElement)) open(null); });
  grid.addEventListener('focusout', () => queueMicrotask(() => { if (!grid.contains(document.activeElement) && !grid.matches(':hover')) open(null); }));
  grid.addEventListener('keydown', e => { if (e.key === 'Escape' && active) { const button = active.querySelector('.topic-cover'); button.focus(); open(null); e.preventDefault(); } });
  // Keep each original cover's artwork proportions while its neighbour slides out.
  function resize() {
    const width = grid.clientWidth;
    const mobile = matchMedia('(max-width:800px)').matches;
    grid.style.setProperty('--topic-cover-width', (mobile ? Math.min(width * .38, 180) : (width - 60) / 5.2) + 'px');
  }
  new ResizeObserver(resize).observe(grid);
  resize();
  if (/^#(?:article|topic)\//.test(location.hash)) updateRoute();
})();
