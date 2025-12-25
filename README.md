# Users Data Rest Api

A simple Rest API of dummy users' data.

## Features:
1. Two versions:
1.1 v1 endpoint: "http://localhost:3000/api/users/v1/[userId]"
1.2 v2 endpoint: "http://localhost:3000/api/users/v2?userId=[userId]"
2. Four request methods: GET, POST, PUT and DELETE
3. Caching with HTTP
4. MVC (no views) structure
5. Database driver: mysql

## usage

1. remove trailing ".example" from the env file

2. Fill the database credentials

3. Run the shema.sql script to create database

4. Run:

```bash 
npm run dev 
```
or:

```bash 
npm run build 
```

5. Use one of the endpoints:

 - v1 endpoints: 

    - GET :
        - http://localhost:3000/api/users/v1
        - http://localhost:3000/api/users/v1/[userId]
    
    - POST : http://localhost:3000/api/users/v1

    - PUT : http://localhost:3000/api/users/v1/[userId]
    
    - DELETE : http://localhost:3000/api/users/v1/[userId]

    

 - v2 endpoints: "http://localhost:3000/api/users/v2?userId=[userId]"

    - GET :
        - http://localhost:3000/api/users/v2
        - http://localhost:3000/api/users/v2?userId=[userId]
    
    - POST : http://localhost:3000/api/users/v2

    - PUT : http://localhost:3000/api/users/v2?userId=[userId]

    - DELETE : http://localhost:3000/api/users/v2?userId=[userId]

6. Done