const gulp = require('gulp');
const server = require('gulp-webserver');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const watch = require('gulp-watch');
const proxy = require('http-proxy-middleware');

gulp.task('packjs', () => {
  return gulp.src('./scripts/**/*.js')
    .pipe(webpack({
      mode: 'development',
      entry: {
        app: ['@babel/polyfill', './src/scripts/app.js']
      },
      output: {
        filename: 'app.js'
      },
      module: {
        rules: [
          {
            test: /\.html$/,
            use: [ 'string-loader' ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('./dev/scripts'))
})

gulp.task('packscss',() => {
  return gulp.src('./src/styles/app.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./dev/styles'))
})

gulp.task('server',() => {
  return gulp.src('./dev')
    .pipe(server({
      host: 'localhost',
      port: 2333,
      livereload: true,
      middleware: [
        proxy('/api', {
          target: 'http://localhost:3000',
          changeOrigin: true,
          // pathRewrite: {
          //   '^/api': ''
          // }
        })
      ]
    }))
})

gulp.task('copyhtml', () => {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dev/'))
})

gulp.task('copyicons', () => {
  return gulp.src('./src/iconfonts/**/*')
    .pipe(gulp.dest('./dev/iconfonts'))
})

gulp.task('copylibs', () => {
  return gulp.src('./src/libs/**/*')
    .pipe(gulp.dest('./dev/libs'))
})

gulp.task('copymock', () => {
  return gulp.src('./src/mock/**/*')
    .pipe(gulp.dest('./dev/mock'))
})

gulp.task('watch', () => {
  gulp.watch('./src/*.html', ['copyhtml'])
  watch('./src/styles/**/*', () => {
    gulp.start(['packscss'])
  })
  gulp.watch('./src/script/**/*', ['packjs'])
})

gulp.task('default', ['packscss','packjs','copyhtml','copyicons','copylibs','copymock','server','watch'], () => {
  console.log("all works!")
})