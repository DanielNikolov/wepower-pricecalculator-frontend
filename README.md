Web Client implemented using React and ES6. It is used to call a web service located on the following address:

http://localhost:8080/api/wepower/calculateprice (if backend is not deployed on Docker)  or

http://localhost:8081/api/wepower/calculateprice  (when back-end is deployed on Docker locally)

Every call to the backend adds a new record to the history table and if error is detected a pop-up is displayed.
Otherwise, returned results are displayed below the submit button.
The submit button is not active if the end date is before the start date.
In order to run it locally via terminal:  "npm run start"
