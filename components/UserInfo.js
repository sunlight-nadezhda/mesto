export default class UserInfo {
  constructor(nameElementSelector, metierElementSelector) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._metierElement = document.querySelector(metierElementSelector);
    this._name = this._nameElement.textContent;
    this._metier = this._metierElement.textContent;
  }

  getUserInfo() {
    return {
      name: this._name,
      metier: this._metier
    }
  }

  setUserInfo(name, metier) {
    this._name = name;
    this._metier = metier;
    this._nameElement.textContent = this._name;
    this._metierElement.textContent = this._metier;
  }
}
