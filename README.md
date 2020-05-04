# WePower Energy Price Calculator Demo Project - Front End module
Web Client implemented using React v16.13.x and ES6. It is used to call a web service located on the following address:

http://localhost:8080/api/wepower/calculateprice (if backend is not deployed on Docker)  or

http://localhost:8081/api/wepower/calculateprice  (when back-end is deployed on Docker locally)

Every call to the backend adds a new record to the history table and if error is detected a pop-up is displayed.
Otherwise, returned results are displayed below the submit button.
The submit button is not active if the end date is before the start date.
In order to run it locally via terminal:  "npm run start"

# Prerequisites
Make sure you have Docker installed and it is using Linux containers

1. In the project's root directory run the following command:
"docker build -t wepower-react-app:latest ."
It will build the project and will install an image in Docker

2. Run the following command in PowerShell:
"docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true wepower-react-app:latest" . 
It will start the image and you can open it in browser: http://localhost:3000




