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

  elementImage.addEventListener('click', handleOpenPopupShowImage);

  return elementListItem;
};

const renderElements = objectsArray => {
  const htmlList = objectsArray.map(addElementCard);
  elementsList.append(...htmlList);
};

const handleOpenPopupProfile = () => {
  popupProfile.classList.add('popup_opened');
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileMetier.textContent;
}

const handleClosePopupProfile = () => {
  popupProfile.classList.remove('popup_opened');
};

const handleSubmitFormProfile = event => {
  event.preventDefault();
  profileName.textContent = nameProfileInput.value;
  profileMetier.textContent = jobProfileInput.value;
  handleClosePopupProfile();
};

const handleOpenPopupAddCard = () => {
  popupAddCard.classList.add('popup_opened');
}

const handleClosePopupAddCard = () => {
  popupAddCard.classList.remove('popup_opened');
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
  handleClosePopupAddCard();
};

const handleChangeLike = event => {
  event.target.classList.toggle('element__like-button_active');
}

const handleDeleteCard = event => {
  event.target.closest('.element').remove();
}

const handleOpenPopupShowImage = event => {
  popupShowImage.classList.add('popup_opened');
  const eventTarget = event.target;
  const imageName = eventTarget.alt;
  const imageLink = eventTarget.src;
  figureImagePopupImage.src = imageLink;
  figureImagePopupImage.alt = imageName;
  figureCaptionPopupImage.textContent = imageName;
}

const handleClosePopupShowImage = () => {
  popupShowImage.classList.remove('popup_opened');
};

const handleClosePopup = event => {
  if (event.target === event.currentTarget) {
    event.target.classList.remove('popup_opened');
  }
};

buttonEditProfile.addEventListener('click', handleOpenPopupProfile);
buttonClosePopupProfile.addEventListener('click', handleClosePopupProfile);
containerPopupProfile.addEventListener('submit', handleSubmitFormProfile);

buttonAddCard.addEventListener('click', handleOpenPopupAddCard);
buttomClosePopupAddCard.addEventListener('click', handleClosePopupAddCard);
containerPopupAddCard.addEventListener('submit', handleSubmitFormAddCard);

buttonClosePopupShowImage.addEventListener('click', handleClosePopupShowImage);

popups.forEach(item => item.addEventListener('click', handleClosePopup));
renderElements(initialCards);
