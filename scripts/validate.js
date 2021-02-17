const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showError = () => {
  formInput.classList.add('popup__input_type_error');
  formError.classList.add('popup__input-error_active');
};

showError();
