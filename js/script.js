let employees;

// fetch the employees from the Random User Generator API
fetch('https://randomuser.me/api/?results=12&inc=name,picture,email,location&noinfo')
                     .then(response => response.json())
                     .then(data =>  employees = data.results);