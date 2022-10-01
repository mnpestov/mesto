import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }

    open(deletableElement, cardId) {
        super.open();
        this._deletableElement = deletableElement
        this._cardId = cardId;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._deletableElement, this._cardId)
        })
    }
}