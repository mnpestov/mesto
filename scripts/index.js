import { config, initialCards, inputNameOfImage, popupCardCloseButton, inputUrl, popupPicture, popupImageForm, elements, popupCardEditButton, inputName, inputAboutMe, popupEditForm, profileName, aboutMe, popupCardOpenButton, popupAddForm } from './variables.js';
import { Card } from './Card.js';
import { FormValidator } from './validate.js';

//универсальная функция сброса формы
function reset(form) {
  form.reset();
}

//универсальная функция открытия формы
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closeByClickingOnOverlay);
}

//универсальная функция закрытия формы
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //снимаю слушатель нажатия клавиши esc
  document.removeEventListener('keydown', closePopupEsc);
  //снимаю слушатель нажатия на оверлэй
  popup.removeEventListener('click', closeByClickingOnOverlay);
}

//функция закртия формы нажатием на esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const form = document.querySelector('.popup_opened');
    closePopup(form);
  }
}

//функция закрытия формы нажатием на оверлэй
function closeByClickingOnOverlay(evt) {
  if (!(evt.target.closest('.popup__container')) || !(evt.target.closest('.popup__image-container'))) {
    closePopup(evt.target);
  }
}

//функция открытия попапа картинки
const openImagePage = function openImagePage(link, name) {
  popupPicture.src = link;
  popupPicture.alt = 'Изображение ' + name;
  popupImageForm.querySelector('.popup__subtitle').textContent = name;
  openPopup(popupImageForm);
}

function renderCard(newCard) {
  const card = new Card(newCard, openImagePage, '#element');
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach(function (item) {
  const cardElement = renderCard(item);
  elements.prepend(cardElement);
});

const addFormValidator = new FormValidator(config, '.popup_type_add');
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(config, '.popup_type_edit');
editFormValidator.enableValidation();

//обрабатываю событие нажатия на кнопку редактирования данных профиля
popupCardEditButton.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputAboutMe.value = aboutMe.textContent;
  editFormValidator.checkBeforeOpening();
  openPopup(popupEditForm);
});

//обрабатываю событие нажатия на кнопку добавления новой карточки
popupCardOpenButton.addEventListener('click', function () {
  reset(popupAddForm);
  addFormValidator.checkBeforeOpening();
  openPopup(popupAddForm);
});

//обрабатываю событие сабмит формы редактирования данных профиля
popupEditForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  aboutMe.textContent = inputAboutMe.value;
  closePopup(popupEditForm);
});

//обрабатываю событие сабмит формы добавления новой карточки
popupAddForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = {
    name: inputNameOfImage.value,
    link: inputUrl.value
  };
  renderCard(newCard);
  closePopup(popupAddForm);
});

//обрабатываю событие нажатия на кнопку закрытия попапа
popupCardCloseButton.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    const form = evt.target.closest('.popup');
    closePopup(form);
  });
});