// Elements

export const select = {
  closeInfoButton: document.querySelector('.info-closeBtn'),
  infoPanel: document.querySelector('.info'),
  infoForm: document.querySelector('.info__form'),
  inputFirstName: document.querySelector('.firstName'),
  inputLastName: document.querySelector('.lastName'),
  inputSetupPin: document.querySelector('.setupPin'),
  successInfo: document.querySelector('.successInfo'),
  inputUserNameLogin: document.querySelector('.login__user'),
  inputPasswordLogin: document.querySelector('.login__password'),
  welcomeInfo: document.querySelector('.welcome'),
  loginButton: document.querySelector('.btn--log'),
  loginButtonDescription: document.querySelector('.LoginBtnType'),
  userPanel: document.querySelector('.user-panel'),
  balanceDate: document.querySelector('.date'),
  currentBalance: document.querySelector('.balance'),
  inSummary: document.querySelector('.inMovements'),
  outSummary: document.querySelector('.outMovements'),
  movementsContainer: document.querySelector('.movements_body'),
  inputTransferTo: document.querySelector('.form__to'),
  inputTransferAmount: document.querySelector('.form__amount'),
  moneyTransferButton: document.querySelector('.btn-transfer'),
  depositButton: document.querySelector('.depositBtn'),
  inputDeposit: document.querySelector('.deposit'),
  iconsWrapper: document.querySelector('.icons'),
  closeUserInput: document.querySelector('.close-user'),
  closePinInput: document.querySelector('.close-pin'),
  closeAccountBtn: document.querySelector('.close-btn'),
};

// Class names

export const classNames = {
  visibility: 'visibility',
  hidden: 'hidden',
};

// Icons HTML

export const movementsIcons = new Map();
movementsIcons
  .set('salary', '<i class="fa-solid fa-sack-dollar fa-xs"></i>')
  .set('entertainment', '<i class="fa-solid fa-music fa-xs"></i>')
  .set('vehicles', '<i class="fa-solid fa-solid fa-car fa-xs"></i>')
  .set('fees', '<i class="fa-solid fa-file-invoice-dollar fa-xs"</i>')
  .set('clothes', '<i class="fa-sharp fa-solid fa-shirt fa-xs"></i>')
  .set('home', '<i class="fa-solid fa-house fa-xs"></i>')
  .set('medication', '<i class="fa-solid fa-heart-pulse fa-xs"></i>')
  .set('education', '<i class="fa-solid fa-user-graduate fa-xs"></i>')
  .set('food', '<i class="fa-solid fa-utensils fa-xs"></i>')
  .set('other', '<i class="fa-solid fa-coins fa-xs"></i>');

// Alerts

export const alerts = {
  userData:
    'Wrong data! Remember that the first and last name should start with a capital and cannot contain whitespace or special signs.',
  userPIN: 'Incorrect PIN. Please enter a four-digit number.',
  generalValid: 'You entered wrong data. Please try agin.',
};
