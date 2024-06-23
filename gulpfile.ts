const gulp = require('gulp')

// 将文件拷贝至输出文件中
gulp.task('file', () => {
  console.log('拷贝文件')
  return gulp
          .src('./src/**/*.txt') // 读取源文件到流
          .pipe(gulp.dest('bin/src')) // 输出目录
})