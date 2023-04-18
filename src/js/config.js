// Elements

export const select = {
  infoButton: document.querySelector('.info-icon'),
  closeInfoButton: document.querySelector('.info__closeIcon'),
  infoPanel: document.querySelector('.info'),
  loginForm: document.querySelector('.navigation__login'),
  infoForm: document.querySelector('.info__form'),
  transferForm: document.querySelector('.transfer__form'),
  depositForm: document.querySelector('.request__form'),
  closeForm: document.querySelector('.close__form'),
  inputFirstName: document.querySelector('.form__firstName'),
  inputLastName: document.querySelector('.form__lastName'),
  inputSetupPin: document.querySelector('.form__setup-pin'),
  successInfo: document.querySelector('.info__success'),
  inputUserNameLogin: document.querySelector('.form__user'),
  inputPasswordLogin: document.querySelector('.form__pin'),
  welcomeInfo: document.querySelector('.navigation__welcome'),
  loginButton: document.querySelector('.form__btn--login'),
  loginButtonDescription: document.querySelector('.form__btn--logout'),
  userPanel: document.querySelector('.user-panel'),
  balanceDate: document.querySelector('.header__date'),
  currentBalance: document.querySelector('.header__balance'),
  inSummary: document.querySelector('.footer__in'),
  outSummary: document.querySelector('.footer__out'),
  movementsContainer: document.querySelector('.table__tbody'),
  inputTransferTo: document.querySelector('.form__to'),
  inputTransferAmount: document.querySelector('.form__amount'),
  moneyTransferButton: document.querySelector('.btn__form--transfer'),
  depositButton: document.querySelector('.btn__form--deposit'),
  inputDeposit: document.querySelector('.form__deposit'),
  iconsWrapper: document.querySelector('.icons'),
  closeUserInput: document.querySelector('.form__close-user'),
  closePinInput: document.querySelector('.form__close-pin'),
  closeAccountBtn: document.querySelector('.btn__form--close'),
};

// Class names

export const classNames = {
  visibility: 'visibility',
  hidden: 'hidden',
};

// Icons HTML

export const movementsIcons = new Map();
movementsIcons
  .set('salary', '<i class="fa-solid fa-sack-dollar fa-lg"></i>')
  .set('entertainment', '<i class="fa-solid fa-music fa-lg"></i>')
  .set('vehicles', '<i class="fa-solid fa-solid fa-car fa-lg"></i>')
  .set('fees', '<i class="fa-solid fa-file-invoice-dollar fa-lg"</i>')
  .set('clothes', '<i class="fa-sharp fa-solid fa-shirt fa-lg"></i>')
  .set('home', '<i class="fa-solid fa-house fa-lg"></i>')
  .set('medication', '<i class="fa-solid fa-heart-pulse fa-lg"></i>')
  .set('education', '<i class="fa-solid fa-user-graduate fa-lg"></i>')
  .set('food', '<i class="fa-solid fa-utensils fa-lg"></i>')
  .set('other', '<i class="fa-solid fa-coins fa-lg"></i>');

// Alerts

export const alerts = {
  userData:
    'Wrong data! Remember that the first and last name should start with a capital and cannot contain whitespace or special signs.',
  userPIN: 'Incorrect PIN. Please enter a four-digit number.',
  existingAccount: 'User  already exists!',
  wrongLoginData:
    'You have entered an incorrect login or password. Remember that the login is a lowercase name and the pin consists of 4 digits.',
  wrongReciverData:
    'Incorrect receiver name or insufficient funds on the account.',
  incorrectValue: 'Incorrect value!',
  lackMoney: 'Insufficient funds on the account.',
};
