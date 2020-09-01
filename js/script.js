const search = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
let employees = [];

// fetch the employees from the Random User Generator API
fetch('https://randomuser.me/api/?results=12&inc=name,picture,email,location,cell,dob&noinfo&nat=us')
    .then( response => response.json() )
    .then( data => {
        employees = data.results;
        createDirectory(employees);
    });

// create the employee directory gallery
const createDirectory = () => {
    // iterates over the data array and adds a directory card for each employee
    for (let employee of employees ) {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        `;

        gallery.appendChild(card);

        card.addEventListener('click', () => {
            createModal(employee.email);
        });
    }    
};

const createModal = (email) => {
    for (let employee of employees) {
        if (email === employee.email) {
            const modalContainer = createElement('div', 'modal-container');
            const modal = createElement('div', 'modal');
            const button = createElement('button', 'modal-close-btn');
            const infoContainer = createElement('div', 'modal-info-container');
            const img = createElement('img', 'modal-img');
            const name = createElement('h3', 'modal-name cap');
            const email = createElement('p', 'modal-text');
            const location = createElement('p', 'modal-text cap');
            const phone = createElement('p', 'modal-text');
            const address = createElement('p', 'modal-text');
            const birthday = createElement('p', 'modal-text');
            const hr = document.createElement('hr');

            button.setAttribute('type', 'button');
            button.setAttribute('id', 'modal-close-btn');
            button.innerHTML = '<strong>X</strong>';
            img.setAttribute('alt', 'profile picture');
            img.setAttribute('src', employee.picture.large);

            name.textContent = `${employee.name.first} ${employee.name.last}`;
            email.textContent = `${employee.email}`;
            location.textContent = `${employee.location.city}`;
            phone.textContent = `${employee.textContent.cell}`;
            address.textContent = `${employee.location.street}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
            birthday.textContent = `Birthday: ${employee.dob.date}`;

            modalContainer.appendChild(modal);
            modal.appendChild(button);
            modal.appendChild(infoContainer);
            infoContainer.appendChild(img);
            infoContainer.appendChild(name);
            infoContainer.appendChild(email);
            infoContainer.appendChild(location);
            infoContainer.appendChild(hr);
            infoContainer.appendChild(phone);
            infoContainer.appendChild(address);
            infoContainer.appendChild(birthday);
        }
    }
};