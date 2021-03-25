// import { openPopup } from '../utils/utils.js';

export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._trashButton = this._element.querySelector('.element__trash');
    this._elementImage = this._element.querySelector('.element__image');
    const elementTitle = this._element.querySelector('.element__title');
    this._setEventListeners();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    elementTitle.textContent = this._name;

    return this._element;
  }

  _handleChangeLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _handleDeleteCard() {
    this._element.remove();
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
