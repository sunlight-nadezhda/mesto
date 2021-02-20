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
  // const formFields = Array.from(formElement.querySelectorAll('.popup__form-field'));
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
    // formElement.style.marginTop = '37px';
    // formFields.forEach(formField => {
    //   formField.style.marginTop = '10px';
    // });
  } else {
    hideError(formElement, inputElement);
    // formElement.style.marginTop = '17px';
    // formFields.forEach(formField => {
    //   formField.style.marginTop = '29px';
    // });
  }
};

const hasInvalidInput = inputArray => inputArray.some(inputElement => !inputElement.validity.valid);

const toggleButtonState = (inputArray, buttonElement) => {
  if (hasInvalidInput(inputArray)) {
    buttonElement.classList.add('popup__save-button_inactive');
    buttonElement.setAttribute('disabled', true);
    // buttonElement.style.marginTop = '32px';
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
    buttonElement.removeAttribute('disabled');
    // buttonElement.style.marginTop = '48px';
  }
};

const setListeners = formElement => {
  const inputArray = Array.from(formElement.querySelectorAll('.popup__input'));
  // const formFields = Array.from(formElement.querySelectorAll('.popup__form-field'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  inputArray.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement);
      toggleButtonState(inputArray, buttonElement);
    });
  });
  // formElement.style.marginTop = '17px';
  // formFields.forEach(formField => {
  //   formField.style.marginTop = '29px';
  // });
  // buttonElement.style.marginTop = '48px';
};

const enableValidation = () => {
  const formArray = Array.from(document.querySelectorAll('.popup__form'));
  formArray.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setListeners(formElement);
  });
};

enableValidation();
