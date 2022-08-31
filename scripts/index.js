import {config, initialCards, inputNameOfImage, popupCardCloseButton, inputUrl, popupPicture, popupImageForm, elements, popupCardEditButton, inputName, inputAboutMe, popupEditForm, functions, profileName, aboutMe, popupCardOpenButton, popupAddForm} from './variables.js';
import {Card} from './Card.js';
import {FormValidator} from './validate.js';

//универсальная функция сброса формы
function reset(form) {
  form.reset();
}

//универсальная функция открытия формы
export function openPopup(popup) {
  popup.classList.add('popup_opened');
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

//функция постановки и снятия лайка
functions.toggleLike = function toggleLike(likeElement) {
  likeElement.classList.toggle('element__like_active');
  likeElement.classList.toggle('opacity-transition_type_small');
}

//функция удаления карточки
functions.trashImage = function trashImage(trashElement) {
  trashElement.closest('.element').remove();
}

//функция открытия попапа картинки
functions.openImagePage = function openImagePage(imageElement) {
  popupPicture.src = imageElement.currentSrc;
  popupPicture.alt = imageElement.alt;
  popupImageForm.querySelector('.popup__subtitle').textContent = imageElement.parentElement.querySelector('.element__title').textContent;
  openPopup(popupImageForm);
  document.addEventListener('keydown', closePopupEsc);
  popupImageForm.addEventListener('click', closeByClickingOnOverlay);
}

function renderCard(newCard) {
  console.log(functions);
  const card = new Card(newCard, functions, '#element');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}

initialCards.forEach(function (item) {
  renderCard(item);
});

//обрабатываю событие нажатия на кнопку редактирования данных профиля
popupCardEditButton.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputAboutMe.value = aboutMe.textContent;
  const formValidator = new FormValidator(config, '.popup_type_edit');
  formValidator.enableValidation();
  openPopup(popupEditForm);
  document.addEventListener('keydown', closePopupEsc);
  popupEditForm.addEventListener('click', closeByClickingOnOverlay);
});

//обрабатываю событие нажатия на кнопку добавления новой карточки
popupCardOpenButton.addEventListener('click', function () {
  reset(popupAddForm);

  const formValidator = new FormValidator(config, '.popup_type_add');
  formValidator.enableValidation();
  openPopup(popupAddForm);
  document.addEventListener('keydown', closePopupEsc);
  popupAddForm.addEventListener('click', closeByClickingOnOverlay);
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