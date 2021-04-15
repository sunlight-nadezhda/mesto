export default class Card {
  constructor(data, isOwner, selector, functionArgs) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._isLiked = this._likes.some(item => item._id === this._myId);
    this._owner = data.owner;
    this._isOwner = isOwner;
    this._cardId = data._id;
    this._selector = selector;
    this._handleCardClick = functionArgs.handleCardClick;
    this._handleTrashClick = functionArgs.handleTrashClick;
    this._addLike = functionArgs.addLike;
    this._deleteLike = functionArgs.deleteLike;
  }

  renderCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._trashButton = this._element.querySelector('.element__trash');
    this._elementImage = this._element.querySelector('.element__image');
    const elementTitle = this._element.querySelector('.element__title');
    this._elementLikeCounter = this._element.querySelector('.element__like-counter');
    this._setEventListeners();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    elementTitle.textContent = this._name;
    this._elementLikeCounter.textContent = this._likes.length;

    if (!this._isOwner) this._trashButton.style.display = 'none';

    if (this._isLiked) {
      this._likeButton.classList.add('element__like-button_active');
    }

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
    if (this._isLiked) {
      this._handleAddLike();
    } else {
      this._handleDeleteLike();
    }
  }

  _handleAddLike() {
    this._likes.push(this._owner);
    this._addLike(this._cardId, this._likes)
      .then(result => {
        this._likes = result.likes;
        this._elementLikeCounter.textContent = this._likes.length;
      })
      .catch(err => {
        console.log(err);
      });
  }

  _handleDeleteLike() {
    this._deleteLike(this._cardId)
      .then(result => {
        this._likes = result.likes;
        this._elementLikeCounter.textContent = this._likes.length;
      })
      .catch(err => {
        console.log(err);
      });
  }

  _handleDeleteCard() {
    this._handleTrashClick({
      cardId: this._cardId,
      cardElement: this._element
    });
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
