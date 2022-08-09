//универсальная функция сброса формы
function reset(form) {
  form.reset();
}

//универсальная функция очистки информации об ошибках
function cleanInputError(form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(function (inputElement) {
    hideInputError(form, inputElement, config.inputErrorClass, config.errorClass);
  });
}

//универсальная функция открытия формы
function openPopup(form) {
  form.classList.add('popup_opened');
}

//универсальная функция закрытия формы
function closePopup(form) {
  form.classList.remove('popup_opened');
  //снимаю слушатель нажатия клавиши esc
  document.removeEventListener('keydown', closePopupEsc);
  //снимаю слушатель нажатия на оверлэй
  form.removeEventListener('click', closeByClickingOnOverlay);
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
  const form = document.querySelector('.popup_opened');
  const popupContainer = form.querySelector('.popup__container');
  const popupImageContainer = form.querySelector('.popup__image-container');
  if ((evt.target.closest('.popup__container') !== popupContainer) || (evt.target.closest('.popup__image-container') !== popupImageContainer)) {
    closePopup(form);
  }
}

//функция постановки и снятия лайка
function toggleLike(likeElement) {
  likeElement.classList.toggle('element__like_active');
  likeElement.classList.toggle('opacity-transition_type_small');
}

//функция удаления карточки
function trashImage(trashElement) {
  trashElement.closest('.element').remove();
}

//функция открытия попапа картинки
function openImagePage(imageElement) {
  popupPicture.src = imageElement.currentSrc;
  popupPicture.alt = imageElement.alt;
  popupImageForm.querySelector('.popup__subtitle').textContent = imageElement.parentElement.querySelector('.element__title').textContent;
  openPopup(popupImageForm);
  document.addEventListener('keydown', closePopupEsc);
  popupImageForm.addEventListener('click', closeByClickingOnOverlay);
}

//функция создания карточек
function createCard(item) {
  const templateElement = document.querySelector('#element').content;
  const element = templateElement.querySelector('.element').cloneNode(true);
  const elementPicture = element.querySelector('.element__image');
  elementPicture.src = item.link;
  elementPicture.alt = 'Изображение ' + item.name;
  element.querySelector('.element__title').textContent = item.name;
  return (element)
}

//функция добавления карточек
function renderCard(newCard) {
  const card = createCard(newCard);
  elements.prepend(card);
}

//добавляю дефолтные карточки
initialCards.forEach(function (item) {
  renderCard(item);
});

//обрабатываю события нажатия на лайки, корзины и картинки
elements.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('element__like')) {
    toggleLike(evt.target);
  } else if (evt.target.classList.contains('element__trash')) {
    trashImage(evt.target);
  } else if (evt.target.classList.contains('element__image')) {
    openImagePage(evt.target);
  }
});

//обрабатываю событие нажатия на кнопку редактирования данных профиля
popupCardEditButton.addEventListener('click', function () {
  const inputList = Array.from(popupEditForm.querySelectorAll('.popup__input'));
  const buttonElement = popupEditForm.querySelector('.button_type_submit');
  inputName.value = profileName.textContent;
  inputAboutMe.value = aboutMe.textContent;
  //проверяю  остояние кнопки сабмита
  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass, config.opacityLargeClass);
  cleanInputError(popupEditForm);
  openPopup(popupEditForm);
  document.addEventListener('keydown', closePopupEsc);
  popupEditForm.addEventListener('click', closeByClickingOnOverlay);
});

//обрабатываю событие нажатия на кнопку добавления новой карточки
popupCardOpenButton.addEventListener('click', function () {
  const inputList = Array.from(popupAddForm.querySelectorAll('.popup__input'));
  const buttonElement = popupAddForm.querySelector('.button_type_submit');
  reset(popupAddForm);
  //проверяю  остояние кнопки сабмита
  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass, config.opacityLargeClass);
  cleanInputError(popupAddForm);
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
  reset(popupAddForm);
});

//обрабатываю событие нажатия на кнопку закрытия попапа
popupCardCloseButton.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    const form = evt.target.closest('.popup');
    closePopup(form);
    // reset(form);
  });
});