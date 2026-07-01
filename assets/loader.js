(function () {
  const LOADER_ID = 'rns-page-loader';
  const LOADER_IMAGE_SRC = 'assets/rns-dog-loader.png';
  const TRANSITION_DELAY = 320;

  function createLoader() {
    const existing = document.getElementById(LOADER_ID);
    if (existing) return existing;

    const loader = document.createElement('div');
    loader.id = LOADER_ID;
    loader.className = 'rns-page-loader';
    loader.setAttribute('aria-live', 'polite');
    loader.setAttribute('aria-label', 'Loading');

    loader.innerHTML = `
      <div class="rns-loader-card">
        <div class="rns-loader-glow" aria-hidden="true"></div>
        <img class="loader-dog rns-loader-dog" src="${LOADER_IMAGE_SRC}" alt="RNS loading dog" decoding="async">
        <div class="rns-loader-text">Loading<span class="rns-loader-dots"></span></div>
      </div>
    `;

    document.body.prepend(loader);
    return loader;
  }

  function showLoader() {
    const loader = createLoader();
    document.documentElement.classList.add('rns-loading');
    loader.classList.remove('is-hidden');
  }

  function hideLoader() {
    const loader = createLoader();
    window.setTimeout(function () {
      loader.classList.add('is-hidden');
      document.documentElement.classList.remove('rns-loading');
    }, 450);
  }

  function isInternalPageLink(link) {
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
      if (!isInternalPageLink(link)) return;

      event.preventDefault();
      showLoader();

      window.setTimeout(function () {
        window.location.href = link.href;
      }, TRANSITION_DELAY);
    });
  });

  window.addEventListener('load', hideLoader);
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) hideLoader();
  });
})();
