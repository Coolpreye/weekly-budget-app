// classes
class Budget {
    constructor(budget) {
        this.budget = Number( budget );
        this.budgetLeft = this.budget;
    }

    // subtracts from the budget
    subtractFromBudget(amount) {
        return this.budgetLeft -= amount;
    }
}

// everything related to html
class HTML {

    // inserts the budget when the user submits it
    insertBudget(amount) {
        //insert into html
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }

    printMessage(message, className) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        // insert into html
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

        // clear the error
        setTimeout(function(){
            document.querySelector('.primary .alert').remove();
            addExpenseForm.reset();
        }, 3000);
    }

    // displays the expenses from the form into the list
    addExpenseToList(name, amount) {
        const expenseList = document.querySelector('#expenses ul');

        // create an li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        // create the template
        li.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill">$ ${amount}</span>
        `;

        // insert into the html
        expenseList.appendChild(li);
    }

    trackBudget(amount) {
        const budgetLeftDollars = budget.subtractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`;

        // check when 50% is spent
        if( (budget.budget) / 4 > budgetLeftDollars ) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        } else if( (budget.budget) / 2 > budgetLeftDollars ) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
}




// variables
const addExpenseForm = document.querySelector('#add-expense'),
        budgetTotal = document.querySelector('span#total'),
        budgetLeft = document.querySelector('span#left');
    

let budget, userBudget;

// instantiate the html class
const html = new HTML();
 







// eventlisteners
eventListeners();

function eventListeners() {
    // app init
    document.addEventListener('DOMContentLoaded', function() {
        userBudget = prompt('What\'s your budget for this week? ');
        // validate the user budget
        if(userBudget === null || userBudget === '' || userBudget === '0') {
            window.location.reload();
        } else {
            // budget is valid then instantiate the budget class
            budget = new Budget(userBudget);

            // instantiate with html
            html.insertBudget(budget.budget);

        }
    });

    document.addEventListener('submit', function(e) {
        e.preventDefault();
        // read the input values
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if(expenseName === '' || amount === '') {
            html.printMessage('There was error, all the fields are mandatory', 'alert-danger');
        } else {
            // add expenses into iist
            html.addExpenseToList(expenseName, amount);
            html.trackBudget(amount);
            html.printMessage('Added....', 'alert-success');
            
        }

    });
}