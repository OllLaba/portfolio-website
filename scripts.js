//Поп-ап сайт
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('projectPopup');
  const popupImage = document.getElementById('projectPopupImage');
  const popupClose = document.getElementById('projectPopupClose');
  const popupImageWrapper = document.getElementById('projectPopupImageWrapper');
  const popupLinkHolder = document.getElementById('projectPopupLinkHolder');
  const expandButtons = document.querySelectorAll('.project-expand');

  if (!popup || !popupImage || !popupClose || !popupImageWrapper || !popupLinkHolder) return;

  expandButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const card = button.closest('.project-card');
      if (!card) return;

      const image = card.dataset.image;
      const title = card.dataset.title || '';
      const projectLink = card.querySelector('.project-card-header a');

      if (!image || !projectLink) return;

      popupImage.src = image;
      popupImage.alt = title;
      popupLinkHolder.innerHTML = '';

      const clonedLink = projectLink.cloneNode(true);
      clonedLink.id = 'projectPopupUrl';

      popupLinkHolder.appendChild(clonedLink);
      popup.classList.add('active');
      document.body.classList.add('popup-open');

      requestAnimationFrame(() => {
        popupImageWrapper.scrollTop = 0;
      });
    });
  });

  function closePopup() {
    popup.classList.remove('active');
    document.body.classList.remove('popup-open');
    popupImageWrapper.scrollTop = 0;

    setTimeout(() => {
      popupImage.src = '';
      popupImage.alt = '';
      popupLinkHolder.innerHTML = '<a href="#" id="projectPopupUrl"></a>';
    }, 350);
  }

  popupClose.addEventListener('click', closePopup);

  const overlay = popup.querySelector('.project-popup-overlay');
  if (overlay) overlay.addEventListener('click', closePopup);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && popup.classList.contains('active')) {
      closePopup();
    }
  });
});


//Гортання досвід
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.resume-experience-item');

  if (!items.length) return;

  function setActiveExperienceItem() {
    const viewportCenter = window.innerHeight / 2;
    let activeItem = items[0];
    let closestDistance = Infinity;

    items.forEach(function (item) {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        activeItem = item;
      }
    });

    items.forEach(function (item) {
      item.classList.remove('is-active');
    });

    activeItem.classList.add('is-active');
  }

  setActiveExperienceItem();

  window.addEventListener('scroll', setActiveExperienceItem, { passive: true });
  window.addEventListener('resize', setActiveExperienceItem);
});


//Поп ап резюме
document.addEventListener('DOMContentLoaded', function () {
  const resumePopup = document.getElementById('resumePopup');
  const openButtons = document.querySelectorAll('[data-resume-popup-open]');
  const closeButtons = document.querySelectorAll('[data-resume-popup-close]');

  if (!resumePopup) return;

  function openResumePopup() {
    const resumeFrame = resumePopup.querySelector('.resume-popup-frame');

  if (resumeFrame && !resumeFrame.src) {
    resumeFrame.src = resumeFrame.dataset.src;
  }

  resumePopup.classList.add('active');
  resumePopup.setAttribute('aria-hidden', 'false');
  document.body.classList.add('popup-open');
  }

  function closeResumePopup() {
    resumePopup.classList.remove('active');
    resumePopup.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('popup-open');
  }

  openButtons.forEach(function (button) {
    button.addEventListener('click', openResumePopup);
  });

  closeButtons.forEach(function (button) {
    button.addEventListener('click', closeResumePopup);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && resumePopup.classList.contains('active')) {
      closeResumePopup();
    }
  });
});


//Плаваюча кнопка резюме
document.addEventListener('DOMContentLoaded', function () {
  const floatingButton = document.querySelector('.floating-resume-button');
  const secondSection = document.querySelector('main section:nth-child(2)');

  if (!floatingButton || !secondSection) return;

  function toggleFloatingResumeButton() {
    const rect = secondSection.getBoundingClientRect();
    const sectionMiddle = rect.top + rect.height / 2;

    if (sectionMiddle <= window.innerHeight / 2) {
      floatingButton.classList.add('is-visible');
    } else {
      floatingButton.classList.remove('is-visible');
    }
  }

  toggleFloatingResumeButton();

  window.addEventListener('scroll', toggleFloatingResumeButton, { passive: true });
  window.addEventListener('resize', toggleFloatingResumeButton);
});


