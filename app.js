const express = require("express");
const {router} = require("./routes/router");
const bodyParser = require("body-parser");
const cors =  require("cors")
const {connectdb, db} = require("./db")
const app = express();


// connecting database
connectdb();

// adding configurations
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(router);

// starting the node server
app.listen(8000,()=>{
    console.log(`server started on 8000`);
})


