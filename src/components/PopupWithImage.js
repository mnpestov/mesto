import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, name) {
        this._popup.querySelector('.popup__image').src = link;
        this._popup.querySelector('.popup__image').alt = 'Изображение ' +  name;
        this._popup.querySelector('.popup__subtitle').textContent = name;
        super.open();
    }
}