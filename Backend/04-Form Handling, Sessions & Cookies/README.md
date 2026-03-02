# Cookie
In the world of backend development, a Cookie is a small piece of data that a Server sends to a User's Browser. The browser stores this data and sends it back to the server every time the user makes a new request.


1. Why do we need Cookies? (The Problem)
From a first principles perspective, HTTP is Stateless.

This means the server has a "memory of a goldfish."

When you click from the "Home" page to the "Profile" page, the server has already forgotten that you just logged in 5 seconds ago.

The Solution: The server gives you a cookie. Now, every time you move to a new page, your browser shows that cookie to the server, saying, "Hey, it's me again! Here is my ID."


2. How it works (The 3-Step Process)
The Handover: You login. The server checks your password and sends a response with a header: Set-Cookie: sessionID=12345.

The Storage: Your browser sees this header and saves the text sessionID=12345 in a small file on your hard drive.

The Reminder: The next time you click any link on that website, the browser automatically attaches Cookie: sessionID=12345 to the request. The server reads it and says, "Ah, welcome back, User 12345!"


### cookie-parser

``` npm i cookie-parser ```
**You can visit npm store it will be there!!**

---

# Session
In general English and web browsing, a session is simply the period of time you are active on a website.

It starts when you open the site.
It ends when you close the tab or log out.