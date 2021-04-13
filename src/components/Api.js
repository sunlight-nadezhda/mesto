import {
  createCard,
  validationConfig,
  buttonEditProfile,
  nameProfileElement,
  metierProfileElement,
  avatarProfileElement,
  avatarEditElement,
  buttonAddCard,
  cardsContainer,
  profileFormElement,
  addCardFormElement,
  editAvatarFormElement,
  nameProfileInput,
  metierProfileInput
} from '../utils/constants.js';

export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
      });
  }

  // другие методы работы с API
}


