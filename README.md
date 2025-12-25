# Users Data Rest Api

A simple Rest API of dummy users' data.

## Features:
1. Two versions:
1.1 v1 endpoint: "http://localhost:3000/api/users/v1/[userId]"
1.2 v2 endpoint: "http://localhost:3000/api/users/v2?userId=[userId]"
2. Caching with HTTP
3. MVC (no views) structure
4. Database driver: mysql

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

5. Use either of the endpoints:

 - v1 endpoint: "http://localhost:3000/api/users/v1/[userId]"
 - v2 endpoint: "http://localhost:3000/api/users/v2?userId=[userId]"

6. Done