const formElement = document.querySelector('.form');
const inputArray = Array.from(formElement.querySelectorAll('.popup__input'));
const buttonElement = formElement.querySelector('.popup__save-button');

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const hasInvalidInput = inputArray => inputArray.some(inputElement => !inputElement.validity.valid);

const toggleButtonState = (inputArray, buttonElement) => {
  if (hasInvalidInput(inputArray)) {
    buttonElement.classList.add('popup__save-button_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
};

inputArray.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    checkValidity(formElement, inputElement);
    toggleButtonState(inputArray, buttonElement);
  });
});

formElement.addEventListener('submit', evt => {
  evt.preventDefault();
});
