export class UserInfo {
    constructor(userNameSelector, userDescriptionSelector, userAvatarSelector, userAvatarContainerSelector, openPopupFormAvatar) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
        this._openPopupFormAvatar = openPopupFormAvatar;
        this._userAvatarButton = document.querySelector(userAvatarContainerSelector);
    }

    getUserInfo() {
        return ({
            name: this._userName.textContent,
            about: this._userDescription.textContent
        })
    }

    setUserInfo({name, about}) {
        this._userName.textContent = name;
        this._userDescription.textContent = about;
    }

    setUserAvatar({avatar}) {
        this._userAvatar.src = avatar;
    }

    setEventListeners(){
        this._userAvatarButton.addEventListener('click', () => this._openPopupFormAvatar());
    }
}