export class CommonUtil {
  static isTouch = 'ontouchstart' in window;

  static getParam(str: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(str);
  }

  static hasParam(str: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has(str);
  }

  static wait(waitTime: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, waitTime);
    });
  }

  static mediaQuery(device: string, cb: () => void) {
    const mq = window.matchMedia('(min-width: 751px)');
    const isLandscape = window.matchMedia('(orientation: landscape)');
    const isPortrait = window.matchMedia('(orientation: portrait)');

    const handle = (q: MediaQueryList) => {
      if (device === 'pc' && q.matches) {
        cb();
      } else if (device === 'sp' && !q.matches) {
        cb();
      } else if (device === 'yoko' && isLandscape.matches) {
        cb();
      } else if (device === 'tate' && isPortrait.matches) {
        cb();
      }
    };
    handle(mq);
  }

  static isPC() {
    let flg = false;
    this.mediaQuery('pc', () => {
      flg = true;
    });
    return flg;
  }

  static isSP() {
    let flg = false;
    this.mediaQuery('sp', () => {
      flg = true;
    });
    return flg;
  }

  static reloadAtResized() {
    const mq = window.matchMedia('(min-width: 751px)');
    const handle = (q: MediaQueryListEvent) => {
      if (q.matches) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    };
    mq.addEventListener('change', handle);
  }

  static splitText() {
    const elms = document.querySelectorAll('[data-split-text]');
    elms.forEach((elm) => {
      const text = elm.textContent;
      elm.innerHTML = '';
      text?.split('').forEach((t) => {
        const _t = t == ' ' ? '&nbsp;' : t;
        elm.innerHTML += '<span>' + _t + '</span>';
      });
    });
  }
}
