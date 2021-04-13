import PopupConfirm from './PopupConfirm.js';
export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._isOwner = data.owner._id === 'a9f148dd3d5e2f4620ee62f5';
    this._cardId = data._id;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._trashButton = this._element.querySelector('.element__trash');
    this._elementImage = this._element.querySelector('.element__image');
    const elementTitle = this._element.querySelector('.element__title');
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');
    this._isLiked = this._likeButton.classList.contains('element__like-button_active');
    this._setEventListeners();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    elementTitle.textContent = this._name;
    this._elementLikeCounter.textContent = this._likes.length;

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
    this._isLiked = !this._isLiked;
    console.log(this._isLiked);
    if (this._isLiked) {
      this._handleAddLike();
      this._elementLikeCounter.textContent = this._likes.length;
    }
  }

  _handleAddLike() {
    this._likes.push(this._owner);
    fetch(`https://mesto.nomoreparties.co/v1/cohort-22/cards/likes/${this._cardId}`, {
      method: 'PUT',
      headers: {
        authorization: '1e5f7c98-03ad-4c6e-8333-1ab219b8293f',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes: this._likes})
    }).then(resolve => resolve.json())
    .then(result => {
      console.log(result);
    });
    console.log(this._cardId);
  }

  _handleDeleteCard() {
    const confirmPopup = new PopupConfirm('.popup_type_confirm');
    confirmPopup.open();
    confirmPopup.setEventListeners(this._cardId, this._element);
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
