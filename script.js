let page = document.querySelector('.page');
let addBtn = page.querySelector('.button_type_add');
let editBtn = page.querySelector('.button_type_edit');
let saveBtn = page.querySelector('.button_type_save');
let closeBtn = page.querySelector('.popup__close');
let heart = page.querySelectorAll('.element__like');
let inputName = page.querySelector('.popup__input_type_name');
let inputAboutMe = page.querySelector('.popup__input_type_about-me');
let profileName = page.querySelector('.profile__name');
let aboutMe = page.querySelector('.profile__about-me');
let popupForm = page.querySelector('.popup');

function openPopup() {
  popupForm.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputAboutMe.value = aboutMe.textContent;
}

function closePopup() {
  popupForm.classList.remove('popup_opened');
}

function saveAndClosePopup(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  aboutMe.textContent = inputAboutMe.value;
  closePopup();
}
function putLike(index) {
  heart[index].classList.toggle('element__like_active');
  heart[index].classList.toggle('opacity-transition_type_05');
}

editBtn.addEventListener('click', openPopup);
popupForm.addEventListener('submit', saveAndClosePopup);
closeBtn.addEventListener('click', closePopup);

for (let i = 0; i < heart.length; i++) {
  heart[i].addEventListener('click', () => putLike(i));
}