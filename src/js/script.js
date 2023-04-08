// Elements

const inputUserNameLogin = document.querySelector('.login__user');
const inputPasswordLogin = document.querySelector('.login__password');
const welcomeInfo = document.querySelector('.welcome');
const loginButton = document.querySelector('.btn--log');
const loginButtonDescription = document.querySelector('.LoginBtnType');
const userPanel = document.querySelector('.user-panel');
const balanceDate = document.querySelector('.date');
const currentBalance = document.querySelector('.balance');
const inSummary = document.querySelector('.inMovements');
const outSummary = document.querySelector('.outMovements');
const movementsContainer = document.querySelector('.movements_body');
const inputTransferTo = document.querySelector('.form__to');
const inputTransferAmount = document.querySelector('.form__amount');
const moneyTransferButton = document.querySelector('.btn-transfer');
const depositButton = document.querySelector('.depositBtn');
const inputDeposit = document.querySelector('.deposit');
const iconsWrapper = document.querySelector('.icons');
const closeUserInput = document.querySelector('.close-user');
const closePinInput = document.querySelector('.close-pin');
const closeAccountBtn = document.querySelector('.close-btn');

// Accounts

const account1 = {
  owner: 'Marcin Matczak',
  pin: 1202,
  movements: [1000, 200, -400, 150, -300, 280],
};

const account2 = {
  owner: 'Elliot Alderson',
  pin: 1709,
  movements: [3000, -1000, 2500, -300, -450],
};

const account3 = {
  owner: 'John Doe',
  pin: 1996,
  movements: [8000, -2000, 1500, -7600, 1050, -950, 200, 12000, 8000, -2000],
};

const account4 = {
  owner: 'Jim Beam',
  pin: 1111,
  movements: [],
};

const accounts = [account1, account2, account3, account4];

// Icons HTML

const movementsIcons = new Map();
movementsIcons
  .set('salary', '<i class="fa-solid fa-sack-dollar fa-xs"></i>')
  .set('entertainment', '<i class="fa-solid fa-music fa-xs"></i>')
  .set('vehicles', '<i class="fa-solid fa-solid fa-car fa-xs"></i>')
  .set('fees', '<i class="fa-solid fa-file-invoice-dollar fa-xs"</i>')
  .set('clothes', '<i class="fa-sharp fa-solid fa-shirt fa-xs"></i>')
  .set('home', '<i class="fa-solid fa-house fa-xs"></i>')
  .set('medication', '<i class="fa-solid fa-heart-pulse fa-xs"></i>')
  .set('education', '<i class="fa-solid fa-user-graduate fa-xs"></i>')
  .set('food', '<i class="fa-solid fa-utensils fa-xs"></i>')
  .set('other', '<i class="fa-solid fa-coins fa-xs"></i>');

// Loading saved movements form created array with HTML

const savedMovements = function (accounts) {
  accounts.forEach(function (account) {
    account.movementsHTML = [];
    account.movements.forEach(function (mov) {
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      const html = `
        <tr>
          <td><i class="fa-solid fa-coins fa-xs"></i></td>
            <td class = 'moveType-${type}'>${type}</td>
            <td>${mov}€</td>
        </tr>`;
      account.movementsHTML.push(html);
    });
  });
};

savedMovements(accounts);

// Added username as property into each account and save logged user account

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner.toLowerCase().split(' ')[0];
  });
};
createUsernames(accounts);

let loggedUserAccount;

const loggedUser = function () {
  loggedUserAccount = accounts.find(
    acount => acount.username === inputUserNameLogin.value
  );
};

// Update amounts in user panel

const updateUserPanelData = function (account) {
  renderMovements(account);
  balance(account);
  transactionSummary(account.movements);
};

// Open user panel

const welcomePanel = function () {
  loggedUser();
  if (loggedUserAccount?.pin === Number(inputPasswordLogin.value)) {
    userPanel.classList.remove('visibility');
    welcomeInfo.textContent = `Welcome back, ${
      loggedUserAccount.owner.split(' ')[0]
    }!`;
    loggedUser(inputUserNameLogin.value);
    inputUserNameLogin.value = inputPasswordLogin.value = '';
    inputPasswordLogin.blur();
    loginButtonDescription.textContent = 'Out';
    inputUserNameLogin.disabled = inputPasswordLogin.disabled = true;
  }
  updateUserPanelData(loggedUserAccount);
};

