import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._submiter = submiter;
    this._formElement = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputList = this._formElement.querySelectorAll('.popup__input');
    const inputValues = {};
    inputList.forEach(input => inputValues[input.name] = input.value);
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._submiter(data);
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
