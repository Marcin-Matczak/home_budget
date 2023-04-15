// Accounts

const account1 = {
  owner: 'Marcin Matczak',
  pin: 1202,
  movements: [1000, 200, -400, 150, -300, 280, 900],
};

const account2 = {
  owner: 'Jim Beam',
  pin: 1111,
  movements: [],
};

const account3 = {
  owner: 'John Doe',
  pin: 1996,
  movements: [
    8000, -2000, 1500, -7600, 1050, -950, 200, 12000, 8000, -2000, -100, -1900,
    340, -650,
  ],
};

export let accounts = [account1, account2, account3];

// Get data from local storage

export const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem('budget_app'));
  if (!data) return;
  accounts = data;
};
