import { initialCards, validationConfig } from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const profile = document.querySelector('.profile');
const buttonEditProfile = profile.querySelector('.profile__edit-button');
const buttonAddCard = profile.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup_type_profile');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameProfileInput = profileFormElement.querySelector('.popup__input_type_name-profile');
const metierProfileInput = profileFormElement.querySelector('.popup__input_type_metier-profile');

const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardFormElement = addCardPopup.querySelector('.popup__form');

const cardsContainer = document.querySelector('.elements');

const createCard = (data) => {
  const card = new Card(data, '#element', (data) => {
    popupShowImage.open(data);
  });
  const cardElement = card.createCard();
  return cardElement;
};

const elementsList = new Section({
  items: initialCards,
  renderer: createCard
}, '.elements');

const userPofile = new UserInfo('.profile__name', '.profile__metier');

const popupProfile = new PopupWithForm('.popup_type_profile', (data) => {
  const {
    'input-name-profile': nameValue,
    'input-metier-profile': metierValue
  } = data;
  userPofile.setUserInfo(nameValue, metierValue);
});

const handleOpenPopupProfile = () => {
  profileFormValidator.clearFormFields();
  const userInfo = userPofile.getUserInfo();
  const { name, metier} = userInfo;
  nameProfileInput.value = name;
  metierProfileInput.value = metier;
  popupProfile.open();
}

const profileFormValidator = new FormValidator(validationConfig, profileFormElement);

const popupAddCard = new PopupWithForm('.popup_type_add-card', (data) => {
  const {
    'input-name-add-card': nameValue,
    'input-link-add-card': linkValue
  } = data;

  const cardElement = createCard({
    name: nameValue,
    link: linkValue
  });

  cardsContainer.prepend(cardElement);
});

const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);

const popupShowImage = new PopupWithImage('.popup_type_show-image');

const htmlList = elementsList.renderItems();
htmlList.forEach(card => elementsList.addItem(card));

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

buttonEditProfile.addEventListener('click', handleOpenPopupProfile);

buttonAddCard.addEventListener('click', () => {
  addCardFormValidator.clearFormFields();
  popupAddCard.open();
});

popupShowImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
