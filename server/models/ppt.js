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
    content:{type: String, default:''},
    extras: Schema.Types.Mixed
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
    if(generalInfo && generalInfo.creator){this.creator = generalInfo.creator}
    if(generalInfo && generalInfo.title){this.title = generalInfo.title}
    if(generalInfo && generalInfo.subTitle){this.subTitle = generalInfo.subTitle}
    if(generalInfo && generalInfo.license){this.license = generalInfo.license}
    return this.save()
  },

  updateSlide(slideInfo){
    let self = this
    if(slideInfo && slideInfo.length !== 0){
      slideInfo.forEach((info) => {
        let index = info.index
        if(self.slides.length >= index){
          if(info.head){self.set(`slides.${index}.head`, info.head)}
          if(info.content){self.set(`slides.${index}.content`, info.content)}
          if(info.extras){self.set(`slides.${index}.extras`, info.extras)}
        }
      })
    }
    return this.save()
  }
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
