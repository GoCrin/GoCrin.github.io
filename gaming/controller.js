//global vars :D
let money = localStorage.getItem("money") == null ? 500 : Number(localStorage.getItem("money")); //starting cash is 500
let bet_amount = 0;
let last_bet = 0;

//initialize stuff
document.getElementById('double_button').style.display = 'none';
document.getElementById('take_button').style.display = 'none';
set_money(money);
//set_money(500);
set_bet_amount(10);

document.getElementById('bet_button').addEventListener('click', (e) => {
    enter_bet();
});
document.getElementById('double_button').addEventListener('click', (e) => {
    gamble();
});
document.getElementById('take_button').addEventListener('click', (e) => {
    exit_bet(true);
});
document.getElementById('min_button').addEventListener('click', (e) => {
    if (!document.getElementById('min_button').classList.contains('notenabled')) {
        set_bet_amount(1);
    }
});
document.getElementById('minus_ten_button').addEventListener('click', (e) => {
    if (!document.getElementById('minus_ten_button').classList.contains('notenabled')) {
        sub_bet_amount(10);
    }
});
document.getElementById('plus_ten_button').addEventListener('click', (e) => {
    if (!document.getElementById('plus_ten_button').classList.contains('notenabled')) {
        add_bet_amount(10);
    }
});
document.getElementById('max_button').addEventListener('click', (e) => {
    if (!document.getElementById('max_button').classList.contains('notenabled')) {
        set_bet_amount(money);
    }
});
document.getElementById('bet_amount_input').addEventListener('keyup', (e) => {
    if (!document.getElementById('bet_amount_input').classList.contains('notenabled')) {
        set_bet_amount(document.getElementById('bet_amount_input').value);
    }
});

function gamble() {
    if (Math.floor(Math.random() * 101) > 50) {
        double_bet_amount();
    } else {
        exit_bet(false);
    }
}

function enter_bet() {
    if (Number(document.getElementById('bet_amount_input').value) === 0) {
        return;
    }

    bet_amount = Number(document.getElementById('bet_amount_input').value);

    if (bet_amount <= 0) {
        set_bet_amount(1);
        return;
    }

    if (bet_amount > money) {
        return;
    }

    last_bet = bet_amount;

    sub_money(bet_amount);

    document.getElementById('double_button').style.display = '';
    document.getElementById('take_button').style.display = '';
    document.getElementById('bet_button').style.display = 'none';

    //disable betting buttons
    document.getElementById('min_button').classList = 'notenabled';
    document.getElementById('minus_ten_button').classList = 'notenabled';
    document.getElementById('bet_amount_input').classList = 'notenabled';
    document.getElementById('plus_ten_button').classList = 'notenabled';
    document.getElementById('max_button').classList = 'notenabled';


    document.getElementById('bet_money').innerText = bet_amount + "€";
}

function exit_bet(won) {
    document.getElementById('double_button').style.display = 'none';
    document.getElementById('take_button').style.display = 'none';
    document.getElementById('bet_button').style.display = '';

    document.getElementById('min_button').classList = ' ';
    document.getElementById('minus_ten_button').classList = ' ';
    document.getElementById('bet_amount_input').classList = ' ';
    document.getElementById('plus_ten_button').classList = ' ';
    document.getElementById('max_button').classList = ' ';

    if (won) {
        add_money(bet_amount);
    }

    set_bet_amount(last_bet);
}

function set_money(amount) {
    money = amount;

    localStorage.setItem("money", money);

    document.getElementById('owned_money').innerText = money + '€';
}

function add_money(amount) {
    if (isNaN(amount)) {
        return;
    }

    set_money(Number(money) + Number(amount));
}

function sub_money(amount) {
    set_money(money - amount);
}

function set_bet_amount(amount) {
    if (isNaN(amount)) {
        return;
    }

    bet_amount = amount;

    document.getElementById('bet_money').innerText = bet_amount + "€";
    document.getElementById('bet_amount_input').value = bet_amount;
}

function add_bet_amount(amount) {
    if (isNaN(amount)) {
        return;
    }

    set_bet_amount(Number(bet_amount) + Number(amount));
}

function sub_bet_amount(amount) {
    set_bet_amount(bet_amount - amount);
}

function double_bet_amount() {
    set_bet_amount(bet_amount * 2);
}