import express from 'express'; 
import Path  from 'path';
import { fileURLToPath } from 'url';

const app = express(); 
const fileName = fileURLToPath(import.meta.url); 
const __dirname = Path.dirname(fileName); 
 
// parse the data 
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// frontend usecase  
app.use(express.static(Path.join(__dirname , 'public')))
app.set('view engine' , 'ejs');



app.get('/' , ((req , res , next) => {

}))

app.listen(3000 , () => {
    console.log('Server is running on http://localhost:3000')
});