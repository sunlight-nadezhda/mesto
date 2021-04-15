export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    const buttonClose = this._popup.querySelector('.popup__close-button');
    buttonClose.addEventListener('click', () => this.close(this._popup));
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    })
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
