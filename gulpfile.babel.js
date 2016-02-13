'use strict'

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

//import path from 'path'
import gulp from 'gulp'
import del from 'del'
import runSequence from 'run-sequence'
import {spawn} from 'child_process'
//import gutil from 'gulp-util'
import gulpLoadPlugins from 'gulp-load-plugins'
import {Server} from 'karma'
//import pkg from './package.json'

const $ = gulpLoadPlugins()

gulp.task('clear', (cb) => {
  del(['tmp/**', 'dist/**', 'lib/**', '!tmp', '!dist', '!lib']).then(() => {
    cb()
  })
})

gulp.task('server-test', () => {
  return gulp.src('./__test__/server/*-spec.js')
  .pipe($.mocha({reporter: 'spec'}))
})

gulp.task('client-test', (cb) => {
  new Server({
    configFile:__dirname + '/.config/karma.conf.js',
    singleRun: true
  }, cb).start()
})

gulp.task('autoTest', () => {
  gulp.watch(['__test__/client/**/*.js', 'client/**/*.js'], ['client-test'] )
  gulp.watch(['__test__/server/**/*.js', 'server/**/*.js'], ['server-test'] )
})

gulp.task('test', ['client-test', 'server-test'], () => {
  process.exit()
})

gulp.task('build-server', () => {
  return gulp.src(['server/**/*.js'])
        .pipe($.babel())
        .pipe(gulp.dest('lib'))
})

gulp.task('build-client', () => {
  let child = spawn(
    'webpack',
    ['-p', '--config', `${__dirname}/.config/webpack.prod.config.js`],
    {cwd: process.cwd()})

  child.stdout.setEncoding('utf8')
  child.stdout.on('data', (data) => {
    $.util.log(data);
  })
  child.stderr.setEncoding('utf8')
  child.stderr.on('data', (data) => {
    $.util.log(data)
  })
  child.on('close', (code) => {
    $.util.log(`Done with exit code ${code}`)
  })
})

gulp.task('copy', () => {
  return gulp.src(['client/index.html'])
        .pipe(gulp.dest('dist'))
})

gulp.task('default',['autoTest'])
gulp.task('build', (cb) => {
  runSequence('clear', ['build-server', 'build-client'],'copy')
})
