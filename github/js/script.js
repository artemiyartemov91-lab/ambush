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
        btnId: 'ID',
        btnNickname: 'Никнейм',
        btnSoon: 'Soon..'
    },
    en: {
        settings: 'Settings',
        btnId: 'ID',
        btnNickname: 'Nickname',
        btnSoon: 'Soon..'
    },
    zh: {
        settings: '设置',
        btnId: 'ID',
        btnNickname: '昵称',
        btnSoon: 'Soon..'
    }
};

let currentLang = localStorage.getItem('lang') || 'en';
applyLanguage(currentLang);

function changeLanguage(lang) {
    localStorage.setItem('lang', lang);
    applyLanguage(lang);
    sidebar.classList.remove('open');
}

function applyLanguage(lang) {
    document.getElementById('settings-title').textContent = translations[lang].settings;
    document.getElementById('btn-id').textContent = translations[lang].btnId;
    document.getElementById('btn-nickname').textContent = translations[lang].btnNickname;
    document.getElementById('btn-soon').textContent = translations[lang].btnSoon;

    // Активная кнопка
    document.querySelectorAll('.language-select button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
}