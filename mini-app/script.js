const tg = window.Telegram.WebApp;
tg.ready();

const SERVER_URL = 'https://your-replit-url.replit.app';  // Замени на URL от Replit (или PythonAnywhere)

setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('main').style.display = 'block';
    fetchBalance();
}, 3000);

const user = tg.initDataUnsafe.user;
document.getElementById('avatar').src = user.photo_url || 'https://via.placeholder.com/40';
document.getElementById('username').textContent = user.username || 'User';

async function fetchBalance() {
    try {
        const res = await fetch(`${SERVER_URL}/get_balance`, {
            method: 'POST',
            body: tg.initData
        });
        if (res.ok) {
            const data = await res.json();
            document.getElementById('balance').textContent = data.balance;
        }
    } catch (e) {
        console.error('Ошибка fetch баланса');
    }
}

const modal = document.getElementById('deposit-modal');
const plusBtn = document.getElementById('add-balance');
const closeBtn = document.querySelector('.close');
const amountBtns = document.querySelectorAll('.amount-btn');

plusBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const amount = btn.dataset.amount;
        tg.openTelegramLink(`https://t.me/${tg.initDataUnsafe.user ? BOT_USERNAME : 'lunacy_bot'}?start=deposit_${amount}`);
        modal.style.display = 'none';
    });
});

document.getElementById('menu').addEventListener('click', () => {
    tg.showAlert('Настройки пока в разработке!');
});