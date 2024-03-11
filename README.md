Project Name: Data Sync

Frontend Technology Used: HTML and Basic CSS
Backend Technology Used: Nodejs and its libaries
Database: Firestore(noSQL DB)

Description:

    This Node.js web app enables us to create, read, update, and delete items with a user-friendly interface. Firebase provides real-time data storage, ensuring our entries are accessible from anywhere. New entries include data such as name, email and phone number.

Features:

    Create: Effortlessly add new entries.

    Read: View all your current entries in a clear and organized manner.

    Update: Modify existing entries items to reflect changing priorities.

    Delete: Remove completed tasks to keep your list streamlined.

    Appealing design: The application boasts a visually appealing interface to enhance your user experience.
    
How to run the file locally?

    Open package.json file from root folder and download the mentioned modules. After this step this our web app should work smoothly. 

**app.js is root file of our project, run it to execute my project**

**Start from our root endpoint /homepage**

Our main endpoints are:
    1) /login
    2) /signup
    3) /homepage

Other endpoints are: /userList, /editUser, /deleteUser

Steps to be followed:
1) Download the project or clone it
2) Install the libaries mentioned in package.json file of root folder
3) Follow this path "nodejs-Project/src/config/mydemodb-c3b5b-firebase-adminsdk-y7tm4-4f24d8dbe5.json" and update the data with your firebase credentials
4) Run with command nodemon app.js
5) Copy the link "http://localhost:3000/homepage", "http://localhost:3000/signup", "http://localhost:3000/login" in your browser to start our project

Thats it, Have a good day :)




