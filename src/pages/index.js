import {
  validationConfig,
  buttonEditProfile,
  avatarEditElement,
  buttonAddCard,
  profileFormElement,
  addCardFormElement,
  editAvatarFormElement,
  nameProfileInput,
  metierProfileInput,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
  headers: {
    authorization: "1e5f7c98-03ad-4c6e-8333-1ab219b8293f",
    "Content-Type": "application/json",
  },
});

const popupShowImage = new PopupWithImage(".popup_type_show-image");

const createCard = (data, userId) => {
  const card = new Card(data, userId, "#element", {
    handleCardClick: (cardInfo) => {
      popupShowImage.open(cardInfo);
    },

    handleTrashClick: (cardIdentifier) => {
      const popupConfirm = new PopupWithForm(".popup_type_confirm", (data) => {
        api
          .deleteCard(cardIdentifier.cardId)
          .then(() => {
            cardIdentifier.cardElement.remove();
            popupConfirm.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
      popupConfirm.open();
      popupConfirm.setEventListeners();
    },

    addLike: (cardId, cardLikes) => {
      return api.addLike(cardId, cardLikes);
    },

    deleteLike: (cardId) => {
      return api.deleteLike(cardId);
    },
  });

  const cardElement = card.renderCard();
  return cardElement;
};

const userPofile = new UserInfo(
  '.profile__name',
  '.profile__metier',
  '.profile__avatar'
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((values) => {
    const [userData, initialCards] = values;

    userPofile.setUserInfo(userData);
    const userId = userPofile.getUserId();

    const elementsList = new Section(
      {
        items: initialCards,
        renderer: (cardInfo) => {
          const cardElement = createCard(cardInfo, userId);
          elementsList.addItem(cardElement);
        },
      },
      ".elements"
    );
    elementsList.renderItems();
    console.log("userData: ", userData);
    console.log("initialCards: ", initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

const popupEditAvatar = new PopupWithForm(".popup_type_edit-avatar", (data) => {
  const { "input-link-edit-avatar": linkValue } = data;

  popupEditAvatar.renderLoading(false);
  api
    .sendLinkAvatar(linkValue)
    .then(() => {
      avatarProfileElement.src = linkValue;
      popupEditAvatar.renderLoading(true);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

const editAvatarFormValidator = new FormValidator(
  validationConfig,
  editAvatarFormElement
);
editAvatarFormValidator.enableValidation();

const popupProfile = new PopupWithForm(".popup_type_profile", (data) => {
  const {
    "input-name-profile": nameValue,
    "input-metier-profile": metierValue,
  } = data;

  popupProfile.renderLoading(false);
  api
    .sendUserInfo({
      name: nameValue,
      about: metierValue,
    })
    .then(() => {
      userPofile.setUserInfo(nameValue, metierValue);
      popupProfile.renderLoading(true);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

const handleOpenPopupProfile = () => {
  profileFormValidator.clearFormFields();
  const userInfo = userPofile.getUserInfo();
  const { name, metier } = userInfo;
  nameProfileInput.value = name;
  metierProfileInput.value = metier;
  popupProfile.open();
};

const profileFormValidator = new FormValidator(
  validationConfig,
  profileFormElement
);
profileFormValidator.enableValidation();

const popupAddCard = new PopupWithForm(".popup_type_add-card", (data) => {
  const {
    "input-name-add-card": nameValue,
    "input-link-add-card": linkValue,
  } = data;

  popupAddCard.renderLoading(false);
  api
    .addCard({
      name: nameValue,
      link: linkValue,
    })
    .then((newCardInfo) => {
      const userId = newCardInfo.owner._id;
      const cardsContainer = new Section({}, '.elements');
      const cardElement = createCard(newCardInfo, userId);
      cardsContainer.addItem(cardElement, false);
      popupAddCard.renderLoading(true);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

const addCardFormValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);
addCardFormValidator.enableValidation();

buttonEditProfile.addEventListener("click", handleOpenPopupProfile);

avatarEditElement.addEventListener("click", () => {
  editAvatarFormValidator.clearFormFields();
  popupEditAvatar.open();
});

buttonAddCard.addEventListener("click", () => {
  addCardFormValidator.clearFormFields();
  popupAddCard.open();
});

popupShowImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();
