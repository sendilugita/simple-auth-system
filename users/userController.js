const User = require('./userModel')
const jwt = require('jsonwebtoken')
const {
 compareSync
} = require('bcryptjs')

exports.login = async(req,res) => {
 let { username,password } = req.body
 let user = await User.findOne({
  username:username
 })
 if(!user) {
  return res.json({
   success:false,
   msg:'user not found'
  })
 }
 if(!compareSync(password,user.password)) {
  return res.json({
   success:false,
   msg:'wrong password'
  })
 }
 jwt.sign({
  user:username
 }, process.env.SECRET, {expiresIn:60},
 (err,token) => {
  if(err) {
   return res.status(500).end()
  }
  res.set('Auth',token)
  return res.json({
   success:true,
   msg:'user found'
  })
 })
}

exports.register = async(req,res) => {
 let { username,password } = req.body
 let user = await User.findOne({
  username:username
 })
 if(user) {
  return res.json({
   success:false,
   msg:'user exists'
  })
 }
 try {
  let addUser = await User.create(req.body)
  jwt.sign({
   user:username
  }, process.env.SECRET, {expiresIn:60},
  (err,token) => {
   if(err) {
    return res.status(500).end()
   }
   res.set('Auth',token)
   return res.json({
    success:true,
    msg:'register success'
   })
  })
 } catch(e) {
  return res.json({
   success:false,
   msg:'register failed'
  })
 }
}