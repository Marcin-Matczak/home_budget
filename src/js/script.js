// Elements

const closeInfoButton = document.querySelector('.info-closeBtn');
const infoPanel = document.querySelector('.info');
const infoForm = document.querySelector('.info__form');
const inputFirstName = document.querySelector('.firstName');
const inputLastName = document.querySelector('.lastName');
const inputSetupPin = document.querySelector('.setupPin');
const successInfo = document.querySelector('.successInfo');
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

// Info panel

const closeInfoPanel = function () {
  infoPanel.classList.add('visibility');
  userPanel.classList.remove('hidden');
};

closeInfoButton.addEventListener('click', function (event) {
  event.preventDefault();
  closeInfoPanel();
});

// Validation new account

const validationInputs = function (personFirstName, personLastName, pin) {
  const userFirstName = personFirstName.value;
  const userLastName = personLastName.value;
  const pinData = Number(pin.value);
  const capitalLetters = /[A-Z]/;
  const smallLetters = /^[a-z]+$/;
  if (
    userFirstName.slice(1).match(smallLetters) &&
    userFirstName[0].match(capitalLetters) &&
    userLastName.slice(1).match(smallLetters) &&
    userLastName[0].match(capitalLetters)
  ) {
    if (typeof pinData === 'number' && pinData.toString().length === 4) {
      return true;
    } else {
      alert('Incorrect PIN. Please enter a four-digit number.');
      return false;
    }
  } else {
    alert(
      'Wrong data! Remember that the first and last name should start with a capital and cannot contain whitespace or special signs.'
    );
    return false;
  }
};

// New account

let newUserAccount;

const newAccount = function () {
  const owner = inputFirstName.value + ' ' + inputLastName.value;
  const pin = Number(inputSetupPin.value);
  newUserAccount = {
    owner,
    pin,
    movements: [],
  };
  accounts.push(newUserAccount);
};

infoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!validationInputs(inputFirstName, inputLastName, inputSetupPin)) return;
  newAccount();
  inputFirstName.value = inputLastName.value = inputSetupPin.value = '';
  infoForm.classList.add('visibility');
  successInfo.classList.remove('hidden');
});

// Currency and date display format

const date = new Intl.DateTimeFormat(navigator.language).format(new Date());
balanceDate.textContent = date;

const currFormat = function (value) {
  const format = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'PLN',
  }).format(value);

  return format;
};

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
            <td>${currFormat(mov)}</td>
        </tr>`;
      account.movementsHTML.push(html);
    });
  });
};

// Added username as property into each account and save logged user account

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner.toLowerCase().split(' ')[0];
  });
};

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

// Validation data

const validationData = function () {
  alert('You entered wrong data. Please try agin.');
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
  } else {
    validationData();
    return;
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
  closeInfoPanel();
  savedMovements(accounts);
  createUsernames(accounts);
  userPanel.classList.contains('visibility') ? welcomePanel() : logOut();
});

// Display balance

const balance = function (account) {
  const amount = account.movements.reduce((acc, mov) => acc + mov, 0);
  currentBalance.textContent = currFormat(amount);
  account.balance = amount;
};

// In/Out - summary

const transactionSummary = function (movements) {
  const inTransaction = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  inSummary.textContent = currFormat(inTransaction);

  const outTransaction = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  outSummary.textContent = currFormat(-outTransaction);
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
      <td>${currFormat(amount)}</td>
    </tr>
  `;
    const withdrawalhtml = `
    <tr>
    <td><i class="fa-solid fa-user fa-2xs"></i></td>
      <td class = 'moveType-withdrawal'>withdrawal</td>
      <td>${currFormat(-amount)}</td>
    </tr>
  `;
    loggedUserAccount.movements.push(-amount);
    loggedUserAccount.movementsHTML.push(withdrawalhtml);
    updateUserPanelData(loggedUserAccount);
    reciverAccount.movements.push(amount);
    reciverAccount.movementsHTML.push(deposithtml);
    inputTransferTo.value = inputTransferAmount.value = '';
  } else {
    validationData();
  }
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
      <td>${currFormat(movValue)}</td>
    </tr>
  `;
    loggedUserAccount.movements.push(movValue);
    loggedUserAccount.movementsHTML.push(html);
    updateUserPanelData(loggedUserAccount);
    inputDeposit.value = '';
    iconType = '';
  } else {
    validationData();
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
  } else {
    validationData();
  }
};

closeAccountBtn.addEventListener('click', function (event) {
  event.preventDefault();
  closeAccount();
});
