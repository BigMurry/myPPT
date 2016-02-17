import mongoose from 'mongoose'
import crypto from 'crypto'

const _DefaultSelect = 'name email username'
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
    //TODO: this should be changed
    return 'pass'
  })

UserSchema.methods = {
  authenticate(plainText){
    return this.encryptPassword(plainText) === this.hashed_password
  },

  makeSalt(){
    return Math.round(new Date().valueOf() * Math.random()) + ''
  },

  encryptPassword(plainText){
    if(!plainText) return ''
    try{
      return crypto
        .createHmac('sha1', this.salt)
        .update(plainText)
        .digest('hex')
    }catch(err){
      return ''
    }
  },
}

UserSchema.statics = {
  load(options, cb){
    options.select = options.select || _DefaultSelect
    this.findOne(options.criteria)
        .select(options.select)
        .exec(cb)
  },
}

mongoose.model('User', UserSchema)

export {UserSchema}
