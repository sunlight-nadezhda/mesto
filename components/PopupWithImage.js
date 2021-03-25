import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, name) {
    const image = this._popup.querySelector('.figure__image');
    const caption = this._popup.querySelector('.figure__caption');
    super.open();
    image.src = link;
    image.alt = name;
    caption.textContent = name;
  }
}
