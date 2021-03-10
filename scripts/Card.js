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
    this._setEventListeners();
    const elementImage = this._element.querySelector('.element__image');
    const elementTitle = this._element.querySelector('.element__title');

    elementImage.src = this._link;
    elementImage.alt = this._name;
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

  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleChangeLike();
    });

    this._trashButton.addEventListener('click', () => {
      this._handleDeleteCard();
    });
  }
}
