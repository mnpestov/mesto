export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    reset() {
        this._popup.reset();
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    _closeByClickingOnOverlay = (evt) => {
        if (!(evt.target.closest('.popup__container')) || (evt.target.closest('.popup__image-container'))) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._closeByClickingOnOverlay);
        this._popup.querySelector('.popup__close').addEventListener('click', this.close);
    }
}