export class Card {
  constructor(data, {openImagePage, openTrashPopup, putLike, deleteLike}, { templateSelector, elementSelector }, userId) {
    this._templateSelector = templateSelector;
    this._elementSelector = elementSelector;
    this._image = data.link;
    this._name = data.name;
    this._cardId = data._id;
    this._likeCount = data.likes.length;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._openImagePage = openImagePage;
    this._openTrashPopup = openTrashPopup;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._userId = userId;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(this._elementSelector).cloneNode(true);
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like_active');
    this._likeButton.classList.toggle('opacity-transition_type_small');
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
      if (this._likeButton.classList.contains('element__like_active')) {
        this._putLike(this._cardId)
          .then(data => {
            this._likeCount = data.likes.length;
            this._likeCounter.textContent = this._likeCount;
          })
          .catch(err => console.log('Ошибка',err));
      } else {
        this._deleteLike(this._cardId)
          .then(data => {
            this._likeCount = data.likes.length;
            this._likeCounter.textContent = this._likeCount;
          })
          .catch(err => console.log('Ошибка',err));
      }
    });

    this._trashButton.addEventListener('click', () => this._openTrashPopup(this._element, this._cardId));
    this._cardImage.addEventListener('click', () => this._openImagePage(this._image, this._name));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._trashButton = this._element.querySelector('.element__trash');
    this._cardImage = this._element.querySelector('.element__image');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.alt = 'Изображение ' + this._name;
    this._likeCounter.textContent = this._likeCount;
    this._likes.forEach(item => {
      if (item._id === this._userId) {
        this._toggleLike();
      }
    })
    if (this._ownerId != this._userId) {
      this._trashButton.style.visibility = 'hidden';
    }
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }
}