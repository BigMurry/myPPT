import mongoose from 'mongoose'

const Schema = mongoose.Schema
const _DefaultSelect = ''
const _DefaultOrder = ''

//NOTE: B => Biography; A => Acknowlegement
const SlideSchema = new Schema({
  name:{type:String, default:'', trim:true},
  creator:{type: Schema.ObjectId, ref: 'User'},
  version:{type: String, default:'0.0.0', trim: true},
  keywords:{type: String, default:'', trim: true},
  desrciption:{type: String, default:'', trim: true},
  content:{type: String, default:'', trim: true},
  createOn:{type: Date, default: Date.now()},
  modifiedOn:{type: Date, default: Date.now()},
  theme:{},
  B:{type: Schema.ObjectId, ref:'Slide'},
  A:{type: Schema.ObjectId, ref:'Slide'},
  refs:[{
    title:{type: String, default:'', trim: true},
    description:{type:String, default:'', trim: true},
    slide:{type: Schema.ObjectId, ref:'Slide'}
  }]
})

SlideSchema.pre('save',(next) => {

})

SlideSchema.methods = {
  search(){},
  save(){},
}

SlideSchema.statics = {

}

mongoose.model('Slide', SlideSchema)
