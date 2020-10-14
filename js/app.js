//classes

class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.budgetLeft = this.budget;

    }

    subtractFromBudget(amount){
        return this.budgetLeft -= amount;
    }
}

//everything related to html
class HTML {
    //inserts budget with user userbudget input
    insertBudget(amount) {
        budgetTotal.innerHTML = `${amount.budget}`;
        budgetLeft.innerHTML = `${amount.budgetLeft}`;
    }

    // displays a message (correct or invalid)
    printMessage(message, className) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        // insert into DOM
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

        // clear the error 
        setTimeout(() => {
            document.querySelector('.primary .alert').remove();
            addExpenseForm.reset();
        }, 3000);

    }
    //add expenses to the DOM
    addExpenseToList(name, amount){
        const expensesList = document.querySelector('#expenses ul');

        // create a li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill">$ ${amount}</span>
        `;

        //Insert into the HTML
        expensesList.appendChild(li);
    }

    //subtract expense amount from budget
    trackBudget(amount){
        const budgetLeftDollars = budget.subtractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`;

        //check when 50% is spent
        if ((budget.budget / 4) > budgetLeftDollars){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
            

        } else if ((budget.budget / 2 ) > budgetLeftDollars) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
}

// variables
const addExpenseForm = document.querySelector('#add-expense'),
      budgetTotal = document.querySelector('span#total'),
      budgetLeft = document.querySelector('span#left');

// instantiate the HTML class
const html = new HTML();

let budget, userBudget




//event listenters
eventListeners();

function eventListeners() {

    //init App
    document.addEventListener('DOMContentLoaded', function() {
        //grab budget input
        userBudget = prompt(`What's your budget for this week?`)

        if(userBudget == null || userBudget == "" || isNaN(userBudget)) {
            window.location.reload();
        } else {
            budget = new Budget(userBudget);
            
            //instantiate html class
            html.insertBudget(budget);
        }
    })

    //when a new expense is added
    addExpenseForm.addEventListener('submit', function(e){
        e.preventDefault();

        //read values from the budget form
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if(expenseName === "" || amount === "" || isNaN(amount)){
            html.printMessage('There was an error. All fields are mandatory. Amount must be a number.', 'alert-danger');
        } else {
            //add expenses to the list
            html.addExpenseToList(expenseName, amount);
            html.trackBudget(amount);
            html.printMessage('Added...', 'alert-success');
        }
    });
}
