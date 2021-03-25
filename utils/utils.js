const closePopupByEsc = event => {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// const openPopup = popup => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEsc);
// }

export { closePopupByEsc, openPopup };
