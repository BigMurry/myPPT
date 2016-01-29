module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry:[
    './__test__/server/index'
  ],
  output:{
    filename:'testServerBundle.js',
    path: '/tmp',
  },
  target:'node',
  module:{
    loaders:[
      {
        test:/\.jsx?$/,
        exclude:/node_modules/,
        loader:'babel',
      }
    ]
  },
  resolve:{
    extensions:['', '.js']
  }
}
