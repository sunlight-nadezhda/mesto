export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const profile = document.querySelector('.profile');
export const buttonEditProfile = profile.querySelector('.profile__edit-button');
export const buttonAddCard = profile.querySelector('.profile__add-button');
// export const nameProfileElement = profile.querySelector('.profile__name');
// export const metierProfileElement = profile.querySelector('.profile__metier');
// export const avatarProfileElement = profile.querySelector('.profile__avatar');
export const avatarEditElement = profile.querySelector('.profile__avatar-edit');

const profilePopup = document.querySelector('.popup_type_profile');
export const profileFormElement = profilePopup.querySelector('.popup__form');
export const nameProfileInput = profileFormElement.querySelector('.popup__input_type_name-profile');
export const metierProfileInput = profileFormElement.querySelector('.popup__input_type_metier-profile');

const addCardPopup = document.querySelector('.popup_type_add-card');
export const addCardFormElement = addCardPopup.querySelector('.popup__form');

const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
export const editAvatarFormElement = editAvatarPopup.querySelector('.popup__form');

// export const confirmPopup = document.querySelector('.popup_type_confirm');

// export const cardsContainer = document.querySelector('.elements');
