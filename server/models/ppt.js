import mongoose from 'mongoose'

const Schema = mongoose.Schema
const _DefaultSelect = 'creator title subTitle modifiedOn keywords stars license'
const _DefaultOrder = {'stars': -1, 'createOn': 1, 'status': -1}

const PPTSchema = new Schema({
  creator:{type: String, default:'Anonymous', trim: true},
  createOn:{type: Date, default: Date.now()},
  modifiedOn:{type: Date, default: Date.now()},
  title:{type: String, default:'', trim: true},
  subTitle:{type: String, default:'', trim: true},
  keywords:{type:String, default: '', trim: true},
  license:{type: String, default: ''},
  stars:{type: Number, default: 0},
  status:{type: Number, default: 0},
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
        if(self.slides.length > index){
          if(info.head){self.set(`slides.${index}.head`, info.head)}
          if(info.content){self.set(`slides.${index}.content`, info.content)}
          if(info.extras){self.set(`slides.${index}.extras`, info.extras)}
        }else if(self.slides.length <= index){
          let slide = {
            head:info.head,
            content:info.content,
            extras:info.extras
          }
          self.slides.push(slide)
        }
      })
    }
    return this.save()
  }
}

PPTSchema.statics = {
  load(options, cb){
    options.select = options.select || _DefaultSelect
    this.findOne(options.criteria)
        .select(options.select)
        .exec(cb)
  },
  search(options, cb){
    let opt = Object.assign({
      select: _DefaultSelect,
      pageCount:10,
      pageNumber:1
    }, options)

    opt.order = Object.assign({}, opt.order, _DefaultOrder, opt.order)

    let criteria = null
    if(opt.key){
      let reg = new RegExp(`(?:\\b|^|;)${opt.key}(?:\\b|$|;)`,'i')
      criteria = {
        $or:[
          {'title': reg},
          {'keywords': reg}
        ]
      }
    }

    this.find(criteria)
    .sort(opt.order)
    .select(opt.select)
    .skip(opt.pageCount * (opt.pageNumber -1))
    .limit(opt.pageCount)
    .exec(cb)
  },

  findByUser(options, cb){
    let opt = Object.assign({
      select: _DefaultSelect,
      pageCount: 10,
      pageNumber: 1
    }, options)
    opt.order = Object.assign({}, opt.order, _DefaultOrder, opt.order)//

    console.log(opt.order)
    this.find({'creator': opt.user})
        .sort(opt.order)
        .select(opt.select)
        .skip(opt.pageCount * (opt.pageNumber -1))
        .limit(opt.pageCount)
        .exec(cb)
  },

}

mongoose.model('PPT', PPTSchema)
