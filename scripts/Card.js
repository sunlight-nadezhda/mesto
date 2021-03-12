import { openPopup } from './index.js';

export default class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
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
    this._elementTitle = this._element.querySelector('.element__title');
    this._setEventListeners();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    return this._element;
  }

  _handleChangeLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleShowImage() {
    const popupShowImage = document.querySelector('.popup_type_show-image');
    this._figureImagePopupImage = popupShowImage.querySelector('.figure__image');
    this._figureCaptionPopupImage = popupShowImage.querySelector('.figure__caption');
    openPopup(popupShowImage);
    this._figureImagePopupImage.src = this._link;
    this._figureImagePopupImage.alt = this._name;
    this._figureCaptionPopupImage.textContent = this._name;
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
