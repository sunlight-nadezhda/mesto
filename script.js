let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');

function showPopup() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', showPopup);

function hidePopup() {
  popup.classList.remove('popup_opened');
}

popupClose.addEventListener('click', hidePopup);
