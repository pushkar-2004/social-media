const jwt = require('jsonwebtoken');
const { error } = require('../utils/responseWrapper');

module.exports = async (req,res,next) => {
    if(
        !req.headers ||
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
    ){
        // return res.status(401).send('Authorization header is required');
        return res.status(error(401,"Authentication error is required"));
    }
    const accessToken = req.headers.authorization.split(" ")[1];

    console.log(accessToken);

    try{
        const decoded = jwt.verify(
            accessToken, 
            process.end.ACCESS_TOKEN_PRIVATE_KEY);
            req._id = decoded._id
            next();
    }catch(error){
        console.log(error);
        // return res.status(401).send("invalid access key");
        return res.status(error(401,'invalid access key'));
    }

    next();
}