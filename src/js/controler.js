import { select, classNames, movementsIcons, alerts } from './config.js';
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

// Info panel

select.closeInfoButton.addEventListener('click', function (event) {
  event.preventDefault();
  closeInfoPanel();
});

// New account

let newUserAccount;

const newAccount = function () {
  const owner = select.inputFirstName.value + ' ' + select.inputLastName.value;
  if (accounts.find(acc => acc.owner === owner)) {
    validationData(alerts.existingAccount);
    return;
  }

  const pin = Number(select.inputSetupPin.value);
  newUserAccount = {
    owner,
    pin,
    movements: [],
    movementsHTML: [],
  };
  accounts.push(newUserAccount);
  createUsernames(accounts);
  clearInputsForm(select.infoForm);
  select.infoForm.classList.add(classNames.visibility);
  select.successInfo.classList.remove(classNames.hidden);
  setLocalStorage(accounts);
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

// Create html movements for existing fictitious accounts

const savedMovements = function (accounts) {
  accounts.forEach(function (account) {
    account.movementsHTML = [];
    account?.movements.forEach(function (mov) {
      const type = mov > 0 ? 'deposit' : 'withdrawal';
      const html = `
        <tr>
          <td><i class="fa-solid fa-coins fa-xs"></i></td>
          <td class='descMov'>${select.balanceDate.textContent}</td>
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
    validationData(alerts.wrongLoginData);
    return;
  }
  updateUserPanelData(loggedUserAccount);
};

// Logout/Login - functionality

select.loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  closeInfoPanel();
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
    renderTransfersType(amount, loggedUserAccount.owner, reciverAccount.owner);
    loggedUserAccount.movements.push(-amount);
    loggedUserAccount.movementsHTML.push(transferType.withdrawalhtml);
    updateUserPanelData(loggedUserAccount);
    reciverAccount.movements.push(amount);
    reciverAccount.movementsHTML.push(transferType.deposithtml);
    clearInputsForm(select.transferForm);
  } else {
    clearInputsForm(select.transferForm);
    validationData(alerts.wrongReciverData);
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
  const iconDescription = [...movementsIcons].find(arr =>
    arr.includes(iconType)
  )[0];
  if (amount) {
    const mov = iconType === 'salary' ? amount : -amount;
    if (-mov > loggedUserAccount.balance) {
      clearInputsForm(select.depositForm);
      validationData(alerts.lackMoney);
      return;
    }
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <tr>
    <td>${movementsIcons.get(iconType)}</td>
    <td class='descMov'>${select.balanceDate.textContent}</td>
      <td class = 'moveType-${type}'>${type} - <span class='descMov'>${iconDescription}</span></td>
      <td>${currFormat(mov)}</td>
    </tr>
  `;
    loggedUserAccount.movements.push(mov);
    loggedUserAccount.movementsHTML.push(html);
    updateUserPanelData(loggedUserAccount);
    clearInputsForm(select.depositForm);
  } else {
    validationData(alerts.incorrectValue);
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
    clearInputsForm(select.closeForm);
    validationData(alerts.wrongLoginData);
  }
};

select.closeAccountBtn.addEventListener('click', function (event) {
  event.preventDefault();
  closeAccount();
  setLocalStorage(accounts);
});

const init = function () {
  if (localStorage.getItem('budget_app') === null) {
    createUsernames(accounts);
    savedMovements(accounts);
    setLocalStorage(accounts);
    getLocalStorage();
  } else {
    getLocalStorage();
  }
};

init();
