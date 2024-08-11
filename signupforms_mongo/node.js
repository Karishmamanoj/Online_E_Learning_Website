const express=require('express');
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const path=require('path');
app.set('view engine','ejs');


mongoose.connect('mongodb://127.0.0.1:27017/studentdb', { useNewUrlParser: true });
const compSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Phone: Number,
  Course: String,
  Gender: String
});


const Employee = mongoose.model("students", compSchema);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/formex1', async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phoneno; 
  const course = req.body.course;
  const gender = req.body.gender;
  
  try {
    const result = await students.insertMany({ Name : name, Email: email,Phone: phone, Course: course , Gender: gender});
    if (result) {
    res.render('displaydetails',{ Name : name , Email: email,Phone: phone, Course: course , gender: gender});
    } else {
    res.render('login');
    }
  }catch (err) {
    console.log(err);
    res.send("Error occurred");
  }
});

app.post('/updatephone', async function (req, res) {
  const name = req.body.name;
  const phone = req.body.phoneno; 
  try {
    const result = await students.findOneAndUpdate({ Name: name }, { Phone: phone });
  if (result) {
    res.send("<h3>Phone number updated for "+name+"</h3>");
    } else {
    res.send('Not updated');
    }
  }catch (err) {
    console.log(err);
    res.send("Error occurred");
  }
});


app.get("/", function (req, res) {
res.render('login');
});

app.listen(3000, function () {
console.log("server started at 3000");
}); 

app.listen(3000);
