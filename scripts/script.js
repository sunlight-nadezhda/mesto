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
const nameProfileInput = containerPopupProfile.querySelector('.popup__input-text_type_name-profile');
const jobProfileInput = containerPopupProfile.querySelector('.popup__input-text_type_metier-profile');

const buttonAddCard = profile.querySelector('.profile__add-button');

const popupAddCard = document.querySelector('.popup_type_add-card');
const buttomClosePopupAddCard = popupAddCard.querySelector('.popup__close-button');
const containerPopupAddCard = popupAddCard.querySelector('.popup__container');
const nameAddCardInput = containerPopupAddCard.querySelector('.popup__input-text_type_name-card');
const linkAddCardInput = containerPopupAddCard.querySelector('.popup__input-text_type_link-card');

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

  elementImage.addEventListener('click', () => handleOpenPopup(event, popupShowImage));

  return elementListItem;
};

const renderElements = objectsArray => {
  const htmlList = objectsArray.map(addElementCard);
  elementsList.append(...htmlList);
};

const getDataImage = event => {
  const eventTarget = event.target;
  const imageName = eventTarget.alt;
  const imageLink = eventTarget.src;
  return {
    name: imageName,
    link: imageLink
  };
}

const handleOpenPopup = (event, popup) => {
  popup.classList.add('popup_opened');
  if (popup === popupProfile) {
    nameProfileInput.value = profileName.textContent;
    jobProfileInput.value = profileMetier.textContent;
  }
  if (popup === popupShowImage) {
    item = getDataImage(event);
    figureImagePopupImage.src = item.link;
    figureImagePopupImage.alt = item.name;
    figureCaptionPopupImage.textContent = item.name;
  }
}

const handleClosePopup = popup => {
  popup.classList.remove('popup_opened');
}

const handleSubmitFormProfile = event => {
  event.preventDefault();
  profileName.textContent = nameProfileInput.value;
  profileMetier.textContent = jobProfileInput.value;
  handleClosePopup(popupProfile);
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
  nameAddCardInput.value = '';
  linkAddCardInput.value = '';
  handleClosePopup(popupAddCard);
};

const handleChangeLike = event => {
  event.target.classList.toggle('element__like-button_active');
}

const handleDeleteCard = event => {
  event.target.closest('.element').remove();
}

buttonEditProfile.addEventListener('click', () => handleOpenPopup(event, popupProfile));
buttonClosePopupProfile.addEventListener('click', () => handleClosePopup(popupProfile));
containerPopupProfile.addEventListener('submit', handleSubmitFormProfile);

buttonAddCard.addEventListener('click', () => handleOpenPopup(event, popupAddCard));
buttomClosePopupAddCard.addEventListener('click', () => handleClosePopup(popupAddCard));
containerPopupAddCard.addEventListener('submit', handleSubmitFormAddCard);

buttonClosePopupShowImage.addEventListener('click', () => handleClosePopup(popupShowImage));

popups.forEach(item => item.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    handleClosePopup(event.target);
  }
}));
renderElements(initialCards);
