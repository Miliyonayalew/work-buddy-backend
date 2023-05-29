const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// Signup
userSchema.statics.signup = async function (full_name, email, password) {
  
  //Validation
  if(!full_name) {
    throw Error('Full Name is required')
  }
  if(!email || !password) {
    throw Error('Email and Password are required')
  }
  if(!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if(!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough')
  }

  const exist = await this.findOne({email})

  if(exist) {
    throw Error('Email already exist')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({full_name, email, password: hash})

  return user
}

//login
userSchema.statics.login = async function(email, password) {
  if(!email || !password) {
    throw Error('Email and Password are required')
  }

  const user = await this.findOne({email})

  if(!user) {
    throw Error('Invalid Email')
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match){
    throw Error('Incorrect Password')
  }

  return user
}
module.exports = mongoose.model('User', userSchema)