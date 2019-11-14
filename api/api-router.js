const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
    let user = req.body;
    console.log(user)
    //always validate data before sending to db
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
    console.log(`hash`, hash)
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  router.post('/login', (req, res) => {
    let { username, password } = req.body;
    
    Users.findBy({ username })
      .first()
      .then(user => {
          console.log('user', user)
        if (user && bcrypt.compareSync(password, user.password)) {
          //produce token
          const token = generateToken(user)
          console.log(`token`, token)
          //send token to client
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token //send token to client
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  function generateToken(user){
      let username = user.username
      console.log(`username`, username)
      
    const payload = {
        subject: user.id, //sub property in header
        username
        //additional data, do not include sensitve info
    }
   
    const secret = process.env.JWT_SECRET || "aslskek34l4kfnad"
    const options = {
        expiresIn : '8h'
    }
    console.log(`payload`, payload, secret, options)
    return jwt.sign(payload, secret, options)
  }
  
  module.exports = router;
  