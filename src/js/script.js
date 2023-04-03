// Elements

const inputUserNameLogin = document.querySelector('.login__user');
const inputPasswordLogin = document.querySelector('.login__password');
const welcomeInfo = document.querySelector('.welcome');
const loginButton = document.querySelector('.btn--log');
const loginButtonDescription = document.querySelector('.LoginBtnType');
const userPanel = document.querySelector('.user-panel');

// Accounts

const account1 = {
  owner: 'Marcin Matczak',
  pin: 1202,
  movements: [],
};

const account2 = {
  owner: 'Elliot Alderson',
  pin: 1709,
  movements: [],
};

const account3 = {
  owner: 'John Doe',
  pin: 1996,
  movements: [],
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
