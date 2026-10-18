const posters = [
 {title:'人工智能的中外诗歌生成研究',speaker:'金中 · 西安交通大学',date:'23',month:'OCT',time:'10月23日 15:30—17:30（海报未标年份）',venue:'紫金港校区东5教学楼1层青荷吧',image:'poster-1.png',summary:'当人工智能与诗歌相遇，探索文学创作与数理生成之间的跨学科对话。',tag:'人工智能 × 文学'},
 {title:'Making Worlds and Archipelagic Critique',speaker:'Maria Luisa Torres Reyes',date:'23',month:'OCT',time:'2026年10月23日 09:00—12:00',venue:'紫金港校区东五306',image:'poster-2.png',summary:'以群岛批评为方法，讨论共同世界、关系与不平等，以及改变的可能。',tag:'读书与治学 · 第二讲'},
 {title:'How to Write a Qualified Paper',speaker:'Vincenz Serrano',date:'23',month:'OCT',time:'2026年10月23日 09:00—12:00',venue:'紫金港校区东五306',image:'poster-3.png',summary:'走近 Kritika Kultura，了解文学与文化研究期刊的编辑理念与投稿实践。',tag:'读书与治学 · 第三讲'},
 {title:'Prospero’s Magic',speaker:'Charles Burnett',date:'27',month:'OCT',time:'2026年10月27日 19:00—21:00',venue:'紫金港校区东五201',image:'poster-4.png',summary:'从自然魔法的历史文献出发，重新阅读莎士比亚《暴风雨》中的奇幻世界。',tag:'中世纪与文艺复兴研究 · 第68讲'},
 {title:'让文学翻译成为一种生活方式',speaker:'余泽民',date:'22',month:'OCT',time:'2026年10月22日 14:00—16:00',venue:'图书信息楼C楼405会议室',image:'poster-5.png',summary:'在语言之间行走，在文学之中生活。听翻译家分享阅读、翻译与文化交流。',tag:'人文系列98 · 翻译系列108'}
];
const stories = {
 award:{title:"外院学生喜获浙江大学第十届学生人文社会科学研究优秀成果奖",image:"award.jpg",tag:"学子风采 · 科研成果",body:"以青春之思，回应人文之问。在探索与研究中积累学术能力，让思考沉淀为成果。",source:"获奖标题与图片由用户提供；简介为设计演示编排。"},
 books:{title:'“国际组织与全球治理”丛书发布会',image:'books.jpg',tag:'学术出版',body:'围绕国际组织与全球治理展开学术交流，以多语种、多学科的视角回应世界议题。',source:'用户提供的发布会照片；简介为设计演示编排。'},
 france:{title:'浙江大学法国研究院揭牌仪式',image:'france.jpg',tag:'国际交流',body:'以语言为桥，连接中外学术视野，拓展区域国别研究与跨文化交流。',source:'用户提供的揭牌仪式照片；简介为设计演示编排。'},
 visiting:{title:'在交流中拓宽学术视野',image:'visiting.jpg',tag:'学术交流',body:'来自不同文化背景的学者相聚外院，在面对面的交流中开启新的对话。',source:'用户提供的合影；人物、日期与具体活动名称未核验，采用示意标题。'},
 freshmen:{title:'外国语学院2026级迎新大会暨开学第一课',image:'students.jpg',tag:'教育教学',body:'从外院出发，向世界生长。以求是之心开启大学生活，在学习与交流中拓展眼界。',source:'用户提供的迎新大会照片；简介为设计演示编排。'},
 translation:{title:'第四届“外研社·国才杯”“理解当代中国”浙江大学大学生外语能力大赛英语笔译赛道竞赛顺利进行',tag:'此刻外院 · 2026.10.16',body:'以语言表达中国，以翻译连接世界。',source:'标题与日期来自学院官网首页；正文尚未接入，以上一句为演示引言。'},
 ai:{title:'拥抱AI变革、深耕立德树人——外国语学院求是导师学校暨孙凌云教授专题报告顺利举行',tag:'此刻外院 · 2026.10.12',body:'围绕人工智能时代的人才培养与教育教学展开思考。',source:'标题与日期来自学院官网首页；正文尚未接入，以上一句为演示引言。'},
 oriental:{title:'第二届东方古典研究会于浙江大学召开',tag:'学术动态 · 2026.10.13',body:'诸贤聚论“东亚的知识与传播”“诗画融合的深层与表层”。',source:'标题、日期与主题来自学院官网首页，详细报道请见原官网。'},
 farming:{title:'外国语学院开展2026年秋冬学期“种地吧”劳育实践项目',image:'farming.jpg',tag:'学子风采 · 劳育实践',body:'走进田间，在劳动中感受成长。把课堂延伸到土地，在躬身实践中收获新的认识。',source:'活动标题与图片由用户提供；简介为设计演示编排。'},
 goglobal:{title:'浙江大学“致远”计划“Go Global”研究生社会实践顺利收官',image:'go-global.jpg',tag:'国际交流 · 社会实践',body:'走向更广阔的世界，在真实的交流与实践中拓展国际视野，让所学与世界相连。',source:'活动标题与图片由用户提供；简介为设计演示编排。'},
 xianju:{title:'外国语学院赴仙居暑期社会实践总结仪式顺利举行',image:'xianju.jpg',tag:'学子风采 · 社会实践',body:'把青春的足迹写在实践现场，在交流、观察与行动中积累成长的力量。',source:'活动标题与图片由用户提供；简介为设计演示编排。'}
};
const notices = [
 {date:'06.29',category:'admissions',title:'关于2027年硕士研究生招生部分专业初试科目调整的公告'},
 {date:'10.16',category:'academic',title:'外国语学院2026年研究机构负责人任期期满换届工作实施方案'},
 {date:'10.15',category:'academic',title:'关于清源学社“领航”系列活动的讲座通知'},
 {date:'10.14',category:'academic',title:'关于牛津大学访问生宣讲会的通知'}
];

