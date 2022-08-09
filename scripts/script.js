function reset (form) {
  form.reset();
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const form = document.querySelector('.popup_opened');
    closePopup(form);
  }
}

function openPopup(form) {
  form.classList.add('popup_opened');
  form.addEventListener('click', (evt) => {
    const popupContainer = form.querySelector('.popup__container');
    const popupImageContainer = form.querySelector('.popup__image-container');
    if ((evt.target.closest('.popup__container') !== popupContainer) || (evt.target.closest('.popup__image-container') !== popupImageContainer)) {
      closePopup(form);
    }
  });
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(form) {
  form.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//функция добавления карточек
function createCard(item) {
  const templateElement = document.querySelector('#element').content;
  const element = templateElement.querySelector('.element').cloneNode(true);
  const elementPicture = element.querySelector('.element__image');
  elementPicture.src = item.link;
  elementPicture.alt = 'Изображение ' + item.name;
  element.querySelector('.element__title').textContent = item.name;
//добавляю лисенеры
  const likeBtn = element.querySelector('.element__like');
  likeBtn.addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like_active');
    evt.target.classList.toggle('opacity-transition_type_small');
  });
  const trashBtn = element.querySelector('.element__trash');
  trashBtn.addEventListener('click', function(evt){
    evt.target.closest('.element').remove();
  });
  const image = element.querySelector('.element__image');
  image.addEventListener('click', function(evt){
    popupPicture.src = evt.target.currentSrc;
    popupPicture.alt = evt.target.alt;
    popupImageForm.querySelector('.popup__subtitle').textContent = evt.target.parentElement.querySelector('.element__title').textContent;
    openPopup(popupImageForm);
  });
  return (element)
}

function renderCard(newCard) {
  const card = createCard(newCard);
  elements.prepend(card);
}

//добавляю дефолтные карточки
initialCards.forEach(function(item) {
  renderCard(item);
});
//добавляю лисенеры
popupCardEditButton.addEventListener('click', function() {
  const inputList = Array.from(popupEditForm.querySelectorAll('.popup__input'));
  const buttonElement = popupEditForm.querySelector('.button_type_submit'); 
  inputName.value = profileName.textContent;
  inputAboutMe.value = aboutMe.textContent;
  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
  openPopup(popupEditForm);
});
popupCardOpenButton.addEventListener('click', function() {
  const inputList = Array.from(popupAddForm.querySelectorAll('.popup__input'));
  const buttonElement = popupAddForm.querySelector('.button_type_submit'); 
  openPopup(popupAddForm);
  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
});
popupEditForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  aboutMe.textContent = inputAboutMe.value;
  closePopup(popupEditForm);
});
popupAddForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputNameOfImage.value,
    link: inputUrl.value
  };
  renderCard(newCard);
  closePopup(popupAddForm);
  reset(popupAddForm);
});
popupCardCloseButton.forEach(function(item) {
  item.addEventListener('click', function(evt){
    const form = evt.target.closest('.popup');
    closePopup(form);
    reset(form);
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    inputList.forEach(function(inputElement) {
      hideInputError(form, inputElement, config.inputErrorClass, config.errorClass);
    });
  });
});