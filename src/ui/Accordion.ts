import { DomUtil } from '@utils/DomUtil';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
gsap.registerPlugin(CustomEase);
CustomEase.create('custom', '0.22, 0.61, 0.36, 1');

export class Accordion {
  #toggleElement: string;

  constructor(toggleElement: string) {
    this.#toggleElement = toggleElement;
  }

  init() {
    document.querySelectorAll(this.#toggleElement)?.forEach((elm) => {
      elm.addEventListener('click', this.#toggle);
    });
  }

  #toggle(e: Event) {
    const { currentTarget } = e;
    if (!DomUtil.isHTMLButtonElement(currentTarget)) return;

    const parent = currentTarget?.parentElement;
    const root = parent?.parentElement;
    const panel = parent?.nextElementSibling;
    const isActive = root?.classList.contains('is-active');

    if (!panel) return;

    if (!isActive) {
      panel?.removeAttribute('hidden');
      currentTarget.setAttribute('aria-expanded', 'true');
      const tl = gsap.timeline();
      tl.to(panel, {
        height: 'auto',
        duration: 0.3,
        ease: 'custom'
      }).add(() => {
        root?.classList.add('is-active');
      }, '=-0.1');
    } else {
      root?.classList.remove('is-active');
      currentTarget.setAttribute('aria-expanded', 'false');
      const tl = gsap.timeline();
      tl.to(panel, {
        height: 0,
        duration: 0.3,
        ease: 'custom'
      }).add(() => {
        panel?.setAttribute('hidden', '');
      });
    }
  }
}
