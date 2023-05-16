const { User } = require("./modal")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const checkCredentials = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userDetails = await User.findOne({ where: { email } });
        if (userDetails == null) res.send(" Invalid email");
        const isValid = await bcrypt.compare(password, userDetails.password);
        if (isValid) next();
        else res.send("please check email or password")
    } catch (error) {
        console.error(error);
    }
}

const validateSession = async (req, res, next) => {
    try {
        if (req.cookies.test !== undefined) {
            const veri = await jwt.verify(req.cookies.test, "secret-key");
            const user = await User.findOne({ where: { email: veri.email } })
            if (veri.id == user.user_id) next();
            else res.send("invalid session")
            next()
        }
        else res.send("please login to access the home page")
    } catch (error) {
        if(error.message === "invalid token" || error.message === "jwt expired")
            res.send("please login to access the home page")
        else 
            res.send("internal error")
    }
}


module.exports = { checkCredentials, validateSession }