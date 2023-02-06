# Argon2 issue in AdonisJS

This repository contains a minimal example of an issue with argon2 hashing algorithm in AdonisJS. The issue is related to the incorrect handling of argon2 algorithm in AdonisJS, leading to a failure in password hashing. 

## Running the example

1. Run the following command in the terminal to build and start the Docker containers: ```docker-compose up --build```

2. Open another terminal tab and attach to the AdonisJS container: ```npm run dockerAttach```

3. Run the migrations inside the AdonisJS container: ```node ace migration:run```

4. Make a POST request to `http://127.0.0.1:3333/api/users` with the following payload to create a user: 
```
{
      "name": "Example",
      "email": "example@mail.com",
      "password": "12345678",
      "password_confirmation": "12345678"
}
```

## Expected behavior

The password should be hashed using argon2 algorithm and the post request of a user should be successful.

## Observed behavior

The argon2 algorithm is not being applied correctly and the request fails.

The only output on terminal is: 
```
adonis_app  | [ warn ]  Underlying HTTP server died with "null code"
```




