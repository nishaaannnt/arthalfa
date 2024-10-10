const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

  return next();
  // the below can be used to verify the bearer token and authorize user
  // not in the scope but still implemented it
  // currently we are skipping it :)
  let bearerToken =  req.headers['authorization']  || req.cookies?.token;
  const token = bearerToken.replace('Bearer ', '');
  console.log(req.headers);
  if (!token) {
    return res.status(401).json({message:"No Token provided"});
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; 
    next(); 
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


module.exports = { authMiddleware };
