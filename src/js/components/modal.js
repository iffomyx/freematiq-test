const modalClassList = {
  bodyModalOpen: 'pn-modal-open',
  modalOpened: 'pn-modal--show',
}

export class Modal {
  constructor(modalSelector) {
    this.modalEl = document.querySelector(modalSelector);
    this.modalCloseButtons = this.modalEl.querySelectorAll('[data-close="modal"]');
    this.modalTriggerBtn = document.querySelector('.js-modal-btn');

    this.header = document.querySelector('.js-header');

    this.modalEl.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.closeModal();
    });
    this.modalTriggerBtn.addEventListener('click', this.openModal);

    this.modalCloseButtons.forEach((el) => {
      el.addEventListener('click', this.closeModal);
    });
  }

  openModal = () => {
    this.modalEl.classList.add(modalClassList.modalOpened);

    this.addOffsetToBody();
    document.body.classList.add(modalClassList.bodyModalOpen);
  }

  closeModal = () => {
    this.modalEl.classList.remove(modalClassList.modalOpened);

    this.removeOffsetFromBody();
    document.body.classList.remove(modalClassList.bodyModalOpen);
  }

  addOffsetToBody = () => {
    const scrollbarWidth = this.getScrollbarWidth();

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = scrollbarWidth + 'px';
      this.header.style.paddingRight = scrollbarWidth + 'px';
    }
  }

  removeOffsetFromBody = () => {
    document.body.style.paddingRight = null;
    this.header.style.paddingRight = null;
  }

  getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  }
}
