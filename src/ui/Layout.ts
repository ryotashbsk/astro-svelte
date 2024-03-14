import { UA } from '@utils/UA';

export class Layout {
  constructor() {}

  init() {
    UA.set();
    document.documentElement.classList.remove('preload');
  }
}
