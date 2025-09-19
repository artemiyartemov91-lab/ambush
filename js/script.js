window.Telegram.WebApp.ready();

const user = window.Telegram.WebApp.initDataUnsafe.user;
document.getElementById('user-name').textContent = user ? user.first_name : 'Guest';
document.getElementById('user-pic').src = user && user.photo_url ? user.photo_url : 'https://via.placeholder.com/40';

// Анимация загрузки
setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}, 2000);

// Меню
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Языки
const translations = {
    ru: {
        settings: 'Настройки',
        btnSearchId: 'Поиск по Айди',
        btnSearchNickname: 'Поиск по Никнейму',
        btnSpammer: 'Spammer',
        back: 'Назад',
        soon: 'Скоро..',
        webhookUrl: 'Webhook URL:',
        messageCount: 'Количество сообщений:',
        messageText: 'Текст сообщения:',
        send: 'Отправить'
    },
    en: {
        settings: 'Settings',
        btnSearchId: 'Search by ID',
        btnSearchNickname: 'Search by Nickname',
        btnSpammer: 'Spammer',
        back: 'Back',
        soon: 'Soon..',
        webhookUrl: 'Webhook URL:',
        messageCount: 'Message Count:',
        messageText: 'Message Text:',
        send: 'Send'
    },
    zh: {
        settings: '设置',
        btnSearchId: '按ID搜索',
        btnSearchNickname: '按昵称搜索',
        btnSpammer: 'Spammer',
        back: '后退',
        soon: '很快..',
        webhookUrl: 'Webhook URL:',
        messageCount: '消息数量:',
        messageText: '消息文本:',
        send: '发送'
    }
};

let currentLang = localStorage.getItem('lang') || 'ru';
applyLanguage(currentLang);

function changeLanguage(lang) {
    localStorage.setItem('lang', lang);
    applyLanguage(lang);
    sidebar.classList.remove('open');
}

function applyLanguage(lang) {
    document.getElementById('settings-title').textContent = translations[lang].settings;
    document.getElementById('btn-search-id').textContent = translations[lang].btnSearchId;
    document.getElementById('btn-search-nickname').textContent = translations[lang].btnSearchNickname;
    document.getElementById('btn-spammer').textContent = translations[lang].btnSpammer;

    // Активная кнопка языка
    document.querySelectorAll('.language-select button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Обновление меню Spammer (если открыто)
    updateSpammerText(lang);
}

function updateSpammerText(lang) {
    const tr = translations[lang];
    // Spammer меню
    document.querySelector('#spammer-menu button:nth-child(2)').textContent = tr.back;
    
    // Discord меню
    document.querySelector('#discord-menu button:nth-child(1)').textContent = 'Discord Webhook';
    document.querySelector('#discord-menu button:nth-child(2)').textContent = tr.soon;
    document.querySelector('#discord-menu button:nth-child(3)').textContent = tr.back;
    
    // Форма
    document.querySelector('#webhook-form label[for="webhook-url"]').textContent = tr.webhookUrl;
    document.querySelector('#webhook-form label[for="message-count"]').textContent = tr.messageCount;
    document.querySelector('#webhook-form label[for="message-text"]').textContent = tr.messageText;
    document.querySelector('#webhook-form button[type="button"]:nth-child(1)').textContent = tr.send;
    document.querySelector('#webhook-form button[type="button"]:nth-child(2)').textContent = tr.back;
}

// Навигация Spammer
function showSpammerMenu() {
    document.getElementById('main-tab').style.display = 'none';
    document.getElementById('spammer-menu').style.display = 'block';
}

function backToMain() {
    document.getElementById('spammer-menu').style.display = 'none';
    document.getElementById('main-tab').style.display = 'block';
}

function showDiscordMenu() {
    document.getElementById('spammer-menu').style.display = 'none';
    document.getElementById('discord-menu').style.display = 'block';
}

function backToSpammer() {
    document.getElementById('discord-menu').style.display = 'none';
    document.getElementById('spammer-menu').style.display = 'block';
}

function showWebhookForm() {
    document.getElementById('discord-menu').style.display = 'none';
    document.getElementById('webhook-form').style.display = 'block';
}

function backToDiscord() {
    document.getElementById('webhook-form').style.display = 'none';
    document.getElementById('discord-menu').style.display = 'block';
}

// Логика спама
async function sendSpam() {
    const webhookUrl = document.getElementById('webhook-url').value;
    const count = parseInt(document.getElementById('message-count').value);
    const text = document.getElementById('message-text').value;

    if (!webhookUrl || !count || !text) {
        alert('Заполните все поля!');
        return;
    }

    for (let i = 0; i < count; i++) {
        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: text })
            });
        } catch (error) {
            alert('Ошибка отправки: ' + error.message);
            return;
        }
    }
    alert('Спам отправлен!');
}

// Обновляем текст при загрузке
updateSpammerText(currentLang);