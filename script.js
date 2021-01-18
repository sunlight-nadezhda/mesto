let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileMetier = profile.querySelector('.profile__metier');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input-text_type_name');
let jobInput = formElement.querySelector('.popup__input-text_type_metier');

function showPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileMetier.textContent;
}

function hidePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileMetier.textContent = jobInput.value;

  hidePopup();
}

editButton.addEventListener('click', showPopup);
popupClose.addEventListener('click', hidePopup);
formElement.addEventListener('submit', handleFormSubmit);
