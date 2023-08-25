# RevoU Week 10 Assignment

Creates bank transfer application using authentication middleware, service, and DAO.

## Assignment Information

1. Back-end is written using Typescript, ExpressJS, and NodeJS, with MongoDB as NoSQL.

2. 

## Advanced Information - Back-End

1. There's no Authentication, so you can use it as is.

2. If user accessed invalid API Endpoint, it will be blocked and instead return HTTP 404.

3. After any query, database connection is closed using mysql.end() function.

4. Back-end will check if data exist on Redis before querying to the MySQL Database.
   
   1. If data exist, then it returns data obtained from Redis.
   
   2. Else, it will query from MySQL, save it to Redis, and returns data.
   
   3. Redis data will persist for 1 minute.

5. When connection successfully established, it will be shown on Console.

## API Endpoint

All of API Endpoint can be seen at : [Swagger Documentation](https://adriantori-w9-be.up.railway.app/)

## Deploy Link

Back-end: https://adriantori-w10-be.up.railway.app/
