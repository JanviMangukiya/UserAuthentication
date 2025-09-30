const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const Role = require('../models/roleModel');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    try {
        const { firstName, lastName, birthDate, email, contact, password, role } = req.body;
        
        const hash_password = await bcrypt.hash(password, 10);

        const existingEmail = await User.findOne({ email });
        if(existingEmail) {
            return res.json({message: "Email is Already Register"});
        }

        const existingContact = await User.findOne({ contact });
        if(existingContact) {
            return res.json({message: "Contact is Already Register"});
        }


        const roles = await Role.findOne({ roleName: role });
        if (!roles) {
            return res.status(400).json({message: "Invalid role specified. User not created."});
        }
        const user = await User.create({
            firstName, 
            lastName, 
            birthDate, 
            email, 
            contact,
            password: hash_password,
            role: roles.id
        });
        return res.json({message: "User Registered Successfully"});
    } catch (error) {
        return res.json({message: "Error in Registration", error});
    }
}

const login = async(req, res) => {
   try {
        const { userName, password } = req.body;
        const user = await User.findOne({ 
            $or: [
                { email: userName },
                { contact: userName}
            ]
         });
    if(!user) {
        return res.json({message: "User is not Registered"});
    }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({message: "Invalid Password"});
        }
        const token = jwt.sign(
            { id: user._id, role: user.role.toString() }, 
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        return res.json({message: "Login Successful", token});
   } catch (error) {
    return res.json({message: "Error in Login", error});
   }
}

const createRole = async (req, res) => {
    const { roleName } = req.body;
    const allow = [];
    try {
        const newRole = await Role.create({ roleName });
        console.log(newRole);
        return res.json(newRole);
    } catch (error) {
        if(!allow.includes(roleName)) {
            return res.json({message: "Invalid Rolename"})
        }
        res.json({message: "Error in Creating Role", error});
    }
}


module.exports = { register, login, createRole };