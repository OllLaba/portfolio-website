//Поп-ап сайт
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('projectPopup');
  const popupImage = document.getElementById('projectPopupImage');
  const popupClose = document.getElementById('projectPopupClose');
  const popupImageWrapper = document.getElementById('projectPopupImageWrapper');
  const popupLinkHolder = document.getElementById('projectPopupLinkHolder');

  const expandButtons = document.querySelectorAll('.project-expand');

  if (!popup || !popupImage || !popupClose || !popupImageWrapper || !popupLinkHolder) {
    return;
  }

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

  popup.querySelector('.project-popup-overlay').addEventListener('click', closePopup);

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

    window.addEventListener('scroll', setActiveExperienceItem);
    window.addEventListener('resize', setActiveExperienceItem);
});