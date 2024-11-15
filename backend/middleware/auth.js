

// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//   const authHeader = req.header('Authorization');
//   console.log('Authorization Header:', authHeader);

//   if (!authHeader) return res.status(401).send('Access Denied');

//   const token = authHeader.split(' ')[1]; // Extract token after Bearer


//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = verified; // Attach user payload to request
//     next();
//   } catch (err) {

//     res.status(400).send('Invalid Token');
//   }
// };

  

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');
//   console.log('Authorization Header:', authHeader);

  if (!authHeader) return res.status(401).send('Access Denied');

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer"
//   console.log('Extracted Token:', token);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Verified Payload:', verified);

    req.user = verified; // Attach user payload to request
    next();
  } catch (err) {
    console.error('Token Verification Error:', err.message);
    res.status(400).send('Invalid Token');
  }
};
