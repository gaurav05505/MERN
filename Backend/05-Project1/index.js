import express from 'express'; 
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express(); 


// to parser the data  
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 

// frontend part  
app.use(express.static(path.join(__dirname , 'public'))); 
app.set('view engine' , 'ejs'); 

// creating the routes
app.get('/' , ((req , res , next) => {
    res.render("index"); 
}))  

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})