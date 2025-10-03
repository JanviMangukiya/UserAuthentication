const jwt = require('jsonwebtoken');
const Role = require('../models/roleModel');
const { errorHandle } = require('../helper/helper');

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7); 
    }
    
    if(!token) {
        return errorHandle('', res, "Token Not Found", 404, error.message);
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        req.user.role = decoded.role; 
        next();   
    } catch (error) {
        return errorHandle('', res, "Invalid Token", 422, error.message);
    }
}

function checkRole(allowRole) {
    return async (req, res, next) => {
        const { role } = req.user;
        let roleName;
        if (role && typeof role === 'string') {
            try {
                const roleDoc = await Role.findById(role);
                roleName = roleDoc.roleName;
            } catch (error) {
             return errorHandle('', res, "Somthing Wrong in Role", 500, error.message);   
            }
        } else {
            roleName = role;
        }
    
        if (!allowRole.includes(roleName)) {
            return errorHandle('', res, "You don't have Permission", 403, error.message);
        }
        next();
    }
}

module.exports = { verifyToken, checkRole };