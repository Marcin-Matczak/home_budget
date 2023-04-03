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
console.log(movementsContainer);

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
    1500, -7600, 1050, -2000, -950, 200, 12000, 8000, -2000, 1500, -7600, 1050,
    -2000, -950, 200, 12000, 8000, -2000, 1500, -7600, 1050, -2000, -950, 200,
  ],
};

const accounts = [account1, account2, account3];

// Login functionality

const welcomePanel = function () {
  const currentAccount = accounts.find(
    acount =>
      acount.owner.split(' ')[0].toLocaleLowerCase() ===
      inputUserNameLogin.value
  );
  if (currentAccount?.pin === Number(inputPasswordLogin.value)) {
    userPanel.classList.remove('visibility');
    welcomeInfo.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    inputUserNameLogin.value = inputPasswordLogin.value = '';
    inputPasswordLogin.blur();
    loginButtonDescription.textContent = 'Out';
    inputUserNameLogin.disabled = inputPasswordLogin.disabled = true;
  }
  balance(currentAccount.movements);
  transactionSummary(currentAccount.movements);
  displayMovements(currentAccount.movements);
};

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

const balance = function (movements) {
  const amount = movements.reduce((acc, mov) => acc + mov, 0);
  currFormat(currentBalance, amount);
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

// Movements

const displayMovements = function (movements) {
  movementsContainer.innerHTML = '';

  movements.forEach(function (mov) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <tr>
        <td class = 'moveType-${type}'>${type}</td>
        <td>${mov}€</td>
      </tr>
    `;
    movementsContainer.insertAdjacentHTML('afterbegin', html);
  });
};
