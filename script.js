const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const filterButtons = document.querySelectorAll('.filter-button');
const productCards = document.querySelectorAll('.product-card');
const signupForm = document.querySelector('.signup-form');
const formMessage = document.querySelector('.form-message');
const year = document.querySelector('#year');
const bagCount = document.querySelector('.bag-count');
const addButtons = document.querySelectorAll('.add-button');
const bagButton = document.querySelector('.bag-button');
const bagDrawer = document.querySelector('.bag-drawer');
const bagOverlay = document.querySelector('.bag-overlay');
const bagItemsElement = document.querySelector('.bag-items');
const bagEmpty = document.querySelector('.bag-empty');
const bagTotalElement = document.querySelector('.bag-total');
const bagItems = [];
let bagTotal = 0;

document.body.classList.add('js-enabled');

const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
const heroDoneButton = document.querySelector('.hero-done-button');
const heroNextLabel = document.querySelector('.hero-next-label');
let currentSlideIndex = 0;
let heroAdvanceTimer = null;
let isWaitingForNextSlide = false;

const updateHeroControls = () => {
  if (!heroDoneButton || !heroNextLabel) return;

  if (isWaitingForNextSlide) {
    heroDoneButton.disabled = true;
    heroDoneButton.textContent = 'Done';
    heroNextLabel.textContent = 'Next slide in 3s';
    return;
  }

  heroDoneButton.disabled = false;
  heroDoneButton.textContent = 'Done';
  heroNextLabel.textContent = 'Ready for the next slide';
};

const showSlide = (index) => {
  if (!heroSlides.length) return;

  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === index);
  });

  currentSlideIndex = index;
  clearTimeout(heroAdvanceTimer);
  heroAdvanceTimer = null;
  isWaitingForNextSlide = false;
  updateHeroControls();
};

if (heroSlides.length > 1 && heroDoneButton && heroNextLabel) {
  heroDoneButton.addEventListener('click', () => {
    if (isWaitingForNextSlide) return;

    isWaitingForNextSlide = true;
    updateHeroControls();

    heroAdvanceTimer = setTimeout(() => {
      const nextIndex = (currentSlideIndex + 1) % heroSlides.length;
      showSlide(nextIndex);
    }, 3000);
  });
}

updateHeroControls();

const revealItems = document.querySelectorAll('.manifesto, .collection, .feature-story, .newsletter, .site-footer');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => {
    item.classList.add('reveal');
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    productCards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

document.querySelectorAll('.heart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const isSaved = button.classList.toggle('is-saved');
    button.textContent = isSaved ? '♥' : '♡';
    button.setAttribute('aria-label', isSaved ? 'Remove from wishlist' : 'Add to wishlist');
  });
});

const renderBag = () => {
  bagCount.textContent = bagItems.length;
  bagTotalElement.textContent = `$${bagItems.reduce((total, item) => total + item.price, 0)}`;
  bagEmpty.hidden = bagItems.length > 0;
  bagItemsElement.innerHTML = bagItems.map((item, index) => `
    <div class="bag-item">
      <div><h3>${item.name}</h3><p>${item.detail}</p></div>
      <div class="bag-item-side"><strong>$${item.price}</strong><button class="remove-item" type="button" data-index="${index}">Remove</button></div>
    </div>
  `).join('');
};

const setBagOpen = (isOpen) => {
  bagDrawer.classList.toggle('is-open', isOpen);
  bagOverlay.classList.toggle('is-open', isOpen);
  bagDrawer.setAttribute('aria-hidden', !isOpen);
  document.body.classList.toggle('bag-is-open', isOpen);
};

bagButton.addEventListener('click', () => setBagOpen(true));
document.querySelectorAll('[data-close-bag]').forEach((button) => button.addEventListener('click', () => setBagOpen(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setBagOpen(false);
});

addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    const detail = card.querySelector('.product-meta p').textContent;
    const price = Number(card.querySelector('.product-action strong').textContent.replace('$', ''));
    bagItems.push({ name, detail, price });
    bagTotal += 1;
    renderBag();
    button.classList.add('is-added');
    button.textContent = 'Added';
    setBagOpen(true);
  });
});

bagItemsElement.addEventListener('click', (event) => {
  if (!event.target.matches('.remove-item')) return;
  bagItems.splice(Number(event.target.dataset.index), 1);
  renderBag();
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = 'Thank you. You are on the list.';
  signupForm.reset();
});

year.textContent = new Date().getFullYear();
