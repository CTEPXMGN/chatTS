import {UI_ELEMENTS, URLS, email, messageClasses, index} from "./view";
import {historyOfMessages} from "./storage";

UI_ELEMENTS.SETTINGS_BUTTON?.addEventListener('click', showSettings);
UI_ELEMENTS.SETTINGS_MODAL_CLOSE?.addEventListener('click', hideSettings);
UI_ELEMENTS.SEND_FORM?.addEventListener('submit', sendMessage);
UI_ELEMENTS.SETTINGS_MODAL_FORM?.addEventListener('submit', setName);
UI_ELEMENTS.SIGN_BUTTON?.addEventListener('click', showSignIn);
UI_ELEMENTS.SIGN_MODAL_FORM?.addEventListener('submit', getCode);
UI_ELEMENTS.SIGN_MODAL_CLOSE?.addEventListener('click', hideSignIn);
UI_ELEMENTS.CONFIRM_MODAL_CLOSE?.addEventListener('click', hideConfirm);
UI_ELEMENTS.CONFIRM_MODAL_FORM?.addEventListener('submit', saveCoockie);
UI_ELEMENTS.CHAT_FIELD?.addEventListener('scroll', checkScroll);

function showSettings() {
    UI_ELEMENTS.SETTINGS_MODAL?.classList.remove('hide');
};

function hideSettings() {
    UI_ELEMENTS.SETTINGS_MODAL?.classList.add('hide');
}

function getTime(data: String) {
    return data.slice(11, 16);
};

function showSignIn() {
    UI_ELEMENTS.SIGN_MODAL?.classList.remove('hide');
};

function hideSignIn() {
    UI_ELEMENTS.SIGN_MODAL?.classList.add('hide');
};

function showConfirm() {
    UI_ELEMENTS.CONFIRM_MODAL?.classList.remove('hide');
};

function hideConfirm() {
    UI_ELEMENTS.CONFIRM_MODAL?.classList.add('hide');
};

function saveCoockie(event: Event) {
    event.preventDefault();

    document.cookie = 'token=' + UI_ELEMENTS.CONFIRM_MODAL_INPUT_TOKEN?.value;
    hideConfirm();
    showSettings();
};

async function getHistory() {
    const response = await fetch(URLS.URL_MESSAGES, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${getCookie('token')}`,
        },
    });
    let result = await response.json();
    const messages = result.messages.reverse();

    console.log(messages); // Вывод всех сообщений в консоль
    
    historyOfMessages.set(messages);
    
    let history = historyOfMessages.get().slice(index.firstIndex, index.lastIndex);

    index.firstIndex -= 20;
    index.lastIndex -= 20;

    history.forEach(elem => {
        if (elem.user.email === email) {
            renderMessage(elem, messageClasses.my, 'method');
        } else {
            renderMessage(elem, messageClasses.companion, 'method');
        };
    });
};

function getMessagesFromStorage() {
    if (index.firstIndex >= 0) {

        let history = historyOfMessages.get().slice(index.firstIndex, index.lastIndex).reverse();

        index.firstIndex -= 20;
        index.lastIndex -= 20;

        if (index.firstIndex <= 0) {
            if (UI_ELEMENTS.STATUS) {
                UI_ELEMENTS.STATUS.textContent = 'Сообщений больше нет.';
            };  
        };
    
        history.forEach(elem => {
            if (elem.user.email === email) {
                renderMessage(elem, messageClasses.my, 'method');
            } else {
                renderMessage(elem, messageClasses.companion, 'method');
            };
        });
    };
};

async function getUser() {
    await fetch(URLS.URL_NAME, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${getCookie('token')}`,
        },
    });
};

function getCookie(name: String) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

async function setName(event: Event) {
    event.preventDefault();
    const myName = {
        name: UI_ELEMENTS.SETTINGS_MODAL_INPUT_NAME?.value,
    };

    await fetch(URLS.URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify(myName),
    });

    getUser();
    hideSettings();
};

async function getCode(event: Event) {
    event.preventDefault();

    let myEmail = {
        email: UI_ELEMENTS.SIGN_MODAL_INPUT_EMAIL?.value,
    };

    const response = await fetch(URLS.URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(myEmail),
    });

    if (response.ok) {
        hideSignIn();
        showConfirm();
    } else {
        alert('Запрос на сервер не прошёл(((')
    };
};

let socket = new WebSocket(`wss://edu.strada.one/websockets?${getCookie('token')}`);

function connect() {
    socket = new WebSocket(`wss://edu.strada.one/websockets?${getCookie('token')}`);

    socket.onopen = function(e: Event) {
        if (UI_ELEMENTS.STATUS) {
            UI_ELEMENTS.STATUS.textContent = 'Connected...';
        };
    };

    socket.onclose = function(e: Event) {
        if (UI_ELEMENTS.STATUS) {
            UI_ELEMENTS.STATUS.textContent = 'Disconnected...';
        };
        connect();
    };
};
connect();

if (getCookie('token')) {
    getHistory();
} else {
    showSignIn();
};

function checkInput() {
    return !!UI_ELEMENTS.INPUT_MESSAGE?.value.trim();
};

function sendMessage(e: Event) {
    e.preventDefault();

    if (checkInput()) {
        socket.send(JSON.stringify({ text: UI_ELEMENTS.INPUT_MESSAGE?.value }));
        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            if (data.user.email === email) {
                renderMessage(data, messageClasses.my, 'method');
            } else {
                renderMessage(data, messageClasses.companion, 'method');
            };
        };
    } else {
        console.log('Введите хоть что-нить.');
    }
    
    if (UI_ELEMENTS.INPUT_MESSAGE) {
        UI_ELEMENTS.INPUT_MESSAGE.value = '';
    };
};

function renderMessage(item, classMessage: String, method: String) {
    const tmpl = UI_ELEMENTS.TMPL?.content;
    const tmplClone = tmpl?.cloneNode(true).querySelector('.message');
    tmplClone.classList.add(classMessage);
    const tmplText = tmplClone.querySelector('.message-text');
    const tmplTime = tmplClone.querySelector('.message-time');
    tmplText.textContent = item.user.name + ': ' + item.text;
    tmplTime.textContent = getTime(item.createdAt);
    if (method) {
        UI_ELEMENTS.CHAT_FIELD?.prepend(tmplClone);
    } else {
        UI_ELEMENTS.CHAT_FIELD?.append(tmplClone);
        tmplClone.scrollIntoView(false);
    }
    
};

function checkScroll() {
    if (this.scrollTop === 0) {
        console.log('Конец страницы.');
        getMessagesFromStorage();
    };
};