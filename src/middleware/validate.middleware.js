import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    //Obtener Token
    const token = req.headers.authorization || '';
    console.log(token);

    //Verficar si no hay un token
    if(!token){
        return res.status(401).json({ message: 'No token, Authorization Denied' });
    }
    try {
        //Verficar el Token 
        const decoded = jwt.verify(token, 'PFfZJKcD1PwsqLhntEA7m4eV9io6g3fy');

        //Agregar al usuario desde el token verificado 
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

export default authMiddleware;