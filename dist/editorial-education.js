// B version: programme titles and images supplied by the college.
(() => {
  const groups = {
    undergraduate: {
      label: '本科教育', image: 'education/undergraduate.png', width: 558, height: 372,
      titles: ['国际组织精英人才培养计划', '外国语学院特色培养项目介绍', '教授带你逛专业——英语', '教授带你逛专业——翻译']
    },
    graduate: {
      label: '研究生教育', image: 'education/graduate.png', width: 368, height: 218,
      titles: ['国际组织与国际交流专业介绍', '英语语言文学专业介绍', '外国语言学及应用语言学专业介绍', '德语语言文学专业介绍']
    },
    international: {
      label: '国际课程中心', image: 'education/international.jpg', width: 830, height: 618,
      titles: ['英语国家留学项目介绍', '多语种国家留学项目介绍', '行业培训介绍', '其他']
    }
  };
  const keys = [];
  Object.entries(groups).forEach(([name, group]) => {
    group.keys = group.titles.map((title, index) => {
      const key = `education-${name}-${index}`;
      stories[key] = {title, tag: `教育教学 · ${group.label}`, body: '', source: '栏目标题与配图由学院提供。'};
      if (index === 0) stories[key].image = group.image;
      keys.push(key);
      return key;
    });
  });
  window.B_EDUCATION = {
    keys,
    render(type) {
      const name = groups[type] ? type : 'undergraduate';
      const group = groups[name];
      const panel = document.getElementById('education-content');
      panel.setAttribute('aria-labelledby', `education-${name}`);
      panel.innerHTML = `<div class="education-panel">
        <a class="education-feature" href="#article/${group.keys[0]}">
          <div class="education-program-image"><img src="assets/${group.image}" width="${group.width}" height="${group.height}" alt="${esc(group.titles[0])}" loading="lazy" decoding="async"></div>
          <div><h3>${esc(group.titles[0])}</h3></div>
        </a>
        <div class="education-list">${group.titles.slice(1).map((title, index) => `<a class="list-link" href="#article/${group.keys[index + 1]}"><h3>${esc(title)}</h3></a>`).join('')}</div>
      </div>`;
    }
  };
})();
