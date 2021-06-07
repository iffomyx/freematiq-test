import { BasePage } from './basePage';
import { Slider } from '../components/slider';

const sliderClassList = {
  itemBtnFavoriteChecked: 'pn-shoe-card__btn-favorite--checked',
  itemBtnColorSelected: 'pn-shoes-card__btn-color--selected'
}

export class IndexPage extends BasePage {
  constructor() {
    super();

    this.sliderItems = null;

    document.addEventListener('DOMContentLoaded', this.initSlider);
  }

  initSlider = () => {
    this.slider = new Slider({
      sliderSelector: '.js-slider',
      btnNextSelector: '.js-slider-btn-next',
      btnPrevSelector: '.js-slider-btn-prev',
      settings: {
        loop: true,
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 15,
        centeredSlides: true,
        slidesOffsetBefore: 8,
        watchSlidesVisibility: true,
        duration: 600,
        threshold: 10,
        navigation: {
          nextEl: '.js-slider-btn-next',
          prevEl: '.js-slider-btn-prev'
        },
        pagination: {
          el: '.js-slider-pagination',
          type: 'custom',
          renderCustom: (swiper, current, total) => {
            const currentIndex = current < 10 ? ('0' + current) : current;
            const maxIndex = total < 10 ? ('0' + total) : total;

            return `
              <span class="pn-shoes-slider__current-index">
                ${currentIndex}
              </span> /
              <span class="pn-shoes-slider__max-index">${maxIndex}</span>
            `;
          }
        },
        breakpoints: {
          768: {
            centeredSlides: false,
            spaceBetween: 30,
            slidesOffsetBefore: 30,
            slidesOffsetAfter: 30
          }
        }
      }
    });

    this.sliderItems = document.querySelectorAll('.js-shoe-card');
    this.addListenersToItems();
  }

  addListenersToItems = () => {
    const { sliderItems } = this;

    if (sliderItems) {
      sliderItems.forEach((el) => {
        const colorButtons = el.querySelectorAll('.js-color-btn');

        el.addEventListener('click', (e) => {
          if (e.target.classList.contains('js-btn-favorite')) {
            e.target.classList.toggle(sliderClassList.itemBtnFavoriteChecked);
          }

          if (e.target.classList.contains('js-color-btn') && !e.target.classList.contains(sliderClassList.itemBtnColorSelected)) {
            colorButtons.forEach((btn) => {
              btn.classList.remove(sliderClassList.itemBtnColorSelected);
            });

            e.target.classList.add(sliderClassList.itemBtnColorSelected);
          }
        });
      });
    }
  }
}
