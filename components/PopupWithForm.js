export default class PopupWithForm extends Popup {
  constructor(popupSelector, submiter) {
    super(popupSelector);
    this._submiter = submiter;
  }

  _getInputValues() {
    const formElement = this._popup.querySelector('.popup__form');
    const inputList = formElement.querySelectorAll('.popup__input');
    const inputValues = {};
    inputList.forEach(input => inputValues[input.name] = input.value);
    return inputValues;
  }
}
