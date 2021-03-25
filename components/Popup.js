export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
  }
}
