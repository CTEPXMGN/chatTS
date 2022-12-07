export const UI_ELEMENTS = {
    SETTINGS_BUTTON: <HTMLButtonElement | null>document.querySelector('.setting-button'),
    SETTINGS_MODAL_CLOSE: <HTMLButtonElement | null>document.querySelector('.settings-modal__close'),
    SETTINGS_MODAL: <HTMLElement | null>document.querySelector('.settings-modal'),
    SETTINGS_MODAL_FORM: <HTMLFormElement | null>document.querySelector('.settings-modal__form'),
    SETTINGS_MODAL_INPUT_NAME: <HTMLInputElement | null>document.querySelector('.settings-modal__input-name'),
    SETTINGS_MODAL_BUTTON: <HTMLButtonElement | null>document.querySelector('.settings-modal__button'),
    USER_NAME: <HTMLElement | null>document.querySelector('.user-name'),
    SEND_BUTTON: <HTMLButtonElement | null>document.querySelector('.send-button'),
    INPUT_MESSAGE: <HTMLInputElement | null>document.querySelector('.message-input'),
    TMPL: <HTMLTemplateElement | null>document.querySelector('#tmpl'),
    CHAT_FIELD: <HTMLElement | null>document.querySelector('.chat-field'),
    SEND_FORM: <HTMLFormElement | null>document.querySelector('.send-form'),
    SIGN_BUTTON: <HTMLButtonElement | null>document.querySelector('.sign-button'),
    SIGN_MODAL_BUTTON: <HTMLButtonElement | null>document.querySelector('.sign-modal__button'),
    SIGN_MODAL_FORM: <HTMLFormElement | null>document.querySelector('.sign-modal__form'),
    SIGN_MODAL: <HTMLElement | null>document.querySelector('.sign-modal'),
    SIGN_MODAL_CLOSE: <HTMLButtonElement | null>document.querySelector('.sign-modal__close'),
    SIGN_MODAL_INPUT_EMAIL: <HTMLInputElement | null>document.querySelector('.sign-modal__input-email'),
    CONFIRM_MODAL: <HTMLElement | null>document.querySelector('.confirm-modal'),
    CONFIRM_MODAL_CLOSE: <HTMLButtonElement | null>document.querySelector('.confirm-modal__close'),
    CONFIRM_MODAL_FORM: <HTMLFormElement | null>document.querySelector('.confirm-modal__form'),
    CONFIRM_MODAL_INPUT_TOKEN: <HTMLInputElement | null>document.querySelector('.confirm-modal__input-token'),
    CONFIRM_MODAL_BUTTON: <HTMLButtonElement | null>document.querySelector('.confirm-modal__button'),
    POPUP: <HTMLElement | null>document.querySelector('.popup'),
    STATUS: <HTMLParagraphElement | null>document.querySelector('.status-text'),
};

export const URLS = {
    URL: 'https://edu.strada.one/api/user',
    URL_NAME: 'https://edu.strada.one/api/user/me',
    URL_MESSAGES: 'https://edu.strada.one/api/messages',
};

export const email = 'fuser-mgn@yandex.ru';

export const messageClasses = {
    my: 'my-message',
    companion: 'companion-message',
};

export const index = {
    firstIndex: 280,
    lastIndex: 300,
};