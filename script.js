'use strict';

//#region 01 Model window
/**
 * show model window for register form
 */
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModals = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModals.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//#endregion

//#region 02 btn Learn more effect
/**
 * when clicked, scrolling into next section,
 */

const btnLearnMoreScrollTo = document.querySelector('.btn--scroll-to');

btnLearnMoreScrollTo.addEventListener('click', function (e) {
  const section1 = document.querySelector('#section--1');
  section1.scrollIntoView({ behavior: 'smooth' });
  // console.log(e.target);
  // console.log(e.currentTarget);
});
//#endregion

//#region 03 nav bar scrolling
/**
 *  click buttons ， scroll into section
 *
 */
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //get the element form bubble event， if it‘s an a tag
  if (e.target.classList.contains('nav__link')) {
    //get the element to scroll in to
    const link = e.target.getAttribute('href');
    link !== '#'
      ? document.querySelector(link).scrollIntoView({ behavior: 'smooth' })
      : '';
  }
});
//#endregion

//#region 04 tab container
/**
 * click tab, swap in corresponding area
 */
//using event deligate
const tabContainer = document.querySelector('.operations__tab-container');

tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  //get the button element(e.target could be a descendant )
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  // console.log(this);

  //for all btns
  [...this.children].forEach(el => {
    //remove active first
    if (el.classList.contains('operations__tab--active')) {
      //remove tab
      el.classList.remove('operations__tab--active');
      //remove content
      this.parentElement
        .querySelector(`.operations__content--${el.dataset.tab}`)
        .classList.remove('operations__content--active');
    }
  });

  clicked.classList.add('operations__tab--active');

  this.parentElement
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  //2 激活内容

  //console.log(e.target.dataset.tab);
});
//#endregion

//#region 05 fade out effect on navbar btns
/**
 * fade out effect
 */
const displayNFade = function (e) {
  const overed = e.target;
  //get the bubble event
  const logo = nav.querySelector('img');
  const allLinks = nav.querySelectorAll('.nav__link');
  if (overed.classList.contains('nav__link')) {
    //check if that element is targeted
    allLinks.forEach(el => {
      if (el !== e.target) el.style.opacity = this;
    });
    logo.style.opacity = this;
    // set opacity to 0.5 for other targeted elements
  } else if (overed.classList.contains('nav__logo')) {
    allLinks.forEach(el => {
      el.style.opacity = this;
    });
  }
};

const nav = document.querySelector('nav');
nav.addEventListener('mouseover', displayNFade.bind(0.5));

nav.addEventListener('mouseout', displayNFade.bind(1));
//#endregion

//#region 06 sticky nav bar
/**
 * sticky nav bar when scroll down
 */
const header = document.querySelector('header');
const intersectionCB = function (entries, observer) {
  if (!entries[0].isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const configObj = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};
const observer = new IntersectionObserver(intersectionCB, configObj);
observer.observe(header);
//#endregion

//#region 07 fade in effect on sections
/**
 * when viewpoint reach the section，
 * fade in effect with move up a bit scroll down
 * for each section
 */
//callback function
const sectionObserverCBF = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  //when animation effect finished,
  //there is no need to leave a scroll margin top
  entry.target.style.scrollMarginTop = '0rem';
  observer.unobserve(entry.target);
};

//configration object
const sectionConfigObj = {
  root: null,
  threshold: 0.2,
};
//create observer
const sectionObserver = new IntersectionObserver(
  sectionObserverCBF,
  sectionConfigObj
);

//get all sections
const allSections = document.querySelectorAll('.section');

//observe all sections
allSections.forEach(section => {
  section.classList.add('section--hidden');

  //set a scroll margin top, because the position where scrollIntoView method works on is the position before the animation take effect
  section.style.scrollMarginTop = '8rem';
  sectionObserver.observe(section);
});
//#endregion

//#region 08 Lazy loading for imgs
/**
 * Lazy loading when reach the img section,
 * before img load, using a low quality img with blur effect.
 * when load finished, replace the img, remove the effect
 */
const bigImgs = document.querySelectorAll('img[data-src]');

const lazyLoadCBF = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.setAttribute('src', entry.target.dataset.src);
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const lazyLoadConfObj = {
  root: null,
  threshold: 0,
};

const lazyLoadImgObserver = new IntersectionObserver(
  lazyLoadCBF,
  lazyLoadConfObj
);
bigImgs.forEach(imgEl => {
  lazyLoadImgObserver.observe(imgEl);
});
//#endregion

//#region 09 slide module
/**
 * slide module
 */
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slideDotsContainer = document.querySelector('.dots');

let currentSlideIndex = 0;

const updateSlide = function (currentSlideIndex) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlideIndex) * 100}%)`;
  });
  // 0: 0 1 2
  // 1: -1 0 1
  // 2: -2 -1 0
};

const nextSlideCB = function () {
  //0 1 2 0 1 ...
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
  } else {
    currentSlideIndex = 0;
  }
  updateSlide(currentSlideIndex);
  activeDots(currentSlideIndex);
};

const previousSlideCB = function () {
  // 0 2 1 0 2 ...
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
  } else {
    currentSlideIndex = slides.length - 1;
  }
  updateSlide(currentSlideIndex);
  activeDots(currentSlideIndex);
};

btnLeft.addEventListener('click', previousSlideCB);
btnRight.addEventListener('click', nextSlideCB);

const activeDots = function (num) {
  [...slideDotsContainer.children].forEach(dot => {
    dot.classList.remove('dots__dot--active');
    //console.log(dot);
  });
  slideDotsContainer
    .querySelector(`.dots__dot[data-slide="${num}"]`)
    .classList.add('dots__dot--active');
};

slideDotsContainer.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    currentSlideIndex = Number(e.target.dataset.slide);
    updateSlide(currentSlideIndex);
    activeDots(currentSlideIndex);
  }
});

const initSlide = function () {
  //create dots btn
  slides.forEach((_, index) => {
    slideDotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
  activeDots(currentSlideIndex);
  updateSlide(currentSlideIndex);
};

document.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft') previousSlide();
  else if (e.code === 'ArrowRight') nextSlide();
});
initSlide();
//#endregion
