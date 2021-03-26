import {
  initialCards,
  validationConfig,
  buttonEditProfile,
  buttonAddCard,
  cardsContainer,
  profileFormElement,
  addCardFormElement,
  nameProfileInput,
  metierProfileInput
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

const popupShowImage = new PopupWithImage('.popup_type_show-image');

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