//Мобільне меню
document.addEventListener('DOMContentLoaded', function () {
  const mediaQuery = window.matchMedia('(max-width: 767px)');
  const header = document.querySelector('header');
  const nav = document.querySelector('header nav');
  const socials = document.querySelector('header .socials');

  if (!header || !nav || !socials) return;

  let menuButton = null;

  function closeMenu() {
    nav.classList.remove('is-open');
  }

  function outsideClickHandler(event) {
    if (!menuButton) return;

    if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  }

  function initMobileMenu() {
    if (!mediaQuery.matches) {
      closeMenu();

      if (menuButton) {
        menuButton.remove();
        menuButton = null;
      }

      document.removeEventListener('click', outsideClickHandler);
      return;
    }

    if (menuButton) return;

    menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-label', 'Відкрити меню');
    menuButton.innerHTML = '<span></span><span></span><span></span>';

    header.insertBefore(menuButton, socials);

    menuButton.addEventListener('click', function (event) {
      event.stopPropagation();
      nav.classList.toggle('is-open');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', outsideClickHandler);
  }

  initMobileMenu();

  mediaQuery.addEventListener('change', initMobileMenu);
  window.addEventListener('resize', initMobileMenu);
});


//Фото в першому блоці на мобільному
document.addEventListener('DOMContentLoaded', function () {
  const mediaQuery = window.matchMedia('(max-width: 767px)');
  const infoBlock = document.querySelector('.info-block');
  const profileText = document.querySelector('.profile-text');
  const profileImage = document.querySelector('.info-block-image');
  const experienceText = profileText ? profileText.querySelector('p:nth-child(2)') : null;

  if (!infoBlock || !profileText || !profileImage || !experienceText) return;

  function updateProfileImagePosition() {
    if (mediaQuery.matches) {
      experienceText.insertAdjacentElement('afterend', profileImage);
    } else {
      infoBlock.appendChild(profileImage);
    }
  }

  updateProfileImagePosition();

  mediaQuery.addEventListener('change', updateProfileImagePosition);
  window.addEventListener('resize', updateProfileImagePosition);
});


//Слайдер іконок з крапочками
document.addEventListener('DOMContentLoaded', function () {
  const mediaQuery = window.matchMedia('(max-width: 767px)');
  const iconsSlider = document.querySelector('.icons-block');
  const originalDotsContainer = document.querySelector('.mobile-dots');

  if (!iconsSlider || !originalDotsContainer) return;

  const iconSlides = Array.from(iconsSlider.querySelectorAll('.icons-block-item'));
  if (!iconSlides.length) return;

  let dotsContainer = originalDotsContainer;
  let dots = [];
  let isInitialized = false;

  function updateIconDots() {
    if (!mediaQuery.matches || !dots.length) return;

    const sliderRect = iconsSlider.getBoundingClientRect();
    const sliderCenter = sliderRect.left + sliderRect.width / 2;

    let activeIndex = 0;
    let closestDistance = Infinity;

    iconSlides.forEach(function (slide, index) {
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const distance = Math.abs(sliderCenter - slideCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        activeIndex = index;
      }
    });

    dots.forEach(function (dot) {
      dot.classList.remove('is-active');
    });

    if (dots[activeIndex]) {
      dots[activeIndex].classList.add('is-active');
    }
  }

  function initIconsSlider() {
    if (!mediaQuery.matches) {
      dotsContainer.innerHTML = '';
      iconsSlider.appendChild(dotsContainer);
      iconsSlider.scrollLeft = 0;
      dots = [];
      isInitialized = false;
      return;
    }

    if (isInitialized) {
      updateIconDots();
      return;
    }

    iconsSlider.insertAdjacentElement('afterend', dotsContainer);
    dotsContainer.innerHTML = '';

    iconSlides.forEach(function (_, index) {
      const dot = document.createElement('span');

      if (index === 0) {
        dot.classList.add('is-active');
      }

      dot.addEventListener('click', function () {
        iconsSlider.scrollTo({
          left: iconSlides[index].offsetLeft - iconsSlider.offsetLeft,
          behavior: 'smooth'
        });
      });

      dotsContainer.appendChild(dot);
    });

    dots = Array.from(dotsContainer.querySelectorAll('span'));
    isInitialized = true;
    updateIconDots();
  }

  iconsSlider.addEventListener('scroll', updateIconDots, { passive: true });
  mediaQuery.addEventListener('change', initIconsSlider);
  window.addEventListener('resize', updateIconDots);

  initIconsSlider();
});


//Автоскрол картинок проектів
document.addEventListener('DOMContentLoaded', function () {
  const mediaQuery = window.matchMedia('(max-width: 767px)');
  const projects = document.querySelectorAll('.projects-featured .project-card, .projects-all .project-card');

  if (!projects.length) return;

  let observer = null;

  function removeInViewClasses() {
    projects.forEach(function (project) {
      project.classList.remove('in-view');
    });
  }

  function initProjectImageAutoscroll() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    removeInViewClasses();

    if (!mediaQuery.matches) return;

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, {
      threshold: 0.6
    });

    projects.forEach(function (project) {
      observer.observe(project);
    });
  }

  initProjectImageAutoscroll();

  mediaQuery.addEventListener('change', initProjectImageAutoscroll);
  window.addEventListener('resize', initProjectImageAutoscroll);
});