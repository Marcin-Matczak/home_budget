import { select, classNames, alerts } from './config.js';

// Info panel

export const closeInfoPanel = function () {
  select.infoPanel.classList.add(classNames.visibility);
  select.userPanel.classList.remove(classNames.hidden);
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

// Loading saved movements form created array with HTML

export const savedMovements = function (accounts) {
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

export const validationData = function () {
  alert(alerts.generalValid);
};
