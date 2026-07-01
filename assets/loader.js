(function () {
  const LOADER_ID = 'rns-page-loader';
  const ASSET_PATH = 'assets/rns-dog-loader.png';

  function createLoader() {
    if (document.getElementById(LOADER_ID)) return document.getElementById(LOADER_ID);

    const loader = document.createElement('div');
    loader.id = LOADER_ID;
    loader.setAttribute('aria-live', 'polite');
    loader.innerHTML = `
      <div class="rns-loader-card">
        <div class="rns-loader-glow"></div>
        <img class="rns-loader-dog" src="${ASSET_PATH}" alt="RNS loading dog" decoding="async">
        <div class="rns-loader-text">Loading<span class="rns-loader-dots"></span></div>
      </div>
    `;
    document.body.prepend(loader);
    return loader;
  }

  function hideLoader() {
    const loader = document.getElementById(LOADER_ID) || createLoader();
    window.setTimeout(function () {
      loader.classList.add('is-hidden');
      document.documentElement.classList.remove('rns-loading');
    }, 450);
  }

  function showLoader() {
    const loader = document.getElementById(LOADER_ID) || createLoader();
    loader.classList.remove('is-hidden');
    document.documentElement.classList.add('rns-loading');
  }

  function isInternalNavigation(link) {
    if (!link || !link.href) return false;
    if (link.target && link.target !== '_self') return false;
    if (link.hasAttribute('download')) return false;
    if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) return false;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.hash) return false;
    return true;
  }

  document.documentElement.classList.add('rns-loading');

  document.addEventListener('DOMContentLoaded', function () {
    createLoader();

    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href]');
      if (!isInternalNavigation(link)) return;

      event.preventDefault();
      showLoader();
      window.setTimeout(function () {
        window.location.href = link.href;
      }, 320);
    });
  });

  window.addEventListener('load', hideLoader);
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) hideLoader();
  });
})();
