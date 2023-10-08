const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
 username: {
  type: String,
  required: true
 },
 password: {
  type: String,
  required: true
 }
})

userSchema.pre('save', async function(next) {
 let user = this
 let salt = await bcrypt.genSalt(10)
 user.password = await bcrypt.hash(user.password, salt)
 next()
})

module.exports = User = mongoose.model('User', userSchema)