import parser from 'ua-parser-js';

const ua = parser();
console.log(ua);

export class UA {
  static PC = ua.device.type !== 'tablet' && ua.device.type !== 'mobile';

  static Tablet = ua.device.type === 'tablet';

  static SP = ua.device.type === 'mobile';

  static iOS = ua.os.name === 'iOS';

  static Android = ua.os.name === 'Android';

  static Windows = ua.os.name === 'Windows';

  static IE = ua.browser.name === 'IE';

  static Edge = ua.browser.name === 'Edge';

  static Chrome = ua.browser.name === 'Chrome';

  static Firefox = ua.browser.name === 'Firefox';

  static Safari = ua.browser.name === 'Safari' || ua.browser.name === 'Mobile Safari';

  static set() {
    const datas = [
      {
        ua: !this.Tablet && !this.SP,
        class: 'ua-pc'
      },
      {
        ua: this.Tablet,
        class: 'ua-tablet'
      },
      {
        ua: this.SP,
        class: 'ua-sp'
      },
      {
        ua: this.Android,
        class: 'ua-android'
      },
      {
        ua: this.IE,
        class: 'ua-ie'
      },
      {
        ua: this.Windows,
        class: 'ua-windows'
      },
      {
        ua: this.Safari,
        class: 'ua-safari'
      },
      {
        ua: this.iOS,
        class: 'ua-ios'
      }
    ];

    datas.map((v) => v.ua && document.documentElement.classList.add(v.class));
  }
}
