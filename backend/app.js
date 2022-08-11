//Start filling this out once you finished with classes.js

const express = require("express");  //Importing express (how we will host our backend)
const cors = require("cors");  //Import cors (allows us to talk to backend easily)
const bodyParser = require("body-parser");
const axios = require("axios"); //import axios for talking to APIs

// New app using express module
const app = express();

const url = "https://randomuser.me/api/";

//Setting up our app
app.use(cors());  //Starting our app using cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var serviceAccount = require("../key/PATHTOKEY")
var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


// Creating a global user
let users;
// Getting our Users class and formatDBReturn function from our classes.js
let {Users, formatDBReturn} = require("./classes");

// Function that sees if our user is defined
function checkUserDef(){
    return users == null ? false : true;
}

app.get('/', function (req,res){
    res.send("Hello World!")
})

// Example of a post to our backend app
// axios.post("http://127.0.0.1:3000/dummyExmaple", {"key" : "value"});

// TODO 4
// req -> User sending my app the post request's data
// res -> How we handle a response
app.post("/loadUsers", async function (req, res){
    if(!checkUserDef()){
        console.log("Loading Users");
        // In here you want to give our users variable a new Users object!
        // Make sure to give our db when calling new Users()
        // new Users(db);
        // Return a formatDBReturn(true) :)
        // Use res.send() to send data
    }
    else{
        res.send(formatDBReturn(false));
    }
})

// TODO 5
app.post("/deleteUsers", function (req, res) {
    if(checkUserDef()){
        console.log("Deleting Users");
        // Get the amount from the req.body json and call the users.deleteUsers() function!
        // Make sure to save what the function returns and res.send() it :)
    }
    else{
        res.send(formatDBReturn("Error: Undefined users, please post to /loadUsers first!"));
    }
})

// TODO 6
app.post("/getExistingUsers", function (req,res){
    if(checkUserDef()){
        console.log("Getting Existing Users");
        // Get the amount from the req.body json and call the users.getUsers() function!
        // Make sure to save what the function returns and res.send() it :)

    }
    else{
        res.send(formatDBReturn("Error: Undefined users, please post to /loadUsers first!"))
    }
})

// TODO 7
app.post("/getAmount", function (req,res){
    if(checkUserDef()){
        console.log("Getting Amount");
        // Save the users.usersAmount as a variable and send it through res.send()
        // Make sure to format your data as {"amount":amount} in formatDBReturn()
    }
    else{
        res.send(formatDBReturn("Error: Undefined users, please post to /loadUsers first!"))
    }
})


// TODO 8
// Here we use axios, similar to fetch !
// Here you will avoid .then() through async functions!
// We can save the response as a promise variable like so:
// let response = await axios.get(url);  //only works in async functions
// then we can do whatever we want with the response of this GET call to the api
app.post("/getNewUsers", async function (req, res) {
    if(checkUserDef()){
        console.log("Getting New Users");
        // Get the amount from the req.body json
        // Use axios.get() with our url and make sure to add (url)?results=(YOUR AMOUNT VARIABLE HERE) in the get()
        // Use the users.generateUsers() function with parameter of response.data 
        // Make sure to save the return of the above function call and send it with res.send()
    }else{
        res.send(formatDBReturn("Error: Undefined users, please post to /loadUsers first!"))
    }

})



app.listen(3000, function () {
    console.log("server is running on port 3000");
})