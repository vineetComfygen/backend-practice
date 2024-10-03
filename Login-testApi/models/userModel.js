const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

//Hash password before saving 
userSchema.pre('save' ,async function (next) {
  if(!this.isModified('password')) return next() ;
  this.password = await bcrypt.hash(this.password, 10);  // this mean i will hash it 10 times before saving it in the database
  next();
 });


 //here we will compare entered password with the hashed password
 userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
 };


 const User = mongoose.model('User', userSchema, "User");


 module.exports =User