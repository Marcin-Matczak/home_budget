import { renderMovements, balance, transactionSummary } from './view.js';

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
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => (input.value = ''));
};
