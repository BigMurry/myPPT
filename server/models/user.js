import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name:{type: String, default:''},
  email:{type: String, default:''},
  username:{type: String, default:''},
  provider:{type: String, default:''},
  hashed_password:{type: String, default:''},
  salt:{type: String, default:''},
  authToken:{type: String, default:''},
  facebook:{},
  twitter:{},
  github:{},
  google:{},
  linkedin:{}
})

UserSchema
  .virtual('password')
  .set(function(password){
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function(){
    return this._password
  })

UserSchema.methods = {
  authenticate(plainText){
    return this.encryptPassword(plainText) === this.hashed_password
  },

  makeSalt(){},

  encryptPassword(plaintText){},

}
