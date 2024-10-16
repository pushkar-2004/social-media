const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {error, success} = require("../utils/responseWrapper");

const signupController = async (req, res) => {
  try {
    // res.send('from signup');
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(400).send("All fiels are required");
      return res.send(error(400,'All fiels are required'));
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      // return res.status(409).send("User is already registered");
      return res.send(error(409,'User is already registered'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });
    
    // return res.status(201).json({
    //   user
    // });
    return res.send(
      success(201,{
      user,
    }));
  } catch (error) {}
};

//this api will check the refreshToken validity and generate a new access toekn
const refreshAccessTokenroller = async(req,res) => {
  // const {refreshToken} = req.body;
  const cookies = req.cookies;
  if(!cookies.jwt){
    // return res.status(401).send("Refresh token is required");
    return res.status(error(401,'refresh token is required'));
  }

  const refreshToken = cookies.jwt;

  // if(!refreshToken){
  //   return res.status(401).send("Refresh token is required");
  // }
  try{
      const decoded = jwt.verify(
          refreshToken, 
          process.end.REFRESH_TOKEN_PRIVATE_KEY
        );
        const id = decoded._id;
        const accessToken = generateAccessToken({_id});
        // return res.status(201).json({accessToken});
        return res.status(success(201,{accessToken}));
        
  }catch(error){
      console.log(error);
      return res.status(401).send("invalid refresh token key");
      // return res.status(error(401,'invalid refresh token key'));
  }
}

//internal function
const generateAccessToken = (data) => {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "15m",
  });
  // console.log(token);
  return token;
};

const generateRefreshToken = (data) => {
  const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: "1y",
  });
  console.log(token);
  return token;
};

const loginController = async (req, res) => {
  try {
    // res.send('from login');
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(400).send("All fiels are required");
      return res.send(error(400,'All fiels are required'));
    }

    const user = await User.findOne({ email });

    if (!user) {
      // return res.status(404).send("User is not registered");
      return res.send(error(404,'User is not registered'));
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      // return res.status(403).send("incorrect password");
      return res.status(error(403,'Incorrect password'));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });

    const refreshToken = generateRefreshToken({
      _id: user._id,
    });

    res.cookie('jwt',refreshToken,{
      httpOnly: true,
      secure:true
    })

    // return res.json({ accessToken });
    return res.send(success(200,{ accessToken }));
  } catch (error) {}
};

module.exports = {
  signupController,
  loginController,
  refreshAccessTokenroller,
};
