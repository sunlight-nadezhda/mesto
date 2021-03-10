export default class FormValidator {
  constructor(data) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _showError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputArray) {
    return inputArray.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState(inputArray, buttonElement) {
    if (this._hasInvalidInput(inputArray)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _setListeners(formElement) {
    const inputArray = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    inputArray.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(formElement, inputElement);
        this._toggleButtonState(inputArray, buttonElement);
      });
    });
  }

  enableValidation() {
    const formArray = Array.from(document.querySelectorAll(this._formSelector));
    formArray.forEach(formElement => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      this._setListeners(formElement);
    });
  }
}
