# Awesome Startup Employee Directory

The Awesome Startup Employee Directory generates a directory of random employees by making a public api request to http://randomuser.me.

The number of employees generated can be changed by updating the numOfRecords variable at the beginning of js/script.js.

After fetching the random employee data, the resolved promise will parse the JSON, format the phone number and date of birth, and then call the createDirectory function.

The createDirectory function iterates through the employee list and creates an information card for each employee. Information included:
* image
* name
* email
* city

Clicking on an employee's information "card" will open a modal window with more detailed information that includes:
* image
* name
* email
* city
* cell
* full address
* date of birth

The modal window had previous and next buttons that allows one to move through each of the employees shown on the page. Clicking the "X" button closes the modal window.

Entering a value in the search form will filter the names matching the entered value.

The background and header color have been updated in the stylesheet.