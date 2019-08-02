class Book {
    constructor(hiredFor, jobType, name, lastName, EGN, salary) {

        this.hiredFor = hiredFor;
        this.jobType = jobType;
        this.name = name;
        this.lastName = lastName;
        this.EGN = EGN;
        this.salary = salary;

    }
}
class UI {
    addMemberToList(book) {
        const list = document.getElementById('book-list');

        //create tr element

        const row = document.createElement('tr');

        //insert cols

        row.innerHTML = `
    <td>${book.name}</td>
    <td>${book.lastName}</td>
    <td>${book.hiredFor}</td>
    <td>${book.jobType}</td>
    <td>${book.EGN}</td>
    <td>${book.salary}</td>
    <td>${parseInt(book.salary) - parseInt(book.salary) * (20 / 100)}</td>
    <td><a href="#" class="delete">Fire ${book.name}<a></td>
    
    `
        list.appendChild(row);
    }


    showAlert(message, className) {
        //create div
        const div = document.createElement('div');

        div.className = `alert ${className}`;
        //add Text
        div.appendChild(document.createTextNode(message));
        //get parent
        const container = document.querySelector('.container');

        const form = document.querySelector('#book-form');
        //insert allert
        container.insertBefore(div, form);

        // disapear after 3 secs
        setTimeout(function() {
            document.querySelector('.alert').remove()
        }, 3000);
    }
    deleteMember(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    clearFields() {
        document.getElementById('hiredFor').value = "";
        document.getElementById('jobType').value = "";
        document.getElementById('name').value = "";
        document.getElementById('lastName').value = "";
        document.getElementById('egn').value = "";
        document.getElementById('salary').value = "";
    }

}
class Store {
    static getUsers() {
        let member;
        if (localStorage.getItem('member') === null) {
            member = [];
        } else {
            member = JSON.parse(localStorage.getItem('member'));
        }

        return member;
    }

    static displayMember() {
        const member = Store.getUsers();

        member.forEach(function(book) {
            const ui = new UI;

            // Add book to UI
            ui.addMemberToList(book);
        });
    }

    static addMember(book) {
        const member = Store.getUsers();

        member.push(book);

        localStorage.setItem('member', JSON.stringify(member));
    }

    static removeMember(EGN) {
        const member = Store.getUsers();

        member.forEach(function(book, index) {
            if (book.EGN === EGN) {
                member.splice(index, 1);
            }
        });

        localStorage.setItem('member', JSON.stringify(member));
    }
}


document.addEventListener('DOMContentLoaded', Store.displayMember);
//Event listeners
document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();
    //get comment values
    const hiredFor = document.getElementById('hiredFor').value,
        jobType = document.getElementById('jobType').value,
        name = document.getElementById('name').value,
        lastName = document.getElementById('lastName').value,
        EGN = document.getElementById('egn').value;
    salary = document.getElementById('salary').value,

        console.log(hiredFor, jobType, name, lastName, EGN, salary);
    //instantiate book             
    const book = new Book(hiredFor, jobType, name, lastName, EGN, salary);

    const ui = new UI();

    //validate

    if (hiredFor === 'Choose...' || jobType === 'Choose...' || name === '' || lastName === '' || EGN === '' || salary === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        //add book to list
        ui.addMemberToList(book);

        // Add to LS
        Store.addMember(book);

        //show success
        ui.showAlert('Team member added!', 'success');

        //clear fields

        ui.clearFields();
    }
});


// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {

    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteMember(e.target);
    //remove from ls
    Store.removeMember(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

    // Show message
    ui.showAlert('Team member fired!', 'success');

    e.preventDefault();
});

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}