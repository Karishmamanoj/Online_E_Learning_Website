const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("connected to mongodb");
}).catch((err) => {
    console.log("Error occured", err);
});

const Schema=mongoose.Schema;

const detailsschema= Schema({
    name:String,
    email:String,
    phone:String,
    course:String,
    gender:String
});

var details=mongoose.model("detailsdata",detailsschema);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/",async(req,res)=>{
    const detailsdata=new details({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.number,
        course:req.body.courses,
        gender:req.body.gender,
    });
    await detailsdata.save();
    console.log("Data saved");
    res.sendFile(__dirname+"/thankyou.html");
});


app.listen(3000,(req,res)=>{
    console.log("Server running at port 3000!");
});