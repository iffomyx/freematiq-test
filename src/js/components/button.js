export class Button {
  constructor(buttonElement) {
    this.button = buttonElement;
    this.buttonRippleRoot = buttonElement.querySelector('.pn-btn__ripple-root');

    this.width = this.button.offsetWidth;
    this.height = this.button.offsetHeight;
    this.diameter = Math.max(this.width, this.height);
    this.radius = this.diameter / 2;

    if (this.button && this.buttonRippleRoot) {
      this.button.addEventListener('click', this.createRipple);
    }
  }

  createRipple = (e) => {
    const { button, buttonRippleRoot, diameter, radius } = this;

    const buttonRect = button.getBoundingClientRect();
    const circle = document.createElement('span');

    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.top = Math.round(e.clientY - buttonRect.top - radius) + 'px';
    circle.style.left = Math.round(e.clientX - buttonRect.left - radius) + 'px';

    circle.classList.add('pn-btn__ripple');

    buttonRippleRoot.appendChild(circle);

    circle.addEventListener('animationend', () => {
      buttonRippleRoot.removeChild(circle);
    });
  }
}
