import { BasePage } from "./basePage";
import { Modal } from "../components/modal";

export class ErrorPage extends BasePage {
  constructor() {
    super();

    const modal = new Modal('#modal');
  }
}
