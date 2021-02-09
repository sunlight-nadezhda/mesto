const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

const profile = document.querySelector('.profile');
const buttonEditProfile = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileMetier = profile.querySelector('.profile__metier');

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-button');
const containerPopupProfile = popupProfile.querySelector('.popup__container');
const nameProfileInput = containerPopupProfile.querySelector('.popup__input-text_type_name');
const jobProfileInput = containerPopupProfile.querySelector('.popup__input-text_type_metier');

const buttonAddCard = profile.querySelector('.profile__add-button');

const popupAddCard = document.querySelector('.popup_type_add-card');
const buttomClosePopupAddCard = popupAddCard.querySelector('.popup__close-button');
const containerPopupAddCard = popupAddCard.querySelector('.popup__container');
const nameAddCardInput = containerPopupAddCard.querySelector('.popup__input-text_type_name');
const linkAddCardInput = containerPopupAddCard.querySelector('.popup__input-text_type_link');

const popupShowImage = document.querySelector('.popup_type_show-image');
const buttonClosePopupShowImage = popupShowImage.querySelector('.popup__close-button');
const containerPopupImage = popupShowImage.querySelector('.popup__container_type_show-image');
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

const handleSubmitFormProfile = event => {
  profileName.textContent = nameProfileInput.value;
  profileMetier.textContent = jobProfileInput.value;
  handleTogglePopup(event);
};

// const handleShowPopupAddCard = event => {
//   handleTogglePopup(event);
// };

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
  containerPopupImage.append(figure);
}

buttonEditProfile.addEventListener('click', handleShowPopupProfile);
buttonClosePopupProfile.addEventListener('click', handleTogglePopup);
containerPopupProfile.addEventListener('submit', handleSubmitFormProfile);

// buttonAddCard.addEventListener('click', handleShowPopupAddCard);
buttonAddCard.addEventListener('click', handleTogglePopup);
buttomClosePopupAddCard.addEventListener('click', handleTogglePopup);
containerPopupAddCard.addEventListener('submit', handleAddCard);

buttonClosePopupShowImage.addEventListener('click', handleTogglePopup);

popups.forEach(item => item.addEventListener('click', handleClosePopup));
renderElements(initialCards);
