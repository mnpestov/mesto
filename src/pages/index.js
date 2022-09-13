import '../index.css';
import { config, initialCards, popupCardEditButton, inputName, inputAboutMe, popupCardOpenButton } from '../utils/variables.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/validate.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

//функция открытия попапа картинки
const openImagePage = function openImagePage(link, name) {
  popupImageForm.open(link, name);
}
const userInfo = new UserInfo('.profile__name', '.profile__about-me');

const addFormValidator = new FormValidator(config, '.popup_type_add');
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(config, '.popup_type_edit');
editFormValidator.enableValidation();

//Создаю дефолтные карточки
const newCardList = new Section({
  renderer: (item) => {
    const card = new Card(item, openImagePage, '#element');
    const cardElement = card.generateCard();
    newCardList.addItem(cardElement);
  }
}, '.elements-list');
newCardList.renderItems(initialCards);

//попап редактирования профиля
const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submitForm: (inputValue) => { userInfo.setUserInfo(inputValue); }
});
popupEditForm.setEventListeners();
//обрабатываю событие нажатия на кнопку редактирования данных профиля
popupCardEditButton.addEventListener('click', () => {
  const curentUserInfo = userInfo.getUserInfo();
  inputName.value = curentUserInfo.userName;
  inputAboutMe.value = curentUserInfo.userDescription;
  editFormValidator.checkBeforeOpening();
  popupEditForm.open();
});

//попап новой карточки
const popupAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add',
  submitForm: (inputValue) => newCardList.renderItems([inputValue])
});
popupAddForm.setEventListeners();
//обрабатываю событие нажатия на кнопку добавления новой карточки
popupCardOpenButton.addEventListener('click', function () {
  popupAddForm.reset();
  addFormValidator.checkBeforeOpening();
  popupAddForm.open();
});

const popupImageForm = new PopupWithImage('.popup_type_image');
popupImageForm.setEventListeners();