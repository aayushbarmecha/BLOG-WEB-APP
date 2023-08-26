const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'asdfe45we45w345wegw345werjktjwertkj';
// const Post = require('./models/Post');
app.use(express.json());
mongoose.connect('mongodb+srv://barmecha99:h9TF6RWvTMz1q0hc@cluster100.bxxugoy.mongodb.net/?retryWrites=true&w=majority');
const salt = bcrypt.genSaltSync(10);


app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
      const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });  

app.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    const userDoc=await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    
    if (passOk) {
        // logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id:userDoc._id,
            username,
          });
        });
      } else {
        res.status(400).json('wrong credentials');
      }
});

app.listen(3000);