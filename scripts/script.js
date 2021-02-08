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
const jobProfileInput = formProfileElement.querySelector('.popup__input-text_type_metier');

const buttonAddCard = profile.querySelector('.profile__add-button');

const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAddCardClose = popupAddCard.querySelector('.popup__close-button');
const formAddCardElement = popupAddCard.querySelector('.popup__container');
const nameAddCardInput = formAddCardElement.querySelector('.popup__input-text_type_name');
const linkAddCardInput = formAddCardElement.querySelector('.popup__input-text_type_link');

const popupShowImage = document.querySelector('.popup_type_show-image');
const popupShowImageClose = popupShowImage.querySelector('.popup__close-button');
const popupImageContainer = popupShowImage.querySelector('.popup__container_type_show-image');
const figureTemplate = document.querySelector('#figure').content;

const addElementCard = (item) => {
  const elementListItem = elementTemplate.querySelector('.element').cloneNode(true);

  elementListItem.querySelector('.element__image').src = item.link;
  elementListItem.querySelector('.element__image').alt = item.name;
  elementListItem.querySelector('.element__title').textContent = item.name;

  const elementLikeButton = elementListItem.querySelector('.element__like-button');
  elementLikeButton.addEventListener('click', handleChangeLike);

  const elementTrashButton = elementListItem.querySelector('.element__trash');
  elementTrashButton.addEventListener('click', handleDeleteCard);

  const elementImage = elementListItem.querySelector('.element__image');
  elementImage.addEventListener('click', handleShowImage);

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
  if (eventTarget.closest('.popup_type_add-card') || eventTarget.classList.contains('profile__add-button')) {
    return popupAddCard;
  }
  if (eventTarget.closest('.popup_type_show-image') || eventTarget.classList.contains('element__image')) {
    return popupShowImage;
  }
}

const deleteAddedFigure = event => {
  const popup = event.target.closest('.popup_type_show-image');
  if (popup) {
    popup.querySelector('.figure').remove();
  }
}

const handleTogglePopup = event => {
  event.preventDefault();
  const currentPopup = choosePopup(event);
  currentPopup.classList.toggle('popup_opened');
  const popupContainer = currentPopup.querySelector('.popup__container');
  popupContainer.classList.toggle('popup__container_visible');
  deleteAddedFigure(event);
};

const handleShowPopupProfile = event => {
  handleTogglePopup(event);
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileMetier.textContent;
};

const handleClosePopup = event => {
  if (event.target === event.currentTarget) {
    handleTogglePopup(event);
  }
};

const handleFormProfileSubmit = event => {
  profileName.textContent = nameProfileInput.value;
  profileMetier.textContent = jobProfileInput.value;
  handleTogglePopup(event);
};

const handleShowPopupAddCard = event => {
  handleTogglePopup(event);
};

const handleAddCard = event => {
  const inputTextName = nameAddCardInput.value;
  const inputTextLink = linkAddCardInput.value;
  const elementListItem = addElementCard({
    name: inputTextName,
    link: inputTextLink
  });
  elementsList.prepend(elementListItem);
  nameAddCardInput.value = '';
  linkAddCardInput.value = '';
  handleTogglePopup(event);
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

const createFigure = obj => {
  const figure = figureTemplate.querySelector('.figure').cloneNode(true);
  figure.querySelector('.figure__image').alt = obj.name;
  figure.querySelector('.figure__image').src = obj.link;
  figure.querySelector('.figure__caption').textContent = obj.name;
  return figure;
}

const handleShowImage = event => {
  handleTogglePopup(event);
  const dataImage = getDataImage(event);
  const figure = createFigure(dataImage);
  popupImageContainer.append(figure);
}

buttonEditProfile.addEventListener('click', handleShowPopupProfile);
popupProfileClose.addEventListener('click', handleTogglePopup);
formProfileElement.addEventListener('submit', handleFormProfileSubmit);

buttonAddCard.addEventListener('click', handleShowPopupAddCard);
popupAddCardClose.addEventListener('click', handleTogglePopup);
formAddCardElement.addEventListener('submit', handleAddCard);

popupShowImageClose.addEventListener('click', handleTogglePopup);

popup.forEach(item => item.addEventListener('click', handleClosePopup));
renderElements(initialCards);
