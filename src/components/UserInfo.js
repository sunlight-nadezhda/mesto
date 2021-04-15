export default class UserInfo {
  constructor(nameElementSelector, metierElementSelector, avatarElementSelector) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._metierElement = document.querySelector(metierElementSelector);
    this._avatarElement = document.querySelector(avatarElementSelector);
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._metier,
      avatar: this._avatar,
    }
  }

  setUserInfo(data) {
    this._name = data.name;
    this._metier = data.about;
    this._avatar = data.avatar;
    this._id = data._id;
    this._nameElement.textContent = this._name;
    this._metierElement.textContent = this._metier;
    this._avatarElement.src = this._avatar;
  }
}
