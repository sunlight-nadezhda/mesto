export default class UserInfo {
  constuctor({ nameElementSelector, metierElementSelector }) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._metierElement = document.querySelector(metierElementSelector);
  }

  getUserInfo() {
    this.name = this._nameElement.textContent;
    this._metier = this._metierElement.textContent;
    return {
      name: this.name,
      metier: this._metier
    }
  }

  setUserInfo(name, metier) {
    this.name = name;
    this._metier = metier;
    this._nameElement.textContent = this.name;
    this._metierElement.textContent = this.metier;
  }
}
