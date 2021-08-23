const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signInErrors,signUpErrors } = require('../utils/errors.utils');
//const { model } = require('mongoose');


const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

/*module.exports.signUp = async (req, res) =>  {
  const { pseudo, email, password} = req.body
  try {
      const newUser = new UserModel({ pseudo, email, password})
      const existUser = await UserModel.findOne({ email })
      if (existUser) { return res.status(400).json({ msg: 'User already exist' }) }
      const hashedPassword = await bcrypt.hash(password, 10)
      newUser.password = hashedPassword
      const result = await newUser.save()
      res.json({ user:result, msg: "user added" })
  } catch (error) {
      res.status(500).json({ errors: error })
  }
}*/
module.exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body

  try {
    const user = await UserModel.create({pseudo, email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
}
/*module.exports.signIn = async (req, res) => {
  const { email, password } = req.body
  try {
      const searchUser = await UserModel.findOne({ email })
      if (!searchUser) { return res.status(400).json({ msg: "bad credential" }) }
      const isMatch = await bcrypt.compare(password, searchUser.password)

      if (!isMatch) { return res.status(400).json({ msg: "bad credential" }) }
      const payload = {
          id: searchUser._id,
          pseudo: searchUser.pseudo,
          email: searchUser.email
      }
      console.log(payload)
      const user= await UserModel.findOne({ email }).select('-password')
      jwt.sign(payload, process.env.TOKEN_SECRET, function (err, token) {
          if (err) throw err;
          res.json({ token: `Bearer ${token}`,user:user_id })
      });
  }

  catch (error) {
      res.status(500).json({ errors: error })
  }
}
*/


module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}
module.exports.current = (req,res)=>{
  console.log(req.UserModel)
  try {
      res.send({user:req.UserModel})
  } catch (error) {
      res.status(500).json({errors:error})
  }
}

/*module.exports.authRole (role) =(req,res,next)=>{
  if(req.body.role !==role){res.staus(401)
    return res.send('not allowed')
  }
  next()

  }*/