import { CommonUtil } from '@utils/CommonUtil';
// import gsap from 'gsap';
// import { UA } from '@/utils/UA';

export class Slider {
  // アニメーションを停止するフラグ
  #isPaused = false;

  // スライドの現在のインデックス
  #currentIndex = -1; // 0から始まるため-1で初期化

  // アニメーションの開始時間
  #startTime = 0;
  #startTimePre = 0;

  // スライドの進捗
  // #currentTime = 0;

  // スライドの要素
  #slides: NodeListOf<HTMLElement> | null;

  // スライドの切り替わり間隔
  #period: number;

  #currentSlide: HTMLElement | null = null;
  #prevSlide: HTMLElement | null = null;

  // #callbackId = 0;

  constructor(option: { slides: string; period: number }) {
    this.#slides = document.querySelectorAll(option.slides);

    // スライドの切り替わり間隔
    this.#period = option.period;
  }

  init() {
    CommonUtil.wait(1).then(() => {
      this.#toggleClass();
    });

    // this.#switchTab();

    // 最初のアニメーションを開始
    // this.#callbackId = requestAnimationFrame(this.#animate.bind(this));
    requestAnimationFrame(this.#animate.bind(this));
  }

  // アニメーションのコールバック関数
  #animate(timestamp: number) {
    // タブがアクティブのときのみアニメーションを更新
    if (!this.#isPaused) {
      // 最初のアニメーションのときは開始時間を更新
      if (!this.#startTime) this.#startTime = timestamp;
      if (!this.#startTimePre) this.#startTimePre = timestamp;

      // アニメーションの進捗を計算
      const elapsedTime = timestamp - this.#startTime;
      const progress = Math.min(elapsedTime / this.#period, 1);

      // this.#currentTime = progress;

      // 進捗1（this.#periodの時間分経過）
      if (progress === 1) {
        // 開始時間をリセット
        this.#startTime = 0;

        this.#toggleClass();
      }
    }

    // 次のアニメーションを実行
    requestAnimationFrame(this.#animate.bind(this));
  }

  #toggleClass() {
    if (this.#slides) {
      // 次のスライド
      this.#currentIndex = (this.#currentIndex + 1) % this.#slides.length;
      this.#currentSlide = this.#slides[this.#currentIndex] ?? null;

      // 前のスライド
      this.#prevSlide =
        this.#slides[this.#currentIndex - 1 == -1 ? this.#slides.length - 1 : this.#currentIndex - 1] ?? null;

      this.#prevSlide?.classList.remove('is-active');
      this.#currentSlide?.classList.add('is-active');

      CommonUtil.wait(this.#period * 0.8).then(() => {
        this.#currentSlide?.classList.add('is-hide');
      });

      CommonUtil.wait(1000).then(() => {
        this.#prevSlide?.classList.remove('is-hide');
      });
    }
  }

  // #pause() {
  //   cancelAnimationFrame(this.#callbackId);
  // }

  // #resume() {
  //   this.#startTime = performance.now() - this.#period * this.#currentTime;
  //   this.#callbackId = requestAnimationFrame(this.#animate.bind(this));
  // }

  // #switchTab() {
  //   // タブのアクティブ判定
  //   if (UA.PC) {
  //     window.addEventListener('blur', () => {
  //       this.#isPaused = true;
  //       this.#isPaused && this.#pause();
  //     });
  //     window.addEventListener('focus', () => {
  //       this.#isPaused = false;
  //       !this.#isPaused && this.#resume();
  //     });
  //   } else {
  //     document.addEventListener('visibilitychange', () => {
  //       this.#isPaused = document.hidden;
  //       // タブが再びアクティブならアニメーション再開
  //       // 非アクティブならアニメーション停止
  //       !this.#isPaused ? this.#resume() : this.#pause();
  //     });
  //   }
  // }
}
