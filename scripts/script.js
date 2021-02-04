let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileMetier = profile.querySelector('.profile__metier');

let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input-text_type_name');
let jobInput = formElement.querySelector('.popup__input-text_type_metier');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const togglePopup = event => {
  event.preventDefault();
  popup.classList.toggle('popup_opened');
}

const showPopup = event => {
  togglePopup(event);
  nameInput.value = profileName.textContent;
  jobInput.value = profileMetier.textContent;
}

const closePopup = event => {
  if (event.target === event.currentTarget) {
    togglePopup(event);
  }
};

const handleFormSubmit = event => {
  profileName.textContent = nameInput.value;
  profileMetier.textContent = jobInput.value;
  togglePopup(event);
}

editButton.addEventListener('click', showPopup);
popupClose.addEventListener('click', togglePopup);
formElement.addEventListener('submit', handleFormSubmit);
popup.addEventListener('click', closePopup);
