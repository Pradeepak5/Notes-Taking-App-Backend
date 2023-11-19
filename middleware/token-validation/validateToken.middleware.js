const jwt = require('jsonwebtoken');

const secretKey = 'pradeepguviproject';

const validateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send({ message: 'Access denied. Token not provided.' });
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
    console.log(decoded);
    if(req.params.id == decoded.id){
        next();
    }else{
        return res.status(401).send({message: "Unauthorized User Found"});
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({ message: 'Invalid token.' });
  }
};

module.exports = {validateToken};