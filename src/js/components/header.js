const headerClassList = {
  headerPinnedClass: 'pn-header--pinned',
  headerUnpinClass: 'pn-header--unpin',
  headerMenuOpened: 'pn-header--menu-open',
  headerBtnMenuActive: 'pn-header__btn-menu--active'
};

export class Header {
  constructor() {
    this.header = document.querySelector('.js-header');
    this.headerHeight = this.header.getBoundingClientRect().height;
    this.headerTopOffset = parseInt(window.getComputedStyle(this.header).getPropertyValue('top'));

    this.isHeaderPinned = false;
    this.pageScrollThreshold = this.headerHeight + this.headerTopOffset + 400;

    if (this.header) {
      this.pinHeaderOnScroll();

      document.addEventListener('scroll', this.pinHeaderOnScroll);
    }

    this.headerMenuBtn = document.querySelector('.js-menu-btn');
    this.headerMenuItems = document.querySelectorAll('.js-menu-link');
    this.isMenuOpened = false;

    if (this.headerMenuBtn) {
      this.headerMenuBtn.addEventListener('click', this.toggleMenu);
      this.headerMenuItems.forEach((el) => {
        el.addEventListener('click', this.toggleMenu);
      });
    }
  }

  pinHeaderOnScroll = () => {
    const { header, pageScrollThreshold, isMenuOpened } = this;

    if (window.pageYOffset >= pageScrollThreshold && !this.isHeaderPinned) {
      this.isHeaderPinned = true;

      if (isMenuOpened) this.toggleMenu();
      header.classList.add(headerClassList.headerPinnedClass);
    }

    if (window.pageYOffset < pageScrollThreshold && this.isHeaderPinned) {
      this.isHeaderPinned = false;

      header.classList.add(headerClassList.headerUnpinClass);
      header.addEventListener('transitionend', this.unpinHeader);
    }
  }

  unpinHeader = () => {
    const { header, isMenuOpened } = this;

    if (isMenuOpened) this.toggleMenu();

    header.classList.remove(headerClassList.headerPinnedClass);
    header.classList.remove(headerClassList.headerUnpinClass);

    header.removeEventListener('transitionend', this.unpinHeader);
  }

  toggleMenu = () => {
    const { header, headerMenuBtn } = this;

    headerMenuBtn.classList.toggle(headerClassList.headerBtnMenuActive);
    header.classList.toggle(headerClassList.headerMenuOpened);

    this.isMenuOpened = !this.isMenuOpened;
  }
}

