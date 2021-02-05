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

const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

const profile = document.querySelector('.profile');
const buttonEditProfile = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileMetier = profile.querySelector('.profile__metier');

const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileClose = popupProfile.querySelector('.popup__close-button');
const formProfileElement = popupProfile.querySelector('.popup__container');
const nameProfileInput = formProfileElement.querySelector('.popup__input-text_type_name');
const jobInput = formProfileElement.querySelector('.popup__input-text_type_metier');

const buttonAddCard = profile.querySelector('.profile__add-button');

const popupAddCard = document.querySelector('.popup_type_add-place');
const popupAddCardClose = popupAddCard.querySelector('.popup__close-button');

const addElementCard = (item) => {
  const elementListItem = elementTemplate.querySelector('.element').cloneNode(true);

  elementListItem.querySelector('.element__image').src = item.link;
  elementListItem.querySelector('.element__image').alt = item.name;
  elementListItem.querySelector('.element__title').textContent = item.name;

  return elementListItem;
};

const renderElements = objectsArray => {
  const htmlList = objectsArray.map(addElementCard);
  elementsList.append(...htmlList);
};

const choosePopup = event => {
  const eventTarget = event.target;
  if (eventTarget.closest('.popup_type_profile') || eventTarget.classList.contains('profile__edit-button')) {
    return popupProfile;
  }
  if (eventTarget.closest('.popup_type_add-place') || eventTarget.classList.contains('profile__add-button')) {
    return popupAddCard;
  }
}

const togglePopup = (event) => {
  event.preventDefault();
  choosePopup(event).classList.toggle('popup_opened');
};

const showPopupProfile = event => {
  togglePopup(event);
  nameProfileInput.value = profileName.textContent;
  jobInput.value = profileMetier.textContent;
};

const closePopup = event => {
  if (event.target === event.currentTarget) {
    togglePopup(event);
  }
};

const handleFormSubmit = event => {
  profileName.textContent = nameProfileInput.value;
  profileMetier.textContent = jobInput.value;
  togglePopup(event);
};

const showPopupAddPlace = event => {
  togglePopup(event);
};

buttonEditProfile.addEventListener('click', showPopupProfile);
popupProfileClose.addEventListener('click', togglePopup);
formProfileElement.addEventListener('submit', handleFormSubmit);

buttonAddCard.addEventListener('click', showPopupAddPlace);
popupAddCardClose.addEventListener('click', togglePopup);

popup.forEach(item => item.addEventListener('click', closePopup));
renderElements(initialCards);
