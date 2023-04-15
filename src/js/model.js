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

export let accounts = [account1, account2, account3, account4];

// Get data from local storage

export const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem('budget_app'));
  if (!data) return;
  accounts = data;
};
