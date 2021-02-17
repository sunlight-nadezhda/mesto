const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showError = (input, errorMessage) => {
  input.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
};

const hideError = (input) => {
  input.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
};

const checkInputValidity = () => {
  if (!formInput.validity.valid) {
    showError(formInput, formInput.validationMessage);
  } else {
    hideError(formInput);
  }
};

formElement.addEventListener('submit', evt => {
  evt.preventDefault();
});

formInput.addEventListener('input', () => {
  checkInputValidity();
});
