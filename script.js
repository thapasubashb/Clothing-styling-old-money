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
const heroSection = document.querySelector('.hero');
let currentSlideIndex = 0;

const showSlide = (index) => {
  if (!heroSlides.length) return;

  heroSection?.classList.toggle('is-image-slide', index === 0);
  heroSection?.classList.toggle('is-heritage-slide', index === 1);
  heroSection?.classList.toggle('is-coastal-slide', index === 2);
  heroSection?.classList.toggle('is-evening-slide', index === 3);
  heroSection?.classList.toggle('is-escape-slide', index === 4);
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

const shirtColors = [
  { name: 'White', hex: '#f4f1e8', family: 'light' },
  { name: 'Ivory', hex: '#e8dfcf', family: 'light' },
  { name: 'Sky blue', hex: '#b9d0d5', family: 'blue' },
  { name: 'Sage', hex: '#a1aa91', family: 'green' },
  { name: 'Chambray', hex: '#718b9a', family: 'blue' },
  { name: 'Dusty rose', hex: '#d9b9b0', family: 'warm' },
  { name: 'Navy', hex: '#314858', family: 'dark' },
];
const trouserColors = [
  { name: 'Sand', hex: '#c4ad8a', family: 'light' },
  { name: 'Stone', hex: '#a99c89', family: 'light' },
  { name: 'Ecru', hex: '#e7dfcf', family: 'light' },
  { name: 'Olive', hex: '#73765b', family: 'green' },
  { name: 'Tobacco', hex: '#8c5d42', family: 'warm' },
  { name: 'Navy', hex: '#344959', family: 'dark' },
  { name: 'Charcoal', hex: '#50514e', family: 'dark' },
];
const pairingGuide = document.querySelector('.pairing-guide');

if (pairingGuide) {
  const shirtPalette = pairingGuide.querySelector('.shirt-colors');
  const trouserPalette = pairingGuide.querySelector('.trouser-colors');
  const combinations = pairingGuide.querySelector('.outfit-combinations');
  const outfitName = pairingGuide.querySelector('#outfit-name');
  const outfitTip = pairingGuide.querySelector('#outfit-tip');
  const randomOutfitButton = pairingGuide.querySelector('#random-outfit');
  const combinationButtons = [];
  const shirtButtons = [];
  const trouserButtons = [];
  let selectedShirt = 0;
  let selectedTrouser = 0;

  const makePaletteButton = (color, index, garment) => {
    const button = document.createElement('button');
    button.className = 'color-option';
    button.type = 'button';
    button.setAttribute('aria-label', `Select ${color.name} ${garment} colour`);
    button.setAttribute('aria-pressed', 'false');
    button.style.setProperty('--swatch-color', color.hex);
    button.innerHTML = '<span class="color-option-swatch" aria-hidden="true"></span>';
    const name = document.createElement('span');
    name.className = 'color-option-name';
    name.textContent = color.name;
    button.append(name);
    button.addEventListener('click', () => {
      if (garment === 'shirt') selectedShirt = index;
      else selectedTrouser = index;
      updateOutfitPreview();
    });
    return button;
  };

  shirtColors.forEach((color, index) => {
    const button = makePaletteButton(color, index, 'shirt');
    shirtButtons.push(button);
    shirtPalette.append(button);
  });
  trouserColors.forEach((color, index) => {
    const button = makePaletteButton(color, index, 'trouser');
    trouserButtons.push(button);
    trouserPalette.append(button);
  });

  shirtColors.forEach((shirt, shirtIndex) => {
    trouserColors.forEach((trouser, trouserIndex) => {
      const button = document.createElement('button');
      button.className = 'outfit-combination';
      button.type = 'button';
      button.setAttribute('aria-label', `Pair ${shirt.name} shirt with ${trouser.name} trousers`);
      button.setAttribute('aria-pressed', 'false');
      button.style.setProperty('--shirt-color', shirt.hex);
      button.style.setProperty('--trouser-color', trouser.hex);
      button.dataset.shirtIndex = shirtIndex;
      button.dataset.trouserIndex = trouserIndex;
      button.innerHTML = `
        <span class="combination-garment">
          <span class="combination-swatch combination-shirt" aria-hidden="true"></span>
          <span class="combination-label"><small>Shirt</small><strong>${shirt.name}</strong></span>
        </span>
        <span class="combination-arrow" aria-hidden="true">+</span>
        <span class="combination-garment">
          <span class="combination-swatch combination-trouser" aria-hidden="true"></span>
          <span class="combination-label"><small>Trousers</small><strong>${trouser.name}</strong></span>
        </span>
      `;
      button.addEventListener('click', () => {
        selectedShirt = shirtIndex;
        selectedTrouser = trouserIndex;
        updateOutfitPreview();
      });
      combinationButtons.push(button);
      combinations.append(button);
    });
  });

  function updateOutfitPreview() {
    const shirt = shirtColors[selectedShirt];
    const trouser = trouserColors[selectedTrouser];
    const isTonal = shirt.family === trouser.family;
    const preview = pairingGuide.querySelector('.garment-stage');
    preview.style.setProperty('--shirt-color', shirt.hex);
    preview.style.setProperty('--trouser-color', trouser.hex);
    outfitName.textContent = `${shirt.name} shirt / ${trouser.name} trousers`;
    outfitTip.textContent = isTonal
      ? 'A tonal pairing. Mix linen, cotton, or a subtle texture for definition.'
      : 'An easy colour balance. Finish simply with tan or dark-brown leather.';

    combinationButtons.forEach((button) => {
      const isSelected = Number(button.dataset.shirtIndex) === selectedShirt
        && Number(button.dataset.trouserIndex) === selectedTrouser;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });
    shirtButtons.forEach((button, index) => {
      const isSelected = index === selectedShirt;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });
    trouserButtons.forEach((button, index) => {
      const isSelected = index === selectedTrouser;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });
  }

  randomOutfitButton?.addEventListener('click', () => {
    const choices = combinationButtons.filter((button) => (
      Number(button.dataset.shirtIndex) !== selectedShirt
      || Number(button.dataset.trouserIndex) !== selectedTrouser
    ));
    const choice = choices[Math.floor(Math.random() * choices.length)];
    selectedShirt = Number(choice.dataset.shirtIndex);
    selectedTrouser = Number(choice.dataset.trouserIndex);
    updateOutfitPreview();
  });

  updateOutfitPreview();
}

const heroSlider = document.querySelector('.hero-slider');
const canTilt = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
if (heroSlider && canTilt.matches) {
  heroSlider.addEventListener('pointermove', (event) => {
    const bounds = heroSlider.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const activeSlide = heroSlider.querySelector('.hero-slide.is-active');
    const activeImage = activeSlide?.querySelector('.hero-image');
    if (activeSlide !== heroSlides[0]) {
      activeImage?.style.setProperty('--parallax-x', `${x * -12}px`);
      activeImage?.style.setProperty('--parallax-y', `${y * -10}px`);
    }
    const depthCard = activeSlide?.querySelector('.hero-detail-card');
    depthCard?.style.setProperty('--float-x', `${x * 8}px`);
    depthCard?.style.setProperty('--float-y', `${y * 7}px`);
    depthCard?.style.setProperty('--float-rotate-x', `${y * -4}deg`);
    depthCard?.style.setProperty('--float-rotate-y', `${x * 5}deg`);
  });
  heroSlider.addEventListener('pointerleave', () => {
    heroSlider.querySelectorAll('.hero-image').forEach((image) => {
      image.style.setProperty('--parallax-x', '0px');
      image.style.setProperty('--parallax-y', '0px');
    });
    heroSlider.querySelectorAll('.hero-detail-card').forEach((card) => {
      card.style.setProperty('--float-x', '0px');
      card.style.setProperty('--float-y', '0px');
      card.style.setProperty('--float-rotate-x', '0deg');
      card.style.setProperty('--float-rotate-y', '0deg');
    });
  });

  productCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty('--tilt-x', `${x * 8}deg`);
      card.style.setProperty('--tilt-y', `${y * -8}deg`);
      const productImage = card.querySelector('.product-image');
      productImage?.style.setProperty('--shine-x', `${(x + 0.5) * 100}%`);
      productImage?.style.setProperty('--shine-y', `${(y + 0.5) * 100}%`);
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
