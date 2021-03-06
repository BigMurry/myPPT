import mongoose from 'mongoose'
import {UserSchema} from './user'
import BPromise from 'bluebird'

const Schema = mongoose.Schema
const _DefaultSelect = 'creator name version modifiedOn keywords stars license'
const _DefaultOrder = {'stars': -1, 'createOn': 1, 'modifiedOn': -1}
const User = mongoose.model('User', UserSchema)

const getKeywords = keywords => keywords.join(';')
const setKeywords = keywords => keywords.split(';')

//NOTE: B => Biography; A => Acknowlegement
const SlideSchema = new Schema({
  name:{type:String, default:'', trim:true},
  creator:{type: Schema.ObjectId, ref: 'User'},
  version:{
    type: String,
    default:'0.0.0',
    validate:{
      validator: (v) => {
        return /\d+\.\d+\.\d+/.test(v)
      },
      message:'{VALUE} is not a valid version number'
    },
    trim: true
  },
  keywords:{type: [], set: setKeywords, get: getKeywords},
  desrciption:{type: String, default:'', trim: true},
  license:{type: String, default: '', trim: true},
  stars:[{
    user: {type: Schema.ObjectId, ref: 'User'},
    at: {type: Date},
  }],
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

SlideSchema.path('creator').required(true, 'creator should not be empty')
SlideSchema.path('content').required(true, 'slide content should not be empty')

SlideSchema.pre('save', function(next){
  this.modifiedOn = Date.now()
  next()
})

SlideSchema.methods = {
  linkA(slideA){
    this.A = slideA
    return this.save()
  },

  linkB(slideB){
    this.B = slideB
    return this.save()
  },

  removeRefs(refId){
    let refIds = []
    if(Array.isArray(refIds)){
      refIds = refIds.concat(refId)
    }else{
      refIds.push(refId)
    }
    refIds.forEach(refId => {
      const index =
        this.refs
        .map(ref => ref.slide)
        .indexOf(refId)

      if(~index) {
        this.refs.splice(index, 1)
      }
    })
    return this.save()
  },

  canStar(userId){
    const index =
      this.stars
      .map(r => r.user)
      .indexOf(userId)
    return !~index
  },

  starify(userId){
    if(this.canStar(userId)){
      this.stars.push({
        user: userId,
        at: Date.now()
      })
    }else{
      throw new Error('current user has already stared')
    }
    return this.save()
  },
}

SlideSchema.statics = {
  load(_id){
    return this.findOne({_id})
      .exec()
  },
  search(options){
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
          {'name': reg},
          {'keywords': reg}
        ]
      }
    }

    return this.find(criteria)
    .sort(opt.order)
    .select(opt.select)
    .skip(opt.pageCount * (opt.pageNumber -1))
    .limit(opt.pageCount)
    .exec()
  },

  findByUser(options){
    let opt = Object.assign({
      select: _DefaultSelect,
      pageCount: 10,
      pageNumber: 1
    }, options)
    opt.order = Object.assign({}, opt.order, _DefaultOrder, opt.order)//
    let userOpt = {
      select:'_id name username',
      criteria:{username: opt.user}
    }
    return new BPromise((resolve, reject) => {
      User.load(userOpt, (err, user) => {
        this.find({'creator': user._id})
          .sort(opt.order)
          .select(opt.select)
          .skip(opt.pageCount * (opt.pageNumber -1))
          .limit(opt.pageCount)
          .exec()
          .then(resolve)
          .catch(reject)
      })
    })
  },

  save(){}
}

mongoose.model('Slide', SlideSchema)
export {SlideSchema}
