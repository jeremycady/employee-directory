const numOfRecords = 12;
const search = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
const body = document.querySelector('body');
let employees = [];

// fetch the employees from the Random User Generator API
fetch(`https://randomuser.me/api/?results=${numOfRecords}&inc=name,picture,email,location,cell,dob&noinfo&nat=us`)
    .then( response => response.json() )
    .then( data => {
        employees = data.results;
        formatData();
        createDirectory();
    });

// add search input to page
search.innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;

// reformats cell number and birthdate
const formatData = () => {
    for (let employee of employees) {
        employee.cell = employee.cell.replace(/\D/g, '')
            .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        
        const date = new Date(employee.dob.date);
        employee.dob.date = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    }
}

// create the employee directory gallery
const createDirectory = () => {
    // iterates over the data array and adds a directory card for each employee
    for (let employee of employees ) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.display = 'flex';
        
        card.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}</p>
            </div>
        `;

        gallery.appendChild(card);

        card.addEventListener('click', () => {
            createModal(employee.email);
        });
    }    
};

const createModal = (email) => {
    for (let i=0; i<employees.length; i++) {
        const employee = employees[i];
        if (email === employee.email) {
            const modal = document.createElement('div');
            modal.className = 'modal-container'

            modal.innerHTML = `
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                        <h3 class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.location.city}</p>
                        <hr>
                        <p class="modal-text">${employee.cell}</p>
                        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, 
                        ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${employee.dob.date}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            `;

            body.appendChild(modal);

            // close modal window when 'x' is clicked
            document.getElementById('modal-close-btn').addEventListener('click', () => {
                body.removeChild(modal);
            });

            // show modal of previous employee in shown directory
            document.getElementById('modal-prev').addEventListener('click', () => {
                body.removeChild(modal);
                for (let j = i; j < employees.length;) {
                    const cards = document.querySelectorAll('.card');
                    if (j === 0) {
                        j = numOfRecords - 1;
                        if(cards[j].style.display === 'flex') {
                            return createModal(employees[j].email);
                        }
                    } else {
                        j -=1;
                        if(cards[j].style.display === 'flex') {
                            return createModal(employees[j].email);
                        }
                    }
                }
            });

            // show modal of next employee in shown directory
            document.getElementById('modal-next').addEventListener('click', () => {
                body.removeChild(modal);
                for (let j = i; j < employees.length;) {
                    const cards = document.querySelectorAll('.card');
                    if (j === numOfRecords - 1) {
                        j = 0;
                        if(cards[j].style.display === 'flex') {
                            return createModal(employees[j].email);
                        }
                    } else {
                        j += 1;
                        if(cards[j].style.display === 'flex') {
                            return createModal(employees[j].email);
                        }
                    }
                }
            });
        }
    }

};

// listen for submissions of the search form and filter results shown on page
document.getElementById('search-submit').addEventListener('click', (e) => {
    e.preventDefault();
    const search = document.getElementById('search-input');
    const cards = document.querySelectorAll('.card');
    for (let card of cards) {
        const info = card.lastElementChild;
        const name = info.firstElementChild;
        
        if (name.textContent.toLowerCase().includes(search.value.toLowerCase())) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    }
});