export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element, isArray = false) {
    if (isArray) {
       this._container.append(element);
    } else {
       this._container.prepend(element);
    }
  }
}
