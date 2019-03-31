'use strict'

const less = require('gulp-less'),
      {src, dest, watch} = require('gulp'),
      concat = require('gulp-concat')

function defaultTask(cb){
  // console.log('default task')
  cb()
}

function makeStyle(cb){
  return src(['assets/style/*.less', 'assets/components/*/*.less'])
  .pipe(concat('style.less'))
  .pipe(less())
  .pipe(dest('assets/style/'))
}

watch(['assets/style/*.less', 'assets/components/*/*.less'], makeStyle)

exports.default = defaultTask
exports.style = makeStyle
