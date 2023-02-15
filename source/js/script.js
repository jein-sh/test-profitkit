
// tabs

const btnTabs = document.querySelectorAll(".tabs__button");
const itemTabs= document.querySelectorAll(".tabs__item");
const placeTabs = document.querySelectorAll(".place-card__link ")

btnTabs.forEach(tab => {
  tab.addEventListener("click", function() {
    let currentBtn = tab;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId)

    btnTabs.forEach(btn => {
      btn.classList.remove("tabs__button--active");
    });

    itemTabs.forEach(item => {
      item.classList.remove("tabs__item--active");
    });

    currentBtn.classList.add("tabs__button--active");
    currentTab.classList.add("tabs__item--active");
  });
});

placeTabs.forEach(place => {
  place.addEventListener("click", function() {
    let currentPlace = place;
    let placeId = currentPlace.getAttribute("data-link");
    let currentTab = document.querySelector(placeId);

    itemTabs.forEach(item => {
      item.classList.remove("tabs__item--active");
    });

    btnTabs.forEach(btn => {
      let btnId = btn.getAttribute("data-tab");
      if (placeId === btnId){
        btn.classList.add("tabs__button--active");
      }else {
        btn.classList.remove("tabs__button--active");
      }
      currentTab.classList.add("tabs__item--active");
    });
  });
});

// pagination

const photoSliders = document.querySelectorAll('.card__photos');

photoSliders.forEach((el) => {
  const photos = el.querySelectorAll('.card__image');

  if(photos.length > 1) {
    const pagination = el.querySelector('.card__pagination');

    photos.forEach((photo, index) => {
      const btn = pagination.appendChild(document.createElement('button'));
      btn.setAttribute('type', 'button');
      btn.classList.add('card__pagination-btn');
      btn.setAttribute('id', photo.dataset.number);

      if (photo.classList.contains('active')) {
        btn.classList.add('active');
      }
    })
  }
});

// count

const initCount = (el) => {
  const btnMinus = el.querySelector('.card__count-btn--minus');
  const btnPlus = el.querySelector('.card__count-btn--plus');
  const countInput = el.querySelector('.card__count-input');

  const getIncrement = () => {
    let value = Number(countInput.value);
    value += 1;
    countInput.value = String(value);
  }

  const getDecrement = () => {
    let value = Number(countInput.value);
    if (value > 2) {
      value -= 1;
    } else {
      value = 1;
    }
    countInput.value = String(value);
  }

  btnMinus.addEventListener('click', getDecrement);
  btnPlus.addEventListener('click', getIncrement);
};

// photoslider

const initPhotos = (el) => {
  const photos = el.querySelectorAll('.card__image');
  const paginationBtns = el.querySelectorAll('.card__pagination-btn');

  const removeActiveClass = (arr) => {
    arr.forEach((el) => {
      if(el.classList.contains('active')) {
        el.classList.remove('active')
      }
    })
  }

  const slidePhoto = (el) => {
    removeActiveClass(paginationBtns);
    removeActiveClass(photos);

    photos.forEach((photo) => {
      if (photo.dataset.number === el.id) {
        photo.classList.add('active')
        el.classList.add('active')
      }
    });
  }

  paginationBtns.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      slidePhoto(evt.target)
    });
  });
}

const counts = document.querySelectorAll('.card__count');

counts.forEach((el) => {
  initCount(el);
});

photoSliders.forEach((el) => {
  initPhotos(el);
});

// slider

const slider = document.querySelector('.slider');
const buttonPrev = slider.querySelector('.slider__button--prev');
const buttonNext = slider.querySelector('.slider__button--next');
const slides = slider.querySelectorAll('.slider__item');
const list = slider.querySelector('.slider__list');
let touchstartX = 0;
let touchendX = 0;
let sliderCount;

const showPrevSlide = () => {
  const firstSlide = list.firstElementChild;
  const lastSlide = list.lastElementChild;

  const newSlide = lastSlide.cloneNode(true);
  list.insertBefore(newSlide, firstSlide);
  console.log(newSlide)
  initCount(newSlide);
  initPhotos(newSlide);
  lastSlide.remove();
};

const showNextSlide = () => {
  const firstSlide = list.firstElementChild;

  const newSlide = firstSlide.cloneNode(true);
  list.appendChild(newSlide);

  initCount(newSlide);
  initPhotos(newSlide);
  firstSlide.remove();
};

const handleGesture = () => {
  if (touchendX < touchstartX) {
    showNextSlide();
  }

  if (touchendX > touchstartX) {
    showPrevSlide();
  }
};

buttonNext.addEventListener('click', showNextSlide);
buttonPrev.addEventListener('click', showPrevSlide);

slider.addEventListener('touchstart', (e) => {
  touchstartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
  touchendX = e.changedTouches[0].screenX;
  handleGesture();
});
