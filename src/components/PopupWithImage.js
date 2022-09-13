import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._imageSubtitle = this._popup.querySelector('.popup__subtitle');
    }

    open(link, name) {
        this._image .src = link;
        this._image .alt = 'Изображение ' +  name;
        this._imageSubtitle.textContent = name;
        super.open();
    }
}