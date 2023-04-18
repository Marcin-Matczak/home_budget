import { select, classNames, alerts } from './config.js';
import { htmlCreator } from './helpers.js';

// Toggle content visibility

export const toggleVisibility = function () {
  if (select.userPanel.classList.contains(classNames.hidden)) {
    select.infoPanel.classList.add(classNames.hidden);
    select.infoButton.classList.add(classNames.hidden);
    select.userPanel.classList.remove(classNames.hidden);
  } else {
    select.userPanel.classList.add(classNames.hidden);
    select.infoButton.classList.remove(classNames.hidden);
    select.infoPanel.classList.add(classNames.visibility);
    select.infoPanel.classList.remove(classNames.hidden);
  }
};

// Login panel

export const logOut = function () {
  toggleVisibility();
  select.loginButtonDescription.textContent = 'In';
  select.welcomeInfo.textContent = 'Please Log In';
  select.inputUserNameLogin.disabled =
    select.inputPasswordLogin.disabled = false;
};

// Currency and date display format

const date = new Intl.DateTimeFormat(navigator.language).format(new Date());
select.balanceDate.textContent = date;

export const currFormat = function (value) {
  const format = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'PLN',
  }).format(value);

  return format;
};

// Validations

export const validationInputs = function (
  personFirstName,
  personLastName,
  pin
) {
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
      alert(alerts.userPIN);
      return false;
    }
  } else {
    alert(alerts.userData);
    return false;
  }
};

export const validationData = function (info) {
  alert(info);
};

// Display balance

export const balance = function (account) {
  const amount = account.movements.reduce((acc, mov) => acc + mov, 0);
  select.currentBalance.textContent = currFormat(amount);
  account.balance = amount;
};

// In/Out - summary

export const transactionSummary = function (movements) {
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

export const renderMovements = function (account) {
  select.movementsContainer.innerHTML = '';
  account.movementsHTML.forEach(mov => {
    select.movementsContainer.insertAdjacentHTML('afterbegin', mov);
  });
};

export let transferType = {};

export const renderTransfersType = function (amount, sender, reciver) {
  const icon = '<i class="fa-solid fa-user fa-lg"></i>';
  const deposit = 'deposit';
  const withdrawal = 'withdrawal';
  transferType = {
    deposithtml: htmlCreator(icon, amount, deposit, sender),
    withdrawalhtml: htmlCreator(icon, -amount, withdrawal, reciver),
  };
  return transferType;
};
