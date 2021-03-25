import { initialCards, validationConfig } from '../utils/constants.js';
// import { closePopupByEsc, openPopup } from '../utils/utils.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// const elementsList = document.querySelector('.elements');

const profile = document.querySelector('.profile');
// const buttonEditProfile = profile.querySelector('.profile__edit-button');
// const profileName = profile.querySelector('.profile__name');
// const profileMetier = profile.querySelector('.profile__metier');
const buttonEditProfile = profile.querySelector('.profile__edit-button');

// const popups = Array.from(document.querySelectorAll('.popup'));


// const popupProfile = document.querySelector('.popup_type_profile');
// const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-button');
// const containerPopupProfile = popupProfile.querySelector('.popup__container');
// const nameProfileInput = containerPopupProfile.querySelector('.popup__input_type_name-profile');
// const jobProfileInput = containerPopupProfile.querySelector('.popup__input_type_metier-profile');
// const profileFormElement = popupProfile.querySelector('.popup__form');
const profilePopup = document.querySelector('.popup_type_profile');
const profileFormElement = profilePopup.querySelector('.popup__form');


const buttonAddCard = profile.querySelector('.profile__add-button');


// const popupAddCard = document.querySelector('.popup_type_add-card');
// const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-button');
// const containerPopupAddCard = popupAddCard.querySelector('.popup__container');
// const nameAddCardInput = containerPopupAddCard.querySelector('.popup__input_type_name-card');
// const linkAddCardInput = containerPopupAddCard.querySelector('.popup__input_type_link-card');
// const addCardFormElement = popupAddCard.querySelector('.popup__form');
const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardFormElement = addCardPopup.querySelector('.popup__form');

const cardsContainer = document.querySelector('.elements');

// const buttonClosePopupShowImage = popupShowImage.querySelector('.popup__close-button');

const createCard = (data) => {
  const card = new Card(data, '#element');
  const cardElement = card.createCard();
  return cardElement;
};

const elementsList = new Section({
  items: initialCards,
  renderer: createCard
}, '.elements');

// const elementsList = new Section({
//   items: initialCards,
//   renderer: (data) => {
//     const card = new Card(data, '#element');
//     const cardElement = card.createCard();
//     return cardElement;
//   }
// }, '.elements');

const popupShowImage = new PopupWithImage('.popup_type_show-image');

// const renderElements = (objectsArray, elementsList) => {
//   const htmlList = objectsArray.map(item => {
//     const cardElement = createCard(item, '#element');
//     return cardElement;
//   });
//   elementsList.append(...htmlList);
// };

const userPofile = new UserInfo('.profile__name', '.profile__metier');

const handleOpenPopupProfile = () => {
  profileFormValidator.clearFormFields();
  // openPopup(popupProfile);
  popupProfile.open();
  const { name, metier } = userPofile.getUserInfo();
  nameProfileInput.value = name;
  jobProfileInput.value = metier;
}

const popupProfile = new PopupWithForm('.popup_type_profile', (data) => {
  // evt.preventDefault();
  const {
    'input-name-profile': nameValue,
    'input-metier-profile': metierValue
  } = data;
  userPofile.setUserInfo(nameValue, metierValue);
  // profileName.textContent = nameProfileInput.value;
  // profileMetier.textContent = jobProfileInput.value;
});

const profileFormValidator = new FormValidator(validationConfig, profileFormElement);

// const closePopup = popup => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEsc);
// }

// const handleSubmitFormProfile = event => {
//   event.preventDefault();
//   profileName.textContent = nameProfileInput.value;
//   profileMetier.textContent = jobProfileInput.value;
//   popupProfile.close();
// };

const popupAddCard = new PopupWithForm('.popup_type_add-card', (data) => {
  const {
    'input-name-add-card': nameValue,
    'input-link-add-card': linkValue
  } = data;
  // const inputTextName = nameValue;
  // const inputTextLink = linkValue;
  // const cardElement = new Card({
  //   name: nameValue,
  //   link: linkValue
  // }, '#element');

  const cardElement = createCard({
    name: nameValue,
    link: linkValue
  });
  // const elementListItem = createCard({
  //   name: inputTextName,
  //   link: inputTextLink
  // },
  // '#element');

  cardsContainer.prepend(cardElement);
  // elementsList.prepend(elementListItem);
});

const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);

// const handleSubmitFormAddCard = event => {
//   event.preventDefault();
//   const inputTextName = nameAddCardInput.value;
//   const inputTextLink = linkAddCardInput.value;
//   const elementListItem = createCard({
//     name: inputTextName,
//     link: inputTextLink
//   },
//   '#element');
//   elementsList.prepend(elementListItem);
//   closePopup(popupAddCard);
// };

buttonEditProfile.addEventListener('click', handleOpenPopupProfile);
// buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
// containerPopupProfile.addEventListener('submit', handleSubmitFormProfile);

buttonAddCard.addEventListener('click', () => {
  addCardFormValidator.clearFormFields();
  // openPopup(popupAddCard);
  popupAddCard.open();
});
// buttonClosePopupAddCard.addEventListener('click', () => closePopup(popupAddCard));
// containerPopupAddCard.addEventListener('submit', handleSubmitFormAddCard);

// buttonClosePopupShowImage.addEventListener('click', () => closePopup(popupShowImage));

// popups.forEach(popup => popup.addEventListener('mousedown', event => {
//   if (event.target === event.currentTarget) {
//     closePopup(event.target);
//   }
// }));

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// renderElements(initialCards, elementsList);
const htmlList = elementsList.renderItems();
elementsList.addItem(...htmlList);

popupShowImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
