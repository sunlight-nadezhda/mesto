import {
  createCard,
  validationConfig,
  buttonEditProfile,
  nameProfileElement,
  metierProfileElement,
  avatarProfileElement,
  avatarEditElement,
  buttonAddCard,
  cardsContainer,
  profileFormElement,
  addCardFormElement,
  editAvatarFormElement,
  nameProfileInput,
  metierProfileInput
} from '../utils/constants.js';
import Section from '../components/Section.js';
// import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
  headers: {
    authorization: '1e5f7c98-03ad-4c6e-8333-1ab219b8293f',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards()
  .then((result) => {
    const elementsList = new Section({
      items: result,
      renderer: (obj) => {
        const cardElement = createCard(obj);
        elementsList.addItem(cardElement);
      }
    }, '.elements');
    elementsList.renderItems();
  })
  .catch(err => console.log(err));

fetch('https://mesto.nomoreparties.co/v1/cohort-22/users/me', {
  headers: {
    authorization: '1e5f7c98-03ad-4c6e-8333-1ab219b8293f'
  }
})
  .then(res => res.json())
  .then((result) => {
    nameProfileElement.textContent = result.name;
    metierProfileElement.textContent = result.about;
    avatarProfileElement.src = result.avatar;

    userPofile.setUserInfo(result.name, result.about);
  });

// const createCard = (data) => {
//   const card = new Card(data, '#element', (data) => {
//     popupShowImage.open(data);
//   });
//   const cardElement = card.createCard();
//   return cardElement;
// };

// fetch('https://mesto.nomoreparties.co/v1/cohort-22/cards', {
//   headers: {
//     authorization: '1e5f7c98-03ad-4c6e-8333-1ab219b8293f'
//   }
// })
//   .then(res => res.json())
  // .then((result) => {
  //   const elementsList = new Section({
  //     items: result,
  //     renderer: (obj) => {
  //       const cardElement = createCard(obj);
  //       elementsList.addItem(cardElement);
  //     }
  //   }, '.elements');
  //   elementsList.renderItems();
  // });

const popupShowImage = new PopupWithImage('.popup_type_show-image');

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', (data) => {
  const {
    'input-link-edit-avatar': linkValue
  } = data;

  fetch('https://mesto.nomoreparties.co/v1/cohort-22/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '1e5f7c98-03ad-4c6e-8333-1ab219b8293f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: linkValue
    })
  })
  .then(res => {
    return res.json();
  })
  .then(result => {
    avatarProfileElement.src = linkValue;
  });

  popupEditAvatar.close();
});

const editAvatarFormValidator = new FormValidator(validationConfig, editAvatarFormElement);
editAvatarFormValidator.enableValidation();

const userPofile = new UserInfo('.profile__name', '.profile__metier');

const popupProfile = new PopupWithForm('.popup_type_profile', (data) => {
  const {
    'input-name-profile': nameValue,
    'input-metier-profile': metierValue
  } = data;

  fetch('https://mesto.nomoreparties.co/v1/cohort-22/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '1e5f7c98-03ad-4c6e-8333-1ab219b8293f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameValue,
      about: metierValue
    })
  });

  userPofile.setUserInfo(nameValue, metierValue);
  popupProfile.close();
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
profileFormValidator.enableValidation();

const popupAddCard = new PopupWithForm('.popup_type_add-card', (data) => {
  const {
    'input-name-add-card': nameValue,
    'input-link-add-card': linkValue
  } = data;

  fetch('https://mesto.nomoreparties.co/v1/cohort-22/cards', {
    method: 'POST',
    headers: {
      authorization: '1e5f7c98-03ad-4c6e-8333-1ab219b8293f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameValue,
      link: linkValue
    })
  })
  .then(res => {
    return res.json();
  })
  .then(result => {
    const cardElement = createCard(result);
    cardsContainer.prepend(cardElement);
  });

  popupAddCard.close();
});

const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);
addCardFormValidator.enableValidation();

buttonEditProfile.addEventListener('click', handleOpenPopupProfile);

avatarEditElement.addEventListener('click', () => {
  editAvatarFormValidator.clearFormFields();
  popupEditAvatar.open();
});

buttonAddCard.addEventListener('click', () => {
  addCardFormValidator.clearFormFields();
  popupAddCard.open();
});

popupShowImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();
