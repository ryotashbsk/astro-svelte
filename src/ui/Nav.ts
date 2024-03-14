import { CommonUtil } from '@utils/CommonUtil';

export class Nav {
  #header = document.querySelector('.header');
  #toggleButton = document.querySelector('.navToggle');
  #buttons = this.#header?.querySelectorAll('.nav button');

  init() {
    this.#toggle();
  }

  #open() {
    this.#header?.classList.add('is-nav-open');
    document.documentElement.style.overflow = 'hidden';
  }

  #close() {
    this.#header?.classList.remove('is-nav-open');
    document.documentElement.style.overflow = '';
  }

  #click() {
    if (!this.#header?.classList.contains('is-nav-open')) {
      this.#open();
    } else {
      this.#close();
    }
  }

  #toggle() {
    if (CommonUtil.isSP()) {
      this.#toggleButton?.addEventListener('click', this.#click.bind(this));

      this.#buttons?.forEach((button) => {
        button.addEventListener('click', this.#close.bind(this));
      });
    }
  }
}