Object.assign(stories, {
 manuscripts:{title:'“法兰西文心与阅读之光——法国名人名家手稿珍品展”在浙江大学盛大开幕',image:'manuscripts.jpg',tag:'国际交流 · 文化交流',body:'走近法国名人名家的手稿，在阅读中感受文学与思想的传承。',source:'活动标题与图片由用户提供；简介为设计演示编排。'},
 fitness:{title:'外展英姿，语健导学 | 外院春夏学期“趣味健身”系列活动圆满收官！',image:'fitness.jpg',tag:'学子风采 · 文体活动',body:'在趣味健身中舒展身心，以运动展现外院学子的青春活力。',source:'活动标题与图片由用户提供；简介为设计演示编排。'},
 unesco:{title:'从浙大到UNESCO阿克拉办事处：黄经宸的国际组织实践之路',image:'unesco.jpg',tag:'学子风采 · 国际组织实践',body:'从校园走向国际组织，关注黄经宸在联合国教科文组织阿克拉办事处的实践经历。',source:'人物报道标题与图片由用户提供；简介为设计演示编排。'},
 faculty:{title:'浙江大学法国研究院兼任教授王战、兼聘教授谢贵平、辛越优欢迎仪式暨法国研究院工作会议举行',image:'france-faculty.jpg',tag:'此刻外院 · 学术队伍',body:'欢迎兼任、兼聘教授加入，共同交流法国研究院工作。',source:'活动标题与图片由用户提供；简介为设计演示编排。'},
 workshop:{title:'“语言演化与计算”国际工作坊在浙江大学举行',image:'language-workshop.jpg',tag:'学术动态 · 国际工作坊',body:'围绕语言演化与计算展开对话，关注语言研究与计算方法的交汇。',source:'活动标题与图片由用户提供；简介为设计演示编排。'}
});

Object.assign(stories, {
 training:{title:'汲取“赶考”奋进力量，筑牢外语教育根基——浙江大学外国语学院赴西柏坡举办“党建引领高质量发展”专题培训班',image:'xibaipo.jpg',tag:'此刻外院 · 党建引领',body:'赴西柏坡开展专题培训，将学习收获与外语教育、高质量发展相结合。',source:'活动标题与图片由用户提供；简介为设计演示编排。'},
 semester:{title:'外国语学院召开2026—2027学年秋冬学期开学前工作会议',image:'semester-meeting.jpg',tag:'此刻外院 · 学院工作',body:'聚焦新学期学院工作，为秋冬学期各项工作有序开展做好准备。',source:'会议标题与图片由用户提供；简介为设计演示编排。'}
});
