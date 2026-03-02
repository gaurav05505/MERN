# Express js 
Express.js is a "Minimalist Web Framework" for Node.js.

If Node.js is the engine of a car, Express.js is the dashboard, steering wheel, and pedals. It doesn't change how the engine works, but it makes it a thousand times easier for you to drive.

managing everything from recving the request to giving the response 


### install

``` npm i express ``` 

**code**

```
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

```
## Routs 
From a first principles perspective, a Route is a specific URL path combined with a specific HTTP method (GET, POST, etc.) that tells the server: "When a user asks for THIS, run THIS code."

1. gaurav.com/ --> / is the route. 
2. gaurav.com/profile --> /profile is the route. 


The Method: The action (GET, POST, PUT, DELETE).

The Path: The URL address (e.g., /profile, /login).

The Handler: The function that contains the logic (the code that actually does the work).

---

--> we have to restart the server all the time we will make changes it should we any changes small big etc etc so that's why we use nodemon it auto restart the server if any changes made. 

``` npm i nodemon ``` 

<!-- run  -->
**nodemon script.js** 

or if not work 
**npx nodemon script.js**

--- 

## Middleware
In the world of Express.js, Middleware is the "In-between" logic.

If you think of the Request (user asking for something) and the Response (you giving it back) as two ends of a tunnel, Middleware is everything that happens inside the tunnel before the request reaches its final destination.


your device ---request --> **middleware** --> server --back to --> your device

### use (code) 

```
app.use(function(req , res , next){
    //maddleware work 
    next(); 
})

```
## Error Handling 
In First Principles, Error Handling is the "Safety Net" of your backend. If you don't handle errors, one single mistake (like a user typing a wrong ID) will crash your entire server for everyone.

In Express, Error Handling is actually just a special type of Middleware.


1. The "Big Three" Error Types
In a real backend, you usually face these three:

Syntax Errors: You made a typo in your code (The server won't even start).

Operational Errors: Things that might go wrong (Database is down, File not found).

Programmatic Errors: Bugs you created (Trying to map over something that is undefined).

```
app.get('/profile/:id', (req, res, next) => {
  try {
    // Let's pretend the database failed
    throw new Error("Database connection lost!"); 
  } catch (err) {
    next(err); // This sends the error to the Safety Net
  }
});

```