const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileMetier = profile.querySelector('.profile__metier');

const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close-button');
const formElement = popup.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input-text_type_name');
const jobInput = formElement.querySelector('.popup__input-text_type_metier');

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

const togglePopup = event => {
  event.preventDefault();
  popup.classList.toggle('popup_opened');
};

const showPopup = event => {
  togglePopup(event);
  nameInput.value = profileName.textContent;
  jobInput.value = profileMetier.textContent;
};

const closePopup = event => {
  if (event.target === event.currentTarget) {
    togglePopup(event);
  }
};

const handleFormSubmit = event => {
  profileName.textContent = nameInput.value;
  profileMetier.textContent = jobInput.value;
  togglePopup(event);
};

editButton.addEventListener('click', showPopup);
popupClose.addEventListener('click', togglePopup);
formElement.addEventListener('submit', handleFormSubmit);
popup.addEventListener('click', closePopup);

renderElements(initialCards);
