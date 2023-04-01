import { objAdminOnly } from "../app/models/objAdminOnly.js";

const authenticateAdmin = (req, res, next) => {
    if(req.role === 'admin') {
        return next();
    }
    res.status(400).json(objAdminOnly);
}

export default authenticateAdmin;