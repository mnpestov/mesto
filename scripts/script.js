const page = document.querySelector('.page');
const addBtn = page.querySelector('.button_type_add');
const editBtn = page.querySelector('.button_type_edit');
const closeBtns = page.querySelectorAll('.popup__close');
const saveBtn = page.querySelector('.button_type_save');
const createBtn = page.querySelector('.button_type_create');
const inputName = page.querySelector('.popup__input_type_name');
const inputAboutMe = page.querySelector('.popup__input_type_about-me');
const inputNameOfImage = page.querySelector('.popup__input_type_name-of-image');
const inputUrl = page.querySelector('.popup__input_type_url');
const profileName = page.querySelector('.profile__name');
const aboutMe = page.querySelector('.profile__about-me');
const popupEditForm = page.querySelector('.popup_type_edit');
const popupAddForm = page.querySelector('.popup_type_add');
const popupImageForm = page.querySelector('.popup_type_image');
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

//функция добавления карточек
function addCard(item) {
  const templateElement = document.querySelector('#element').content;
  const element = templateElement.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__image').alt = 'Изображение ' + item.name;
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
    popupImageForm.querySelector('.popup__image').src = evt.target.currentSrc;
    popupImageForm.querySelector('.popup__image').alt = evt.target.alt;
    popupImageForm.querySelector('.popup__subtitle').textContent = evt.target.parentElement.querySelector('.element__title').textContent;
    popupImageForm.classList.add('popup_opened');
  });
  return (element)
}

function renderCard(newCard) {
  const elements = document.querySelector('.elements-list');
  const card = addCard(newCard);
  elements.prepend(card);
}

function openOrClosePopup(form) {
  form.classList.toggle('popup_opened');
}

//добавляю дефолтные карточки
initialCards.forEach(function(item) {
  renderCard(item);
});
//добавляю лисенеры
editBtn.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputAboutMe.value = aboutMe.textContent;
  openOrClosePopup(popupEditForm)
});
addBtn.addEventListener('click', () => openOrClosePopup(popupAddForm));
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
closeBtns.forEach(function(item) {
  item.addEventListener('click', function(evt){
    evt.target.parentElement.parentElement.classList.remove('popup_opened');
  });
});