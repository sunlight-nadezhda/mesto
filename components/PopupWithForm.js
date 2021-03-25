export default class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._submiter = submiter;
  }

  _getInputValues() {
    this._formElement = this._popup.querySelector('.popup__form');
    const inputList = this._formElement.querySelectorAll('.popup__input');
    const inputValues = {};
    inputList.forEach(input => inputValues[input.name] = input.value);
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submiter();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
