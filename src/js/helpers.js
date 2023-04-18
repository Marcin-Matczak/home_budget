import {
  renderMovements,
  balance,
  transactionSummary,
  currFormat,
} from './view.js';
import { select } from './config.js';

// Update amounts in user panel

export const updateUserPanelData = function (account) {
  renderMovements(account);
  balance(account);
  transactionSummary(account.movements);
};

// Data save in local storage

export const setLocalStorage = function (data) {
  localStorage.setItem('budget_app', JSON.stringify(data));
};

// Clear inputs

export const clearInputsForm = function (form) {
  const inputs = form.querySelectorAll('.input');
  inputs.forEach(input => (input.value = ''));
};

// Movments html creator

export const htmlCreator = function (icon, amount, type, descr) {
  const html = `  <tr class='table__tr'>
  <td class='table__td'>${icon}</td>
  <td class='table__td table__td--descr'>${select.balanceDate.textContent}</td>
  <td class='table__td table__td--type-${type}'>${type} - <span class='table__td--descr'>${descr}</span></td>
  <td class='table__td'>${currFormat(amount)}</td>
</tr>`;
  return html;
};
