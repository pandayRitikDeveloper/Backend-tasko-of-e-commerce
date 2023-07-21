const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const token =req.headers.accesstoken;
  //console.log(req.headers.accesstoken)
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, 'this is dumy text');
    req.user=decoded;
   // console.log(req.user)
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = verifyToken;