const page = document.querySelector('.page');
const popupCardOpenButton = page.querySelector('.button_type_add');
const popupCardEditButton = page.querySelector('.button_type_edit');
const popupCardCloseButton = page.querySelectorAll('.popup__close');
const inputName = page.querySelector('.popup__input_type_name');
const inputAboutMe = page.querySelector('.popup__input_type_about-me');
const inputNameOfImage = page.querySelector('.popup__input_type_name-of-image');
const inputUrl = page.querySelector('.popup__input_type_url');
const profileName = page.querySelector('.profile__name');
const aboutMe = page.querySelector('.profile__about-me');
const popupEditForm = page.querySelector('.popup_type_edit');
const popupAddForm = page.querySelector('.popup_type_add');
const popupImageForm = page.querySelector('.popup_type_image');
const elements = page.querySelector('.elements-list');
const popupPicture = popupImageForm.querySelector('.popup__image');

const config = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  opacityLargeClass: 'opacity-transition_type_large'
};
const inputListAddForm = Array.from(popupAddForm.querySelectorAll(config.inputSelector));
const buttonElementAddForm = popupAddForm.querySelector(config.submitButtonSelector);
const inputListEditForm = Array.from(popupEditForm.querySelectorAll(config.inputSelector));
const buttonElementEditForm = popupEditForm.querySelector(config.submitButtonSelector);
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];