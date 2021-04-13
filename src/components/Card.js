import PopupConfirm from './PopupConfirm.js';
export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes ?? [];
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._isOwner = data.owner._id === 'a9f148dd3d5e2f4620ee62f5';
    this._cardId = data._id;
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._trashButton = this._element.querySelector('.element__trash');
    this._elementImage = this._element.querySelector('.element__image');
    const elementTitle = this._element.querySelector('.element__title');
    const elementLikeCounter = this._element.querySelector('.element__like-counter');
    this._setEventListeners();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    elementTitle.textContent = this._name;
    elementLikeCounter.textContent = this._likes.length;

    if (!this._isOwner) this._trashButton.style.display = 'none';

    return this._element;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleChangeLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _handleDeleteCard() {
    const confirmPopup = new PopupConfirm('.popup_type_confirm');
    confirmPopup.open();
    confirmPopup.setEventListeners(this._cardId, this._element);
    // this._element.remove();
  }

  _handleShowImage() {
    this._handleCardClick({
      name: this._name,
      link: this._link
    });
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleChangeLike();
    });

    this._trashButton.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._elementImage.addEventListener('click', () => {
      this._handleShowImage();
    });
  }
}
