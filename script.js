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
const heroPrevButton = document.querySelector('.hero-prev-button');
const heroNextButton = document.querySelector('.hero-next-button');
const heroDots = Array.from(document.querySelectorAll('.hero-dot'));
const heroSlideCount = document.querySelector('.hero-slide-count');
let currentSlideIndex = 0;

const showSlide = (index) => {
  if (!heroSlides.length) return;

  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === index);
    heroDots[slideIndex]?.classList.toggle('is-current', slideIndex === index);
    if (slideIndex === index) {
      heroDots[slideIndex]?.setAttribute('aria-current', 'true');
    } else {
      heroDots[slideIndex]?.removeAttribute('aria-current');
    }
  });

  currentSlideIndex = index;
  if (heroSlideCount) {
    heroSlideCount.innerHTML = `${String(index + 1).padStart(2, '0')} <i>/</i> ${String(heroSlides.length).padStart(2, '0')}`;
  }
};

if (heroSlides.length > 1) {
  heroPrevButton?.addEventListener('click', () => {
    showSlide((currentSlideIndex - 1 + heroSlides.length) % heroSlides.length);
  });
  heroNextButton?.addEventListener('click', () => {
    showSlide((currentSlideIndex + 1) % heroSlides.length);
  });
  heroDots.forEach((dot) => {
    dot.addEventListener('click', () => showSlide(Number(dot.dataset.slideIndex)));
  });
}

const heroSlider = document.querySelector('.hero-slider');
const canTilt = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
if (heroSlider && canTilt.matches) {
  heroSlider.addEventListener('pointermove', (event) => {
    const bounds = heroSlider.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const activeImage = heroSlider.querySelector('.hero-slide.theme-1.is-active .hero-image');
    activeImage?.style.setProperty('--parallax-x', `${x * -12}px`);
    activeImage?.style.setProperty('--parallax-y', `${y * -10}px`);
  });
  heroSlider.addEventListener('pointerleave', () => {
    heroSlider.querySelectorAll('.hero-image').forEach((image) => {
      image.style.setProperty('--parallax-x', '0px');
      image.style.setProperty('--parallax-y', '0px');
    });
  });

  productCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty('--tilt-x', `${x * 5}deg`);
      card.style.setProperty('--tilt-y', `${y * -5}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

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
