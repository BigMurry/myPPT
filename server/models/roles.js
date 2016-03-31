import mongoose from 'mongoose'
const Schema = mongoose.Schema

//'jada1',['/slides', '/slide'], ['put', 'post']
const RolesSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'User'},
  resources: [],
  permissions:[]
})

RolesSchema.methods = {}

RolesSchema.statics = {}

mongoose.model('Roles', RolesSchema)
export{RolesSchema}
