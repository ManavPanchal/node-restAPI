const express = require("express");
const router = express.Router()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const {checkCredentials, validateSession} = require("../middlewares");
const {User} =  require("../modal");
const { Op, Sequelize } = require("sequelize");

router.use(cookieParser())

router.post("/deleteAccount",checkCredentials, async(req,res)=>{
    const dbres = await User.destroy({where:{email:req.body.email}});
    console.log(dbres);
    res.send("successfully deleted");
})

router.post("/login",checkCredentials,async(req,res)=>{
    const user = await User.findOne({where:{email:req.body.email}})
    const token = await jwt.sign({id:user.user_id, email:user.email},"secret-key",{expiresIn: 60*2});
    res.cookie("test",token)
    res.send("loged in")
})

router.post("/createAccount",  async (req,res)=>{
    try {
        const {name, email, password} = req.body
        const [users,isCreated]= await User.findOrCreate({where:{email},defaults:{name,email, password}})
        if(isCreated) res.send("successfully added");
        else res.send("user already exits")
    } catch (error) {
        res.send("internal server error ")
    }
})

router.post("/updateAccount", checkCredentials ,async(req,res)=>{
    try {
        const {newpassword, email} = req.body;
        await User.update({password:newpassword},{where:{email}});
        res.send("email successfully updated");
    } catch (error) {
        console.log(error);
    }
});

router.get("/home", validateSession, async(req,res)=>{
    res.send("home")
})


router.get("/loggedData", async(req,res)=>{
    let {page,limit} = req.query;
    limit = limit || 3;
    const offset = (page-1)*limit || 0;
    const data =  await User.findAll({
        limit,
        offset, 
        attributes:["name",["email","userEmail"]]
    })
    res.send(data);
})

router.get("/findbyname",async(req,res)=>{
    const {name} = req.query;
    const data = await User.findAll(
        {
            where:{
                email:{
                    [Op.like]:`${name}%`
                }
            },
            attributes:{
                exclude:["password"]
            },
            group:["users.user_id"]
            
        });
    res.send(data)
})

module.exports = {router}



// let chunks = [];
//     req.on("data",(chunk)=>{
//         chunks.push(chunk)
//     })

//     req.on("end",()=>{
//         console.log(req.body);
//         const data = Buffer.concat(chunks).toString();
//         const stringData =  queryString.parse(data);
//         console.log(data);
//         res.send("form data received")
//     })