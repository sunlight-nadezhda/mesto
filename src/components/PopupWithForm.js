import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._submiter = submiter;
    this._formElement = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._formElement.querySelector('.popup__save-button');
    this._buttonValue = this._buttonSubmit.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._submiter(data);
    });
  }

  setLoadingButton() {
    this._buttonSubmit.textContent = 'Сохранение...';
    this._buttonSubmit.setAttribute('disabled', true);
  }

  resetButton() {
    this._buttonSubmit.textContent = this._buttonValue;
    this._buttonSubmit.removeAttribute('disabled');
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  _getInputValues() {
    const inputList = this._formElement.querySelectorAll('.popup__input');
    const inputValues = {};
    inputList.forEach(input => inputValues[input.name] = input.value);
    return inputValues;
  }
}
