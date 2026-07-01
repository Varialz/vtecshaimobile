(function(){
  var dogSrc="data:image/webp;base64,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";
  function ensureLoader(){
    var loader=document.getElementById('page-loader');
    if(loader) return loader;
    loader=document.createElement('div');
    loader.id='page-loader';
    loader.className='loader-show';
    loader.innerHTML='<div class="loader-dog-wrap"><img class="loader-dog" src="'+dogSrc+'" alt="Loading"></div><div class="loader-text">Loading<span class="loader-dots"></span></div>';
    document.body.insertBefore(loader,document.body.firstChild);
    return loader;
  }
  var loader=ensureLoader();
  window.addEventListener('pageshow',function(){
    loader.classList.remove('loader-show');
    loader.classList.add('loader-hidden');
  });
  window.addEventListener('load',function(){
    setTimeout(function(){
      loader.classList.remove('loader-show');
      loader.classList.add('loader-hidden');
    },450);
  });
  document.addEventListener('click',function(e){
    var link=e.target.closest && e.target.closest('a[href]');
    if(!link) return;
    var href=link.getAttribute('href') || '';
    if(link.target==='_blank' || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
    try{
      var url=new URL(link.href,window.location.href);
      if(url.origin!==window.location.origin) return;
    }catch(err){return;}
    e.preventDefault();
    loader.classList.remove('loader-hidden');
    loader.classList.add('loader-show');
    setTimeout(function(){ window.location.href=link.href; },260);
  },true);
})();