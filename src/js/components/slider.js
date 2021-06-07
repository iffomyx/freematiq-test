import SwiperCore, { Swiper, Navigation, Pagination } from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);

const sliderClassList = {
  sliderBtnAnimation: 'pn-shoes-slider__btn-nav--animation'
}

export class Slider {
  constructor(props) {
    const {sliderSelector, btnNextSelector, btnPrevSelector, settings } = props;

    this.sliderSelector = sliderSelector;

    this.sliderBtnNext = document.querySelector(btnNextSelector);
    this.sliderBtnPrev = document.querySelector(btnPrevSelector);

    this.settings = settings;

    if (this.sliderBtnNext && this.sliderBtnPrev) {
      this.initNavButtons();
    }

    if (sliderSelector) {
      this.slider = new Swiper(sliderSelector, settings);
    }
  }

  initNavButtons = () => {
    const { sliderBtnNext, sliderBtnPrev } = this;

    [sliderBtnNext, sliderBtnPrev].forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.add(sliderClassList.sliderBtnAnimation);
      });

      btn.addEventListener('animationend', () => {
        btn.classList.remove(sliderClassList.sliderBtnAnimation);
      });
    });
  }
}
