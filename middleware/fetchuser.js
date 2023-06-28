const jwt = require('jsonwebtoken');
const JWT_SECRET = '$agar1';

const fetchuser =(req, res, next)=>{

    const token = req.header('auth-token');
    if(!token){
        res.error(401).send("Invalid request");
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
    } catch (error) {
        res.send(401)
    }
   




}