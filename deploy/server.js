const express=require('express');
const connectDB=require("./config/db");


const app=express();


connectDB();

app.use(express.json({extented:false}));

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))

app.get('/',(req,res)=>{
    res.redirect('/login');
    // res.send("API running")
});

const PORT=process.env.PORT || 5000;

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
});