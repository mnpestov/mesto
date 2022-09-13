export class Card {
  constructor(data, openImagePage, {templateSelector, elementSelector}) {
    this._templateSelector = templateSelector;
    this._elementSelector = elementSelector;
    this._image = data.link;
    this._name = data.name;
    this._openImagePage = openImagePage;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(this._elementSelector).cloneNode(true);
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like_active');
    this._likeButton.classList.toggle('opacity-transition_type_small');
  }

  _trashImage() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._toggleLike());
    this._trashButton.addEventListener('click', () => this._trashImage());
    this._cardImage.addEventListener('click', () => this._openImagePage(this._image, this._name));
    }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._trashButton = this._element.querySelector('.element__trash');
    this._cardImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.alt = 'Изображение ' + this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}