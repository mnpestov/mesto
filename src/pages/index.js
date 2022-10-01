import '../index.css';
import { config, popupCardEditButton, popupCardOpenButton } from '../utils/variables.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithDelete } from '../components/PoupWithDelete.js';
import { Api } from '../components/Api.js';

//функция открытия попапа картинки
const openImagePage = function (link, name) {
  popupImageForm.open(link, name);
}

const trashImage = function (deletableElement, cardId) {
  api.deleteCard(cardId)
  .then(() => {
    deletableElement.remove();
    deletableElement = null;
    popupDeleteCard.close();
  })
  .catch(err => console.log('Ошибка',err));
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: '3d5cca3f-8a8e-42db-8df2-befb64932740',
    'Content-Type': 'application/json'
  }
});

const openPopupFormAvatar = function () {
  popupEditAvatar.open();
}

const popupImageForm = new PopupWithImage('.popup_type_image');
popupImageForm.setEventListeners();

const popupDeleteCard = new PopupWithDelete('.popup_type_delete-card', trashImage);
popupDeleteCard.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  submitForm: (inputValue) => {
    popupEditAvatar.toggleSubmitButton(true);
    api.patchUserAvatar(inputValue)
      .then(data => {
        userInfo.setUserAvatar(data);
      })
      .finally(() => popupEditAvatar.toggleSubmitButton(false))
      .catch(err => console.log('Ошибка',err));
  }
});
popupEditAvatar.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__about-me', '.profile__avatar', '.profile__avatar-container', openPopupFormAvatar);
userInfo.setEventListeners();

const addFormValidator = new FormValidator(config, '.popup_type_add');
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, '.popup_type_edit');
editFormValidator.enableValidation();

//попап редактирования профиля
const popupEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submitForm: (inputValue) => {
    popupEditForm.toggleSubmitButton(true);
    api.patchUserInfo(inputValue)
      .then(data => userInfo.setUserInfo(data))
      .finally(() => popupEditForm.toggleSubmitButton(false))
      .catch(err => console.log('Ошибка',err));
  }
});
popupEditForm.setEventListeners();

api.getAllInfo()
  .then(([userData, initialCards]) => {
    function createCard(item) {
      const card = new Card(item, {
        openImagePage: openImagePage,
        openTrashPopup: (deletableElement, cardId) => popupDeleteCard.open(deletableElement, cardId),
        putLike: (cardId) => api.putLike(cardId),
        deleteLike: (cardId) => api.deleteLike(cardId)
      }, {
        templateSelector: '#element',
        elementSelector: '.element'
      }, userData._id);
      const cardElement = card.generateCard();
      return cardElement;
    }

    const newCardList = new Section({
      renderer: (item) => {
        const cardElement = createCard(item);
        newCardList.addItem(cardElement);
      }
    }, '.elements-list');
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    newCardList.renderItems(initialCards, userData._id);
    return (newCardList);
  })
  .then(newCardList => {
    const popupAddForm = new PopupWithForm({
      popupSelector: '.popup_type_add',
      submitForm: (inputValue) => {
        popupAddForm.toggleSubmitButton(true);
        api.postCard(inputValue)
          .then(data => {
            newCardList.renderItems([data]);
          })
          .finally(() => popupAddForm.toggleSubmitButton(false))
          .catch(err => console.log('Ошибка',err));
      }
    });

    popupAddForm.setEventListeners();
    //обрабатываю событие нажатия на кнопку добавления новой карточки
    popupCardOpenButton.addEventListener('click', function () {
      addFormValidator.resetValidation();
      popupAddForm.open();
    });
  })
  .catch(err => console.log('Ошибка',err));
  

//обрабатываю событие нажатия на кнопку редактирования данных профиля
popupCardEditButton.addEventListener('click', () => {
  popupEditForm.setInputValue(userInfo.getUserInfo());
  editFormValidator.resetValidation();
  popupEditForm.open();
});