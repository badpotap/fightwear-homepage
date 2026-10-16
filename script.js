(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#main-nav');
  const catalogToggle = document.querySelector('.catalog-toggle');
  const catalogMenu = document.querySelector('#catalog-menu');
  const toast = document.querySelector('#toast');
  const cartCount = document.querySelector('#cart-count');
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('#search-input');
  const searchResults = document.querySelector('#search-results');
  let cartItems = 0;
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  catalogToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = catalogMenu.classList.toggle('is-open');
    catalogToggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-catalog')) {
      catalogMenu.classList.remove('is-open');
      catalogToggle.setAttribute('aria-expanded', 'false');
    }
    if (!event.target.closest('.search')) searchResults.classList.remove('is-visible');
  });

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) {
      searchInput.focus();
      searchResults.textContent = 'Введите название товара, бренда или направления.';
      searchResults.classList.add('is-visible');
      return;
    }
    searchResults.textContent = `Демо-поиск: «${query}». Подключите каталог товаров, чтобы показывать реальные результаты.`;
    searchResults.classList.add('is-visible');
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (!query) {
      searchResults.classList.remove('is-visible');
      return;
    }
    searchResults.textContent = `Поиск по запросу «${query}» будет работать после подключения каталога.`;
    searchResults.classList.add('is-visible');
  });

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      cartItems += 1;
      cartCount.textContent = String(cartItems);
      showToast('Товар добавлен в демо-корзину');
    });
  });

  document.querySelector('#cart-button').addEventListener('click', () => {
    showToast(cartItems ? `В демо-корзине товаров: ${cartItems}` : 'Корзина пока пуста');
  });

  document.querySelector('#wishlist-button').addEventListener('click', () => {
    showToast('Избранное доступно в демонстрационном режиме');
  });

  document.querySelectorAll('.category-card').forEach((card) => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      showToast(`Выбрана категория «${category}» — подключите каталог для перехода к товарам`);
    });
  });
})();
