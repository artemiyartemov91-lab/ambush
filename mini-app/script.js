// Telegram Web App API
const tg = window.Telegram.WebApp;
tg.ready();

// Пульсация на 3 секунды
setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}, 3000);

// Получить данные пользователя
const user = tg.initDataUnsafe.user;
document.getElementById('avatar').src = user.photo_url || 'default-avatar.png';
document.getElementById('username').textContent = user.username || 'User';

// Баланс (пример, загрузи из БД или API)
let balance = 0; // Замени на реальный баланс из backend
document.getElementById('balance').textContent = balance;

// Кнопка плюсик: Переход на пополнение (используй Telegram Stars или Payments)
document.getElementById('add-balance').addEventListener('click', () => {
    // Пример: Открыть вкладку пополнения
    tg.openTelegramLink('https://t.me/your_bot?start=deposit'); // Или интегрируй Stars API
    // Для реального пополнения: Используй tg.showPopup или backend.
});