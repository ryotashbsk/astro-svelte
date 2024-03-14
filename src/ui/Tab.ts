import { DomUtil } from '@utils/DomUtil';

export class Tab {
  #rootElement: HTMLElement | null;
  #tabList: HTMLElement | null;
  #tabs: NodeListOf<HTMLButtonElement>;
  #tabpanels: NodeListOf<HTMLElement>;
  #focus = 0;

  constructor(rootElement: HTMLElement = document.body) {
    this.#rootElement = rootElement;
    this.#tabList = rootElement?.querySelector<HTMLElement>('[role="tablist"]');
    this.#tabs = rootElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    this.#tabpanels = this.#rootElement?.querySelectorAll<HTMLElement>('[role="tabpanel"]');
  }

  init() {
    if (this.#tabList) {
      // 各タブに click イベントハンドラーを追加
      this.#tabs.forEach((tab) => tab?.addEventListener('click', this.#change.bind(this)));

      // tabListの中で表示されているタブを指定する定数
      this.#tabList.addEventListener('keydown', this.#onKeydown.bind(this));
    }
  }

  #change(e: MouseEvent) {
    const { currentTarget } = e;
    if (!DomUtil.isHTMLButtonElement(currentTarget)) return;

    const controls = currentTarget?.getAttribute('aria-controls');

    // switch tabs
    this.#tabs?.forEach((tab) => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });

    currentTarget.setAttribute('aria-selected', 'true');
    currentTarget.setAttribute('tabindex', '0');

    // switch tabpanels
    this.#tabpanels?.forEach((tabpanel) => {
      if (tabpanel.id === controls) {
        tabpanel.removeAttribute('hidden');
      } else {
        tabpanel.setAttribute('hidden', '');
      }
    });
  }

  #onKeydown(e: KeyboardEvent) {
    if (!this.#tabs) return;

    // switch tabs
    this.#tabs?.forEach((tab) => {
      tab.setAttribute('tabindex', '-1');
    });

    if (e.code === 'ArrowLeft') {
      this.#focus--;
      if (this.#focus < 0) {
        this.#focus = this.#tabs.length - 1;
      }
    } else if (e.code === 'ArrowRight') {
      this.#focus++;
      if (this.#focus >= this.#tabs?.length) {
        this.#focus = 0;
      }
    }

    const focusElement = this.#tabs[this.#focus];
    focusElement?.setAttribute('tabindex', '0');
    focusElement?.focus();
  }
}
