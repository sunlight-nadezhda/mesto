import { initialCards, validationConfig } from '../utils/constants.js';
// import { closePopupByEsc, openPopup } from '../utils/utils.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

// const elementsList = document.querySelector('.elements');

const profile = document.querySelector('.profile');
const buttonEditProfile = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileMetier = profile.querySelector('.profile__metier');

const popups = Array.from(document.querySelectorAll('.popup'));

const popupProfile = new PopupWithForm('.popup_type_profile');
// const popupProfile = document.querySelector('.popup_type_profile');
// const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-button');
const containerPopupProfile = popupProfile.querySelector('.popup__container');
const nameProfileInput = containerPopupProfile.querySelector('.popup__input_type_name-profile');
const jobProfileInput = containerPopupProfile.querySelector('.popup__input_type_metier-profile');
const profileFormElement = popupProfile.querySelector('.popup__form');
const profileFormValidator = new FormValidator(validationConfig, profileFormElement);

const buttonAddCard = profile.querySelector('.profile__add-button');

const popupAddCard = new PopupWithForm('.popup_type_add-card');
// const popupAddCard = document.querySelector('.popup_type_add-card');
// const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-button');
const containerPopupAddCard = popupAddCard.querySelector('.popup__container');
const nameAddCardInput = containerPopupAddCard.querySelector('.popup__input_type_name-card');
const linkAddCardInput = containerPopupAddCard.querySelector('.popup__input_type_link-card');
const addCardFormElement = popupAddCard.querySelector('.popup__form');
const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);


// const buttonClosePopupShowImage = popupShowImage.querySelector('.popup__close-button');

// const createCard = (data, selector) => {
//   const card = new Card(data, selector);
//   const cardElement = card.createCard();
//   return cardElement;
// };

const elementsList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, '#element');
    const cardElement = card.createCard();
    return cardElement;
  }
}, '.elements');

const popupShowImage = new PopupWithImage('.popup_type_show-image');

// const renderElements = (objectsArray, elementsList) => {
//   const htmlList = objectsArray.map(item => {
//     const cardElement = createCard(item, '#element');
//     return cardElement;
//   });
//   elementsList.append(...htmlList);
// };

const handleOpenPopupProfile = () => {
  profileFormValidator.clearFormFields();
  openPopup(popupProfile);
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileMetier.textContent;
}

// const closePopup = popup => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEsc);
// }

const handleSubmitFormProfile = event => {
  event.preventDefault();
  profileName.textContent = nameProfileInput.value;
  profileMetier.textContent = jobProfileInput.value;
  popupProfile.close();
};

const handleSubmitFormAddCard = event => {
  event.preventDefault();
  const inputTextName = nameAddCardInput.value;
  const inputTextLink = linkAddCardInput.value;
  const elementListItem = createCard({
    name: inputTextName,
    link: inputTextLink
  },
  '#element');
  elementsList.prepend(elementListItem);
  closePopup(popupAddCard);
};

buttonEditProfile.addEventListener('click', handleOpenPopupProfile);
// buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
containerPopupProfile.addEventListener('submit', handleSubmitFormProfile);

buttonAddCard.addEventListener('click', () => {
  addCardFormValidator.clearFormFields();
  openPopup(popupAddCard);
});
// buttonClosePopupAddCard.addEventListener('click', () => closePopup(popupAddCard));
containerPopupAddCard.addEventListener('submit', handleSubmitFormAddCard);

// buttonClosePopupShowImage.addEventListener('click', () => closePopup(popupShowImage));

popups.forEach(popup => popup.addEventListener('mousedown', event => {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}));

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// renderElements(initialCards, elementsList);
const htmlList = elementsList.renderItems();
elementsList.addItem(...htmlList);

popupShowImage.setEventListeners();
