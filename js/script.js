const search = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');

// fetch the employees from the Random User Generator API
fetch('https://randomuser.me/api/?results=12&inc=name,picture,email,location&noinfo&nat=us')
                     .then( response => response.json() )
                     .then( data => createDirectory(data.results));

// create the employee directory gallery
const createDirectory = (employees) => {
    console.log(employees);
    function createElement(element, className) {
        const newElement = document.createElement(element);
        newElement.className = className;
        return newElement;
    };
    
    for (let employee of employees ) {
        const card = createElement('div', 'card');
        const imgContainer = createElement('div', 'card-img-container');
        const img = createElement('img', 'card-img');
        const infoContainer = createElement('div', 'card-info-container');
        const name = createElement('h3', 'card-name cap');
        const email = createElement('p', 'card-text');
        const location = createElement('p', 'card-text cap');

        img.setAttribute('alt', 'profile picture');
        img.setAttribute('src', employee.picture.large);
        name.textContent = `${employee.name.first} ${employee.name.last}`;
        email.textContent = `${employee.email}`;
        location.textContent = `${employee.location.city}, ${employee.location.state}`;
        
        imgContainer.appendChild(img);
        infoContainer.appendChild(name);
        infoContainer.appendChild(email);
        infoContainer.appendChild(location);
        card.appendChild(imgContainer);
        card.appendChild(infoContainer);
        gallery.appendChild(card);
    }
    
};
