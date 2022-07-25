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

function openOrClosePopup(form) {
  form.classList.toggle('popup_opened');
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
    const popupPicture = popupImageForm.querySelector('.popup__image');
    popupPicture.src = evt.target.currentSrc;
    popupPicture.alt = evt.target.alt;
    popupImageForm.querySelector('.popup__subtitle').textContent = evt.target.parentElement.querySelector('.element__title').textContent;
    openOrClosePopup(popupImageForm);
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
  inputName.value = profileName.textContent;
  inputAboutMe.value = aboutMe.textContent;
  openOrClosePopup(popupEditForm)
});
popupCardOpenButton.addEventListener('click', () => openOrClosePopup(popupAddForm));
popupEditForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  aboutMe.textContent = inputAboutMe.value;
  openOrClosePopup(popupEditForm);
});
popupAddForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputNameOfImage.value,
    link: inputUrl.value
  };
  renderCard(newCard);
  openOrClosePopup(popupAddForm);
  inputNameOfImage.value = '';
  inputUrl.value = '';
});
popupCardCloseButton.forEach(function(item) {
  item.addEventListener('click', function(evt){
    openOrClosePopup(evt.target.closest('.popup'));
  });
});