export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(document.querySelector('.popup_opened'));
    }
  }

  setEventListeners() {
    const button = this._popup.querySelector('.popup__close-button');
    button.addEventListener('click', () => this.close(this._popup));
  }
}
