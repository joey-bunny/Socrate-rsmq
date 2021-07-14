# Socrates API
This application allows you to register, login, perform CRUD actions on courses, and delete account.

# Setup the app
### Setup and start the user service
1. Enter the user folder in the application root folder and run ```npm install```.
2. Create a .env file in the root directory, copy the content of the .env.example file into the .env file, and update the following options with your credentials
	* MYSQL_USER
	* MYSQL_PASSWORD
3. Run ```node ace serve``` to start the service

### Setup and start the course service
1. Enter the course folder in the application root folder and run ```npm install```.
2. Create a .env file in the root directory, copy the content of the .env.example file into the .env file, and update the following options with your credentials
	* MYSQL_USER
	* MYSQL_PASSWORD
3. Run ```node ace serve``` to start the service

### Setup and start the gateway service
1. Enter the course folder in the application root folder and run ```npm install```.
2. Create a .env file in the root directory, copy the content of the .env.example file into the .env file
3. Run ```node ace serve``` to start the service

### Setup and start auth service
1. Enter the auth folder in the application root folder and run ```npm install```.
2. Create a .env file in the root directory, copy the content of the .env.example file into the .env file
3. Run ```node ace serve``` to start the service

# App features
* Create a user account with role as admin or lecturer or student
* Login user
* Delete a user
* Create a course
* Fetch a course
* Update a course
* Delete a course

# Token management
Jwt was used for token

# steps to run test
1. Enter the gateway folder and in the root directory run the command ```node -r @adonisjs/assembler/build/register japaFile.ts```

## Postman api documentation
[Postman documentation](https://documenter.getpostman.com/view/10415712/Tzm9kFFM)