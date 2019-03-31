'use strict'

const less = require('gulp-less'),
      {src, dest, watch, series} = require('gulp'),
      concat = require('gulp-concat')

function defaultTask(cb){
  // console.log('default task')
  cb()
}

function style(cb){
  return src(['assets/style/*.less', 'assets/components/*/*.less'])
  .pipe(concat('style.less'))
  .pipe(less())
  .pipe(dest('assets/style/'))
}

watch(['assets/style/*.less', 'assets/components/*/*.less'], style)

exports.style = style
exports.default = series(style)
