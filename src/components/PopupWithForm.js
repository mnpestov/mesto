import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({ popupSelector, submitForm }) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._button = this._popup.querySelector('.button_type_submit');
    }

    close() {
        super.close();
        this._popup.reset();
    }

    toggleSubmitButton(bool) {
        bool ? this._button.textContent = 'Сохранение...' : this._button.textContent = 'Сохранить';
    }

    _getInputValues() {
        this._inputValue = {};
        this._inputList.forEach((input) => {
            this._inputValue[input.name] = input.value;
        });
        return this._inputValue;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
        })
    }

    setInputValue(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }
}