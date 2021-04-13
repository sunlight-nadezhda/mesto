import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListeners(cardId, cardElement) {
    const buttonConfirm = this._popup.querySelector('.popup__confirm-button');
    buttonConfirm.addEventListener('click', () => {
      fetch(`https://mesto.nomoreparties.co/v1/cohort-22/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: '1e5f7c98-03ad-4c6e-8333-1ab219b8293f'
        }
      });
      cardElement.remove();
      this.close(this._popup);
    });
    super.setEventListeners();
  }
}
