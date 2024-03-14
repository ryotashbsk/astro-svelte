import { CommonUtil } from '@utils/CommonUtil';
import { DomUtil } from '@utils/DomUtil';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export class ScrollUtil {
  static scrollAnchor() {
    // 通常のアンカーリンク
    const anchors = document.querySelectorAll('[data-anchor]');
    if (anchors.length > 0) {
      anchors.forEach((elm) => {
        elm.addEventListener('click', (e: Event) => {
          e.preventDefault();
          const { currentTarget } = e;
          if (!DomUtil.isHTMLButtonElement(currentTarget)) return;

          const href = currentTarget.getAttribute('data-anchor');
          const anchorTarget = document.querySelector(`[data-anchor-target="${href}"]`);
          if (!DomUtil.isHTMLElement(anchorTarget)) return;
          this.autoScroll(anchorTarget);
        });
      });
    }

    // urlハッシュ
    const anchor = CommonUtil.getParam('anchor');
    if (anchor) {
      console.log(document.querySelector(`[data-anchor-target="${anchor}"]`));
      const anchorTarget = document.querySelector(`[data-anchor-target="${anchor}"]`);
      if (!DomUtil.isHTMLElement(anchorTarget)) return;
      this.autoScroll(anchorTarget, 1);
    }
  }

  static autoScroll(target: HTMLElement, duration = 1) {
    if (target) {
      const rect = target.getBoundingClientRect();
      const scroll = window.scrollY;
      const position = rect.top + scroll;
      const header = document.querySelector('.header');
      const headerHeight = header ? header.clientHeight : 0;

      gsap.to(window, {
        duration,
        ease: 'power3.inOut',
        scrollTo: position - headerHeight
      });
    }
  }
}
