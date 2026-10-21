/* B-only high-resolution hero assets and story replacement. */
Object.assign(IMAGE_ASSETS,{"b-hero/magnolia": {"thumb": {"file": "b-hero/magnolia-thumb.webp", "width": 960, "height": 640}, "medium": {"file": "b-hero/magnolia-medium.webp", "width": 1920, "height": 1280}, "full": {"file": "b-hero/magnolia-full.webp", "width": 2448, "height": 1632}}, "b-hero/manuscripts": {"thumb": {"file": "b-hero/manuscripts-thumb.webp", "width": 960, "height": 540}, "medium": {"file": "b-hero/manuscripts-medium.webp", "width": 1920, "height": 1080}, "full": {"file": "b-hero/manuscripts-full.webp", "width": 3200, "height": 1800}}, "b-hero/books": {"thumb": {"file": "b-hero/books-thumb.webp", "width": 960, "height": 640}, "medium": {"file": "b-hero/books-medium.webp", "width": 1920, "height": 1280}, "full": {"file": "b-hero/books-full.webp", "width": 3113, "height": 2075}}, "b-hero/go-global": {"thumb": {"file": "b-hero/go-global-thumb.webp", "width": 960, "height": 640}, "medium": {"file": "b-hero/go-global-medium.webp", "width": 1920, "height": 1280}, "full": {"file": "b-hero/go-global-full.webp", "width": 3200, "height": 2133}}});
heroes[0].image='b-hero/magnolia';
heroes[1]={image:'b-hero/manuscripts',kicker:'',title:'“法兰西文心与阅读之光”<br>法国名人名家手稿珍品展在浙江大学盛大开幕',description:'',url:'#article/manuscripts',cta:'查看详情'};
heroes[2].image='b-hero/books';
heroes[3].image='b-hero/go-global';
setHero(0);

function syncStoryBackdrop(){
 const img=document.getElementById('hero-image');
 document.querySelector('.classic-hero').style.setProperty('--story-backdrop',`url("${img.getAttribute('src')}")`);
}
new MutationObserver(syncStoryBackdrop).observe(document.getElementById('hero-image'),{attributes:true,attributeFilter:['src']});
syncStoryBackdrop();
