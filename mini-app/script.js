const tg = window.Telegram.WebApp;
tg.ready();

setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';
}, 3000);

const user = tg.initDataUnsafe.user;
document.getElementById('avatar').src = user.photo_url || 'https://via.placeholder.com/40';
document.getElementById('username').textContent = user.username || 'User';

let balance = 0; // Замени на реальный баланс (например, из backend)
document.getElementById('balance').textContent = balance;

document.getElementById('add-balance').addEventListener('click', () => {
    tg.openTelegramLink('https://t.me/your_bot?start=deposit'); // Замени на Telegram Stars или Payments
});

document.getElementById('menu').addEventListener('click', () => {
    tg.showAlert('Настройки пока в разработке!'); // Замени на реальное меню
});