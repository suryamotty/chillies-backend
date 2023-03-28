const express = require('express')
const cors= require('cors')
const logic= require('./services/logic')
const { body, validationResult } = require('express-validator');


const app= express()


app.use(cors({
    origin:'http://localhost:3000'
}))

app.use(express.json())


app.listen(8000,()=>{
    console.log(`app is listening on port 8000`);
})


//get all users
app.get('/get-all-users',(req,res)=>{
    logic.getusers().then(
        (result)=>{
            res.status(result.statusCode).json(result)
        })
})
//add new user
app.post('/add-user',
body('email').isEmail(),
body('password','minimum length of password should be 5').isLength({ min: 5 }),
(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    logic.adduser(req.body.name,req.body.email,req.body.password,req.body.location,req.body.date).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//login api call
app.post('/login', (req,res)=>{
    console.log("inside login api");
    console.log(req.body);
    logic.login(req.body.email,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
   
})
