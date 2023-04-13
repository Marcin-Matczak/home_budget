import { select, classNames, movementsIcons, alerts } from './config.js';
import { accounts, getLocalStorage } from './model.js';
import {
  closeInfoPanel,
  currFormat,
  savedMovements,
  validationData,
  validationInputs,
} from './view.js';

getLocalStorage();

// Data save in local storage

const setLocalStorage = function () {
  localStorage.setItem('accounts', JSON.stringify(accounts));
};

// Info panel

select.closeInfoButton.addEventListener('click', function (event) {
  event.preventDefault();
  closeInfoPanel();
});

// New account

let newUserAccount;

const newAccount = function () {
  const owner = select.inputFirstName.value + ' ' + select.inputLastName.value;
  const pin = Number(select.inputSetupPin.value);
  newUserAccount = {
    owner,
    pin,
    movements: [],
  };
  accounts.push(newUserAccount);
};

select.infoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (
    !validationInputs(
      select.inputFirstName,
      select.inputLastName,
      select.inputSetupPin
    )
  )
    return;
  newAccount();
  select.inputFirstName.value =
    select.inputLastName.value =
    select.inputSetupPin.value =
      '';
  select.infoForm.classList.add(classNames.visibility);
  select.successInfo.classList.remove(classNames.hidden);
  setLocalStorage();
});

// Added username as property into each account and save logged user account

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner.toLowerCase().split(' ')[0];
  });
};

let loggedUserAccount;

const loggedUser = function () {
  loggedUserAccount = accounts.find(
    acount => acount.username === select.inputUserNameLogin.value
  );
};

// Update amounts in user panel

const updateUserPanelData = function (account) {
  renderMovements(account);
  balance(account);
  transactionSummary(account.movements);
};

// ----------- TO DO ---------------- //

// Open user panel

const welcomePanel = function () {
  loggedUser();
  if (loggedUserAccount?.pin === Number(select.inputPasswordLogin.value)) {
    select.userPanel.classList.remove(classNames.visibility);
    select.welcomeInfo.textContent = `Welcome back, ${
      loggedUserAccount.owner.split(' ')[0]
    }!`;
    loggedUser(select.inputUserNameLogin.value);
    select.inputUserNameLogin.value = select.inputPasswordLogin.value = '';
    select.inputPasswordLogin.blur();
    select.loginButtonDescription.textContent = 'Out';
    select.inputUserNameLogin.disabled =
      select.inputPasswordLogin.disabled = true;
  } else {
    validationData();
    return;
  }
  updateUserPanelData(loggedUserAccount);
};

// Logout/Login - functionality

const logOut = function () {
  select.userPanel.classList.add(classNames.visibility);
  select.loginButtonDescription.textContent = 'In';
  select.welcomeInfo.textContent = 'Please Log In';
  select.inputUserNameLogin.disabled =
    select.inputPasswordLogin.disabled = false;
};

select.loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  closeInfoPanel();
  savedMovements(accounts);
  createUsernames(accounts);
  select.userPanel.classList.contains(classNames.visibility)
    ? welcomePanel()
    : logOut();
  setLocalStorage();
});

// Display balance

const balance = function (account) {
  const amount = account.movements.reduce((acc, mov) => acc + mov, 0);
  select.currentBalance.textContent = currFormat(amount);
  account.balance = amount;
};

// In/Out - summary

const transactionSummary = function (movements) {
  const inTransaction = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  select.inSummary.textContent = currFormat(inTransaction);

  const outTransaction = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  select.outSummary.textContent = currFormat(-outTransaction);
};

// Movements view

let iconType;

const clearMovements = function () {
  select.movementsContainer.innerHTML = '';
};

const renderMovements = function (account) {
  clearMovements();
  account.movementsHTML.forEach(mov => {
    select.movementsContainer.insertAdjacentHTML('afterbegin', mov);
  });
};

// Internal Money Transfer

const InternalMoneyTransfer = function () {
  const amount = Number(select.inputTransferAmount.value);
  const reciverAccount = accounts.find(
    acount => acount.username === select.inputTransferTo.value
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
    select.inputTransferTo.value = select.inputTransferAmount.value = '';
  } else {
    validationData();
  }
};

select.moneyTransferButton.addEventListener('click', function (event) {
  event.preventDefault();
  InternalMoneyTransfer();
  setLocalStorage();
});

// Deposit / Withdrawal

const depositMoney = function () {
  const amount = Number(select.inputDeposit.value);
  if (amount) {
    const movValue = iconType === 'salary' ? amount : -amount;
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
    select.inputDeposit.value = '';
    iconType = '';
  } else {
    validationData();
  }
};

select.depositButton.addEventListener('click', function (event) {
  event.preventDefault();
  depositMoney();
  setLocalStorage();
});

// Deposit / Withdrawal - icons

select.iconsWrapper.addEventListener('click', function (event) {
  event.preventDefault();
  const clickedIcon = event.target.closest('.icon');
  if (!clickedIcon) return;
  iconType = clickedIcon.getAttribute('aria-label');
});

// Close account

const closeAccount = function () {
  const userLogin = select.closeUserInput.value;
  const userPin = Number(select.closePinInput.value);
  if (
    userLogin === loggedUserAccount.username &&
    userPin === loggedUserAccount.pin
  ) {
    accounts.splice(
      accounts.indexOf(accounts.find(account => account.pin === userPin)),
      1
    );
    select.closeUserInput.value = select.closePinInput.value = '';
    logOut();
  } else {
    validationData();
  }
};

select.closeAccountBtn.addEventListener('click', function (event) {
  event.preventDefault();
  closeAccount();
  setLocalStorage();
});
