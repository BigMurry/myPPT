import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PPTSchema = new Schema({
  creator:{type: String, default:'Anonymous', trim: true},
  createOn:{type: Date, default: Date.now()},
  modifiedOn:{type: Date, default: Date.now()},
  title:{type: String, default:'', trim: true},
  subTitle:{type: String, default:'', trim: true},
  license:{type: String, default:''},
  slides:[{
    head:{type: String, default:''},
    content:{type: String, default:''}
  }]
})

PPTSchema.path('title').required(true, 'Artical title cannot be empty')
//PPTSchema.path('slides').required(true, 'Artical content cannot be empty')

PPTSchema.pre('save', function(next) {
  this.modifiedOn = Date.now()
  next()
})

PPTSchema.methods = {
  addSlide(slideInfo){
    this.slides.push({
      head: slideInfo.head,
      content: slideInfo.content
    })

    return this.save()
  },
  updateGeneralInfo(generalInfo){
    if(generalInfo && generalInfo.title){this.title = generalInfo.title}
    if(generalInfo && generalInfo.subTitle){this.subTitle = generalInfo.subTitle}
    if(generalInfo && generalInfo.license){this.license = generalInfo.license}
    return this.save()
  },
}

PPTSchema.statics = {
  load(options, cb){
    options.select = options.select || 'creator modifiedOn title'
    this.findOne(options.criteria)
        .select(options.select)
        .exec(cb)
  }

}

mongoose.model('PPT', PPTSchema)
