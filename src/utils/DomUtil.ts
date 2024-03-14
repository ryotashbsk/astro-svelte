export class DomUtil {
  static isHTMLElement(element: Element | null): element is HTMLElement {
    return element instanceof HTMLElement;
  }

  static isHTMLButtonElement = (element: EventTarget | null): element is HTMLButtonElement => {
    return element instanceof HTMLButtonElement;
  };
}
