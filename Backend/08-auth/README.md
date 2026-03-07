# Authentication and Authorization 

## Authentication
Authentication = verifying who the user is.

**Example**
Login with email + password
Login with Google
Login with OTP
Login with fingerprint / face ID

**Example flow:**
User enters email + password
        ↓
Server checks database
        ↓
If correct → user is authenticated


## Authorization (AuthZ)
Authorization = deciding what the user is allowed to do.

**Example roles:**
User Type	Access
Admin	Delete users
Editor	Edit content
User	Only view content


## Bcrypt
bcrypt is a library used to securely hash passwords before storing them in the database.

**Installations**
```npm i bcrypt ```

**incrypt**

```
app.get('/' , ((req , res) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("gaurav", salt, function(err, hash) {
            console.log(hash);
        });
    });
}))

```

**dcrypt**
```
app.get('/dn' , ((req , res) => {
    bcrypt.compare("gaurav", "$2b$10$CPbq0WAeLFz69ZC13aOfiO/hu4PqcgKuQJ3gn0Y31i3X0OwP1Zn.C", function(err, result) {
        console.log(result);
        
    });
}))
```

## JWT 
JWT (JSON Web Token) is a method used to verify that a user is logged in after authentication.

It is a secure token that the server creates and sends to the client after login. The client sends that token with future requests to prove identity.

create and consist of : Header + Payload + Secret Key --> we need mostly payload.(user  data. )

**installation**

```npm i JsonWebToken```