// Logout/Login - functionality

const logOut = function () {
  userPanel.classList.add('visibility');
  loginButtonDescription.textContent = 'In';
  welcomeInfo.textContent = 'Please Log In';
  inputUserNameLogin.disabled = inputPasswordLogin.disabled = false;
};

loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  userPanel.classList.contains('visibility') ? welcomePanel() : logOut();
});

// Current balacne section

const date = new Intl.DateTimeFormat(navigator.language).format(new Date());
balanceDate.textContent = date;

const currFormat = function (container, value) {
  container.textContent = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'PLN',
  }).format(value);
};

const balance = function (account) {
  const amount = account.movements.reduce((acc, mov) => acc + mov, 0);
  currFormat(currentBalance, amount);
  account.balance = amount;
};

// In/Out - summary

const transactionSummary = function (movements) {
  const inTransaction = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  currFormat(inSummary, inTransaction);

  const outTransaction = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  currFormat(outSummary, -outTransaction);
};

// Movements view

let iconType;

const clearMovements = function () {
  movementsContainer.innerHTML = '';
};

const renderMovements = function (account) {
  clearMovements();
  account.movementsHTML.forEach(mov => {
    movementsContainer.insertAdjacentHTML('afterbegin', mov);
  });
};

// Internal Money Transfer

const InternalMoneyTransfer = function () {
  const amount = Number(inputTransferAmount.value);
  const reciverAccount = accounts.find(
    acount => acount.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    reciverAccount &&
    loggedUserAccount.balance >= amount &&
    reciverAccount?.username !== loggedUserAccount.username
  ) {
    const deposithtml = `
    <tr>
    <td><i class="fa-solid fa-user fa-2xs"></i></td>
      <td class = 'moveType-deposit'>deposit</td>
      <td>${amount}€</td>
    </tr>
  `;
    const withdrawalhtml = `
    <tr>
    <td><i class="fa-solid fa-user fa-2xs"></i></td>
      <td class = 'moveType-withdrawal'>withdrawal</td>
      <td>${-amount}€</td>
    </tr>
  `;
    loggedUserAccount.movements.push(-amount);
    loggedUserAccount.movementsHTML.push(withdrawalhtml);
    updateUserPanelData(loggedUserAccount);
    reciverAccount.movements.push(amount);
    reciverAccount.movementsHTML.push(deposithtml);
    inputTransferTo.value = inputTransferAmount.value = '';
  }
  console.log('Nadawca:', loggedUserAccount);
  console.log('Odbiorca:', reciverAccount);
};

moneyTransferButton.addEventListener('click', function (event) {
  event.preventDefault();
  InternalMoneyTransfer();
});

// Deposit / Withdrawal

const depositMoney = function () {
  const amount = Number(inputDeposit.value);
  if (amount) {
    movValue = iconType === 'salary' ? amount : -amount;
    const type = movValue > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <tr>
    <td>${movementsIcons.get(iconType)}</td>
      <td class = 'moveType-${type}'>${type}</td>
      <td>${movValue}€</td>
    </tr>
  `;
    loggedUserAccount.movements.push(movValue);
    loggedUserAccount.movementsHTML.push(html);
    updateUserPanelData(loggedUserAccount);
    inputDeposit.value = '';
    iconType = '';
  }
};

depositButton.addEventListener('click', function (event) {
  event.preventDefault();
  depositMoney();
});

// Deposit / Withdrawal - icons

iconsWrapper.addEventListener('click', function (event) {
  event.preventDefault();
  const clickedIcon = event.target.closest('.icon');
  if (!clickedIcon) return;
  iconType = clickedIcon.getAttribute('aria-label');
});

// Close account

const closeAccount = function () {
  const userLogin = closeUserInput.value;
  const userPin = Number(closePinInput.value);
  if (
    userLogin === loggedUserAccount.username &&
    userPin === loggedUserAccount.pin
  ) {
    accounts.splice(
      accounts.indexOf(accounts.find(account => account.pin === userPin)),
      1
    );
    closeUserInput.value = closePinInput.value = '';
    logOut();
  }
};

closeAccountBtn.addEventListener('click', function (event) {
  event.preventDefault();
  closeAccount();
});
