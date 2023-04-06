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

// Accounts

const account1 = {
  owner: 'Marcin Matczak',
  pin: 1202,
  movements: [1000, 200, -400, 150, -300],
};

const account2 = {
  owner: 'Elliot Alderson',
  pin: 1709,
  movements: [3000, -1000, 2500, -300, -450],
};

const account3 = {
  owner: 'John Doe',
  pin: 1996,
  movements: [
    12000, 8000, -2000, 1500, -7600, 1050, -2000, -950, 200, 12000, 8000, -2000,
  ],
};

const account4 = {
  owner: 'Jim Beam',
  pin: 1111,
  movements: [],
};

const accounts = [account1, account2, account3];

// const movementsIcons = {
//   salary: '<i class="fa-solid fa-sack-dollar fa-2xs"></i>',
//   entertainment: '<i class="fa-solid fa-music fa-2xs"></i>',
//   vehicles: '<i class="fa-solid fa-solid fa-car fa-2xs"></i>',
//   fees: '<i class="fa-solid fa-file-invoice-dollar fa-2xs"></i>',
//   clothes: '<i class="fa-sharp fa-solid fa-shirt fa-2xs"></i>',
//   home: '<i class="fa-solid fa-house fa-2xs"></i>',
//   medication: '<i class="fa-solid fa-heart-pulse fa-2xs"></i>',
//   education: '<i class="fa-solid fa-user-graduate fa-2xs"></i>',
//   food: '<i class="fa-solid fa-utensils fa-2xs"></i>',
//   other: '<i class="fa-solid fa-coins fa-2xs"></i>',
// };

const movementsIcons = new Map();
movementsIcons
  .set('salary', '<i class="fa-solid fa-sack-dollar fa-2xs"></i>')
  .set('entertainment', '<i class="fa-solid fa-music fa-2xs"></i>')
  .set('vehicles', '<i class="fa-solid fa-solid fa-car fa-2xs"></i>')
  .set('fees', '<i class="fa-solid fa-file-invoice-dollar fa-2xs')
  .set('clothes', '<i class="fa-sharp fa-solid fa-shirt fa-2xs"></i>')
  .set('home', '<i class="fa-solid fa-house fa-2xs"></i>')
  .set('medication', '<i class="fa-solid fa-heart-pulse fa-2xs"></i>')
  .set('education', '<i class="fa-solid fa-user-graduate fa-2xs')
  .set('food', '<i class="fa-solid fa-utensils fa-2xs"></i>')
  .set('other', '<i class="fa-solid fa-coins fa-2xs"></i>');

const savedMovements = function (accounts) {
  accounts.forEach(function (account) {
    account.movementsHTML = [];
    account.movements.forEach(function (mov) {
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      const html = `
            <tr>
            <td><i class="fa-solid fa-coins fa-2xs"></i></td>
              <td class = 'moveType-${type}'>${type}</td>
              <td>${mov}€</td>
            </tr>
          `;
      account.movementsHTML.push(html);
    });
  });
};

savedMovements(accounts);
console.log(accounts);

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

// Update content in user panel

const updateUserPanelData = function () {
  balance(loggedUserAccount);
  transactionSummary(loggedUserAccount.movements);
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
  renderMovements();
  updateUserPanelData();
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
//////////////////////////////////////////////////////////////////////////////
// Movements view
const clearMovements = function () {
  movementsContainer.innerHTML = '';
};

let iconType;

const depositMoney = function () {
  const amount = Number(inputDeposit.value);
  if (amount) {
    const type = amount > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <tr>
    <td>${movementsIcons.get(iconType)}</td>
      <td class = 'moveType-${type}'>${type}</td>
      <td>${amount}€</td>
    </tr>
  `;
    loggedUserAccount.movements.push(amount);
    loggedUserAccount.movementsHTML.push(html);
    renderMovements();
    inputDeposit.value = '';
  }
};

const renderMovements = function () {
  clearMovements();
  loggedUserAccount.movementsHTML.forEach(mov => {
    movementsContainer.insertAdjacentHTML('afterbegin', mov);
  });
  updateUserPanelData();
  console.log(loggedUserAccount.movements, loggedUserAccount.movementsHTML);
};

///////////////////////////////////////////////////////////////////////////////

// const displayMovements = function (movements) {
//   console.log(movementsIcons.get(iconType));
//   movementsContainer.innerHTML = '';
//   movements.forEach(function (mov) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';
//     const html = `
//       <tr>
//       <td>${movementsIcons.iconType}</td>
//         <td class = 'moveType-${type}'>${type}</td>
//         <td>${mov}€</td>
//       </tr>
//     `;
//     movementsContainer.insertAdjacentHTML('afterbegin', html);
//   });

/////////////////////////////////////////////////////////////////////////////
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
    reciverAccount.movements.push(amount);
    loggedUserAccount.movements.push(-amount);
    inputTransferTo.value = inputTransferAmount.value = '';
    updateUserPanelData();
  }
};

moneyTransferButton.addEventListener('click', function (event) {
  event.preventDefault();
  InternalMoneyTransfer();
});

// Deposit / Withdrawal

// const depositMoney = function () {
//   const amount = Number(inputDeposit.value);
//   if (amount) {
//     loggedUserAccount.movements.push(amount);
//     updateUserPanelData(amount);
//     inputDeposit.value = '';
//   }
// };

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
