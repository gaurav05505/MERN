// go to Node.js doc and read understand from there 

const fs = require('fs');


// this will create a new file with the name i have give (in my case its checkPrime.txt) and write the content i have given 
// fs.writeFile("Check.txt" , "Hey im checking this work or not!! " , function(err){
//     if(err) console.error(err);
//     else console.log("done");
    
// })



// fs.appendFile("Check.txt" , " good learning backend !" , function(err){
//     if(err) console.error(err);
//     else console.log("done");
    
// })




// fs.rename("Check.txt" , "file.txt" , ((err) => {
//     if(err) console.error(err); 
//     else console.log("done"); 
// }))



// fs.copyFile("file.txt" , './copy/check.txt' , ((err) => {
//     if(err) console.log(err);
//     else console.log("done");
// }))



// fs.unlink("file.txt" , ((err) =>{
//     if(err) console.log(err.message);
//     else console.log("removed");
// }))



// fs.rmdir("./copy" , {recursive: true} ,  ((err) => {
//     if(err) console.log(err.message);
//     else console.log("removed");    
    
// }))




// fs.rm("./copy" , {recursive: true} ,  ((err) => {
//     if(err) console.log(err.message);
//     else console.log("removed");    
    
// }))



// fs.readFile("Check.txt" , "utf8" ,  ((err , data ) => {
//     if(err) console.log(err.message);
//     else console.log(data);
// }))