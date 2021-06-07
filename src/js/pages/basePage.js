import '../polyfills';
import 'svgxuse';

import { Header } from '../components/header';
import { Button } from '../components/button';
import { Modal } from "../components/modal";

export class BasePage {
  constructor() {
    const header = new Header();
    const modal = new Modal('#modal');

    const buttons = document.querySelectorAll('button[data-ripple-effect]');
    if (buttons) {
      buttons.forEach((el) => {
        const button = new Button(el);
      });
    }
  }
}
