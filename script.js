let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileMetier = profile.querySelector('.profile__metier');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let popupInputText = popup.querySelectorAll('.popup__input-text');
let formElement = popup.querySelector('.popup__container');

function showPopup() {
  popup.classList.add('popup_opened');
  popupInputText[0].value = profileName.textContent;
  popupInputText[1].value = profileMetier.textContent;
}

editButton.addEventListener('click', showPopup);

function hidePopup() {
  popup.classList.remove('popup_opened');
}

popupClose.addEventListener('click', hidePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector('.popup__input-text_type_name').value;
  let jobInput = formElement.querySelector('.popup__input-text_type_metier').value;

  profileName.textContent = nameInput;
  profileMetier.textContent = jobInput;

  hidePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
