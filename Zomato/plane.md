# Backend 
1. user -> food reel ,  view food items. 
2. food patners -> list food items. 

**step1** => it this first we have to init the project. 
**step2** => then we will create a server that we  will going to create with express -> ```npm i express```

**step3** => next after we have created server and also checked and started now **we have to create and connect the db**
install --> ```npm i mongoose```
create a fonder and file for db. 

**step4** => creating the routs for auth for the user. 

**step5** => we dont create that call back function while creating api (req , res) => {} , we create this in diff file --> **controller** folder inside  file  **auth.controller.js**  --> We move the (req, res) => {} logic into a controller file to keep the code clean, simple, and organized.


**step6** => now for the user auth we will have a need to user models so we will create a folder models. 


going with folder structure-> 

backend |
        |
        scr |
        |   |--- app.js --> we will create server.  // we have already study how to work with app.js and express here.
        |   |
        |   |--- db |
        |   |       |-- db.js --> //we will connect the db here. 
        |   |
        |   |--- routes |
        |   |           |-- auth.routes.js --> //to create the user auth
        |   |
        |   |--- controller |
        |   |               |--auth.controller.js --> //step5 instructions
        |   |
        |   |--- models |
        |   |           |--user.js
        |
        server.js --> we will start the server here. 
        |
        |
        .env
