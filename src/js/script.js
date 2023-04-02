const inputUsernameLogin = document.querySelector('.login__user');
const inputPasswordLogin = document.querySelector('.login__password');
const welcomeInfo = document.querySelector('.welcome');
const loginButton = document.querySelector('.btn--log');
const userPanel = document.querySelector('.user-panel');

const account = {
  owner: 'Marcin Matczak',
  pin: 1202,
  movements: [],
};

const userInitials = function (accountObject) {
  const user = accountObject.owner.toLocaleLowerCase();
  const space = user.indexOf(' ');
  const initial = user.slice(0, 1) + user.slice(space + 1, space + 2);
  return initial;
};

const welcomePanel = function (user, pin) {
  if (user === userInitials(account) && pin === account.pin) {
    userPanel.classList.remove('visibility');
    const owner = account.owner;
    const userName = owner.slice(0, owner.indexOf(' '));
    welcomeInfo.textContent = `Welcome back, ${userName}`;
    inputUsernameLogin.value = '';
    inputPasswordLogin.value = '';
  }
};

loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  const userName = inputUsernameLogin.value;
  const userPin = Number(inputPasswordLogin.value);
  if (userName && userPin) welcomePanel(userName, userPin);
});
