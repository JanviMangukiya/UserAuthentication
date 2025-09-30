const jwt = require('jsonwebtoken');
require('../models/userModel.js');
const Role = require('../models/roleModel');

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7); 
    }
    
    if(!token) {
        return res.json({message: "Token Not Found"});
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        req.user.role = decoded.role;
        
        next();   
    } catch (error) {
        res.json({message: "Invalid Token"});
    }
}

function checkRole(allowRole) {
    return async (req, res, next) => {
        const { role } = req.user;
        let roleName;
        if (role && typeof role === 'string') {
            const roleDoc = await Role.findById(role);
            roleName = roleDoc.roleName;
        } else {
            roleName = role;
        }
    
        if (!allowRole.includes(roleName)) {
            return res.json({message: "You don't have Permission"});
        }
        next();
    }
}

module.exports = { verifyToken, checkRole };