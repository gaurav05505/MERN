import express from 'express'; 
import Path  from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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
    fs.readdir('./files' , ((err , files) => {

        const allFiles = files.map((file) => {
            const content = fs.readFileSync(`./files/${file}`, 'utf-8');

            return {
                title: file.replace(".txt", ""),
                note: content
            };
        });

        res.render('index' , {files: allFiles}); 
    }))
}))


app.get('/file/:filename' , ((req , res , next) => {
    fs.readFile(`./files/${req.params.filename}.txt` , "utf-8" , ((err , filedata) => {
        const formattedData = filedata.replace(/\n/g, '<br>');
        res.render('show' , {title: req.params.filename , note: formattedData})
    }))
}))


app.post('/create' , ((req , res , next) => {
    fs.writeFile(`files/${req.body.title.split(" ").join("") || "untitled" }.txt` , req.body.note , ((err) =>{
        res.redirect('/')
    }))
}))

app.listen(3000 , () => {
    console.log('Server is running on http://localhost:3000')
});