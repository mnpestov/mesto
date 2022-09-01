export class Card {
  constructor(data, openImagePage, templateSelector) {
    this._templateSelector = templateSelector;
    this._image = data.link;
    this._name = data.name;
    this._openImagePage = openImagePage;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _toggleLike(likeElement) {
    likeElement.classList.toggle('element__like_active');
    likeElement.classList.toggle('opacity-transition_type_small');
  }

  _trashImage(trashElement) {
    trashElement.closest('.element').remove();
  }

  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__like')) {
        this._toggleLike(evt.target);
      } else if (evt.target.classList.contains('element__trash')) {
        this._trashImage(evt.target);
      } else if (evt.target.classList.contains('element__image')) {
        this._openImagePage(this._image, this._name);
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const elementPicture = this._element.querySelector('.element__image');
    elementPicture.src = this._image;
    elementPicture.alt = 'Изображение ' + this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}