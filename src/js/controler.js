import { select, classNames, movementsIcons } from './config.js';
import { accounts, getLocalStorage } from './model.js';
import {
  closeInfoPanel,
  currFormat,
  validationData,
  validationInputs,
  logOut,
  renderTransfersType,
  transferType,
} from './view.js';
import {
  updateUserPanelData,
  setLocalStorage,
  clearInputsForm,
} from './helpers.js';

getLocalStorage();

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
  clearInputsForm(select.infoForm);
  select.infoForm.classList.add(classNames.visibility);
  select.successInfo.classList.remove(classNames.hidden);
  setLocalStorage(accounts);
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

// Create html movements

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

// Open user panel

const welcomePanel = function () {
  loggedUser();
  if (loggedUserAccount?.pin === Number(select.inputPasswordLogin.value)) {
    select.userPanel.classList.remove(classNames.visibility);
    select.welcomeInfo.textContent = `Welcome back, ${
      loggedUserAccount.owner.split(' ')[0]
    }!`;
    clearInputsForm(select.loginForm);
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

select.loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  closeInfoPanel();
  savedMovements(accounts);
  createUsernames(accounts);
  select.userPanel.classList.contains(classNames.visibility)
    ? welcomePanel()
    : logOut();
  setLocalStorage(accounts);
});

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
    renderTransfersType(amount);
    loggedUserAccount.movements.push(-amount);
    loggedUserAccount.movementsHTML.push(transferType.withdrawalhtml);
    updateUserPanelData(loggedUserAccount);
    reciverAccount.movements.push(amount);
    reciverAccount.movementsHTML.push(transferType.deposithtml);
    clearInputsForm(select.transferForm);
  } else {
    validationData();
  }
};

select.moneyTransferButton.addEventListener('click', function (event) {
  event.preventDefault();
  InternalMoneyTransfer();
  setLocalStorage(accounts);
});

// Deposit / Withdrawal

let iconType;

const depositMoney = function () {
  const amount = Number(select.inputDeposit.value);
  if (amount) {
    const mov = iconType === 'salary' ? amount : -amount;
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <tr>
    <td>${movementsIcons.get(iconType)}</td>
      <td class = 'moveType-${type}'>${type}</td>
      <td>${currFormat(mov)}</td>
    </tr>
  `;
    loggedUserAccount.movements.push(mov);
    loggedUserAccount.movementsHTML.push(html);
    updateUserPanelData(loggedUserAccount);
    clearInputsForm(select.depositForm);
    iconType = '';
  } else {
    validationData();
  }
};

select.depositButton.addEventListener('click', function (event) {
  event.preventDefault();
  depositMoney();
  setLocalStorage(accounts);
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
    clearInputsForm(select.closeForm);
    logOut();
  } else {
    validationData();
  }
};

select.closeAccountBtn.addEventListener('click', function (event) {
  event.preventDefault();
  closeAccount();
  setLocalStorage(accounts);
});
