'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKY APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const loginForm = document.querySelector('.login')
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



//movements function
const displayMovements = function(movements) {

  containerMovements.innerHTML = ""

  movements.forEach(function(mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal"

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;


        containerMovements.insertAdjacentHTML("afterbegin", html)
  })
}

const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

// calcDisplayBalance(account1.movements)

const calcDisplaySummary = (acc) => {
  const income = acc.movements.filter(mov => mov > 0)
  .reduce((acc,mov) => acc + mov, 0)
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements.filter(mov => mov < 0)
  .reduce((acc,mov) => acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate / 100))
  .filter(int => int >= 1)
  .reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = `${interest}€`;
}

// calcDisplaySummary(account1.movements)


// displayMovements(account1.movements)

const createUsernames = function(accs) {
  accs.forEach(function(acc) {
  acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  })
}

const updateUI = (acc) => {
  //display movements
  displayMovements(acc.movements);

  //display balance
  calcDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
}



createUsernames(accounts)

let currentAccount;
btnLogin.addEventListener('click', (e) => {
  e.preventDefault(); 

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //message and UI
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`

    containerApp.style.opacity = "100"


    updateUI(currentAccount)
  }

  inputLoginUsername.value = inputLoginPin.value = ""

  // loginForm.style.display = "none"


})

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault()
  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
 

  inputTransferTo.value = inputTransferAmount.value = ""
  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)

    updateUI(currentAccount);
    console.log("Transfer successful")
  }
})


btnClose.addEventListener("click", (e) => {
  e.preventDefault()


  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    accounts.splice(index, 1)

    containerApp.style.opacity = '0';

  }

    inputCloseUsername.value = inputClosePin.value = '';
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// console.log(accounts)

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(mov => mov > 0 );
// console.log(movements)
// console.log(deposits)

// //FOR 

// const depositsFor = []
// for (const mov of movements) if (mov > 0) depositsFor.push(mov)
// console.log(depositsFor)

// const withdrawals = movements.filter(mov => mov < 0)
// console.log(withdrawals)

// const withdrawalsFor = [];
// for (const mov of movements) if (mov < 0) withdrawalsFor.push(mov)
// console.log(withdrawalsFor);


//REDUCE
// const balance = movements.reduce((acc, cur, i, arr) => {console.log(`iteration ${i}: ${acc} `);
//  return acc + cur}, 0)


// //FOR-REDUCE
// let sum = 0;
// for (const mov of movements) {
//   sum += mov
// }

// console.log(sum)


// const max = movements.reduce((acc, mov) => acc > mov ? acc : mov, movements[0])
// console.log(max)

