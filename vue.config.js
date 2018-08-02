const merge = require('webpack-merge')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  lintOnSave: false,
  configureWebpack: config => {
    config.resolve.extensions = ['.js', '.vue', '.json', '.ts', '.tsx']
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options =>
        merge(options, {
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        })
      )
    
    // remove the old loader
    config.module.rules.delete('svg')

      // add the new one
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('svg-sprite')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
  }
};
