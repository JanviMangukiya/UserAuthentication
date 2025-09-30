const User = require("../models/userModel");

const emailValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/;
const numberValid = /^[0-9]{10}$/;

const validationRegister = ((req, res, next) => {
    const { firstName, lastName, birthDate, email, contact, password, role } = req.body;

    if(!firstName || !lastName || !birthDate || !email || !contact || !password || !role) {
        return res.json({ message: "All Fields are Required..." });
    }

    if(!emailValid.test(email)) {
        return res.json({ message: "Invalid Email" });
    }

    if(!numberValid.test(contact)) {
        return res.json({ message: "Invalid Mobile Number" });
    }

    if(password.length < 5) {
        return res.json({ message: "Password must be at least 5 in Length" })
    }

    next();
});

const validationLogin = ((req, res, next) => {
    const { userName, password } = req.body;
    if(!userName) {
        return res.json({message: "Email or Contact are Required..." });
    }

    if(!password) {
        return res.json({message: "Passowrd are Required..." });
    }

<<<<<<< HEAD
=======

>>>>>>> 27d7991dd0ccecd5a13bb1e4da0d4a952f1a82b7
    if(!emailValid.test(userName) && !numberValid.test(userName)) {
        return res.json({ message: "Invalid Email or Mobile Number" });
    }

    next();
});

module.exports = { validationRegister, validationLogin }