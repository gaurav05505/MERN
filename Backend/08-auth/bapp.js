const express = require('express'); 
const app = express(); 
const bcrypt = require('bcrypt'); 

app.get('/in' , ((req , res) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("gaurav", salt, function(err, hash) {
            console.log(hash);
        });
    });
}))

app.get('/' , ((req , res) => {
    res.send("work")
}))

app.get('/dn' , ((req , res) => {
    bcrypt.compare("gaurav", "$2b$10$CPbq0WAeLFz69ZC13aOfiO/hu4PqcgKuQJ3gn0Y31i3X0OwP1Zn.C", function(err, result) {
        console.log(result);
        
    });
}))


app.listen(3000 , () =>{
    console.log('Server is running on http://localhost:3000');
})