const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

const profile = document.querySelector('.profile');
const buttonEditProfile = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileMetier = profile.querySelector('.profile__metier');

const popups = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('.popup_type_profile');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-button');
const containerPopupProfile = popupProfile.querySelector('.popup__container');
const nameProfileInput = containerPopupProfile.querySelector('.popup__input_type_name-profile');
const jobProfileInput = containerPopupProfile.querySelector('.popup__input_type_metier-profile');

const buttonAddCard = profile.querySelector('.profile__add-button');

const popupAddCard = document.querySelector('.popup_type_add-card');
const buttomClosePopupAddCard = popupAddCard.querySelector('.popup__close-button');
const containerPopupAddCard = popupAddCard.querySelector('.popup__container');
const nameAddCardInput = containerPopupAddCard.querySelector('.popup__input_type_name-card');
const linkAddCardInput = containerPopupAddCard.querySelector('.popup__input_type_link-card');

const popupShowImage = document.querySelector('.popup_type_show-image');
const buttonClosePopupShowImage = popupShowImage.querySelector('.popup__close-button');
const containerPopupImage = popupShowImage.querySelector('.popup__container_type_show-image');
const figureImagePopupImage = popupShowImage.querySelector('.figure__image');
const figureCaptionPopupImage = popupShowImage.querySelector('.figure__caption');

const addElementCard = item => {
  const elementListItem = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = elementListItem.querySelector('.element__image');

  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementListItem.querySelector('.element__title').textContent = item.name;

  const elementLikeButton = elementListItem.querySelector('.element__like-button');
  elementLikeButton.addEventListener('click', handleChangeLike);

  const elementTrashButton = elementListItem.querySelector('.element__trash');
  elementTrashButton.addEventListener('click', handleDeleteCard);

  elementImage.addEventListener('click', event => handleOpenPopupShowImage(event));

  return elementListItem;
};

const renderElements = objectsArray => {
  const htmlList = objectsArray.map(addElementCard);
  elementsList.append(...htmlList);
};

const openPopup = popup => {
  popup.classList.add('popup_opened');
}

const handleOpenPopupProfile = () => {
  openPopup(popupProfile);
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileMetier.textContent;
}

const closePopup = popup => {
  const inputElements = Array.from(popup.querySelectorAll('.popup__input'));
  const inputErrorElements = Array.from(popup.querySelectorAll('.popup__input-error'));
  inputElements.forEach(element => element.classList.remove('popup__input_type_error'));
  inputErrorElements.forEach(element => element.textContent = '');
  popup.classList.remove('popup_opened');
  Array.from(document.forms).forEach(formElement => formElement.reset());
}

const handleSubmitFormProfile = event => {
  event.preventDefault();
  profileName.textContent = nameProfileInput.value;
  profileMetier.textContent = jobProfileInput.value;
  closePopup(popupProfile);
};

const handleSubmitFormAddCard = event => {
  event.preventDefault();
  const inputTextName = nameAddCardInput.value;
  const inputTextLink = linkAddCardInput.value;
  const elementListItem = addElementCard({
    name: inputTextName,
    link: inputTextLink
  });
  elementsList.prepend(elementListItem);
  closePopup(popupAddCard);
};

const handleChangeLike = event => {
  event.target.classList.toggle('element__like-button_active');
}

const handleDeleteCard = event => {
  event.target.closest('.element').remove();
}

const getDataImage = event => {
  const eventTarget = event.target;
  const imageName = eventTarget.alt;
  const imageLink = eventTarget.src;
  return {
    name: imageName,
    link: imageLink
  };
}

const handleOpenPopupShowImage = event => {
  openPopup(popupShowImage);
  const item = getDataImage(event);
  figureImagePopupImage.src = item.link;
  figureImagePopupImage.alt = item.name;
  figureCaptionPopupImage.textContent = item.name;
}

buttonEditProfile.addEventListener('click', handleOpenPopupProfile);
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
containerPopupProfile.addEventListener('submit', handleSubmitFormProfile);

buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));
buttomClosePopupAddCard.addEventListener('click', () => closePopup(popupAddCard));
containerPopupAddCard.addEventListener('submit', handleSubmitFormAddCard);

buttonClosePopupShowImage.addEventListener('click', () => closePopup(popupShowImage));

popups.forEach(popup => popup.addEventListener('mousedown', event => {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
});

renderElements(initialCards);
