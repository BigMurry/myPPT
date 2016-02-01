import fs from 'fs'
import {join} from 'path'

fs.readdirSync(__dirname)
  .filter(file => !~file.indexOf('index'))
  .forEach(file => require(join(__dirname, file)))
