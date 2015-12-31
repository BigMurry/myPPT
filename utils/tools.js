import marked from 'marked'

const markedOpt = {
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartpants: false
}
marked.setOptions(markedOpt)

export {marked}
