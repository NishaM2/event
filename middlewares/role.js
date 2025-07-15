
const roleMiddleware = (allowedRoles) => {
    return async (req, res, next) => {
        
    const role = req.user.role

        if(allowedRoles.includes(role)) {
            return next()
        } 
        return res.status(401).json({ message: "not allowed" })
    }
}

module.exports = roleMiddleware;