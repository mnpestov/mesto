let page = document.querySelector('.page');
let addBtn = page.querySelector('.button_type_add');
let editBtn = page.querySelector('.button_type_edit');
let saveBtn = page.querySelector('.button_type_save');
let closeBtn = page.querySelector('.popup__close');
let heart = page.querySelectorAll('.element__like');

function openPopup() {
  let popup = page.querySelector('.popup');
  popup.classList.add('popup_opened');
}

function closePopup() {
  let popup = page.querySelector('.popup');
  popup.classList.remove('popup_opened');
}

function saveAndClosePopup() {
  let inputName = document.querySelector('.popup__input_type_name');
  let inputAboutMe = document.querySelector('.popup__input_type_about-me');
  let popup = document.querySelector('.popup');
  let name = document.querySelector('.profile__name');
  let aboutMe = document.querySelector('.profile__about-me');
  name.textContent = inputName.value;
  aboutMe.textContent = inputAboutMe.value;
  closePopup();
}

editBtn.addEventListener('click', openPopup);
saveBtn.addEventListener('click', saveAndClosePopup);
closeBtn.addEventListener('click', closePopup);
for (let i = 0; i < heart.length; i++) {
  heart[i].addEventListener('click', function(){
    heart[i].classList.toggle('element__like_active');
  });
}