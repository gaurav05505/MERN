import express from 'express'

const app = express()

app.use(function(req , res , next){
    console.log("working");
    next(); 
})

app.get('/', (req, res) => {
  res.send('This is a website')
})

app.get('/profile', (req, res) => {
  res.send('Im gaurav')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})