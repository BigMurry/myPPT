'use strict';
//import path from 'path';
import gulp from 'gulp';
import del from 'del';
//import runSequence from 'run-sequence';
//import {spawn} from 'child_process';
//import gutil from 'gulp-util';
import gulpLoadPlugins from 'gulp-load-plugins';
import {Server} from 'karma';
//import pkg from './package.json';

const $ = gulpLoadPlugins();

gulp.task('clear', (cb) => {
  del(['tmp/**', 'dist/**', '!tmp', '!dist']).then(() => {
    cb();
  })
});

gulp.task('server-test', () => {
  return gulp.src('./__test__/server/*-spec.js')
  .pipe($.mocha({reporter: 'spec'}));
});

gulp.task('client-test', (cb) => {
  new Server({
    configFile:__dirname + '/.config/karma.conf.js',
    singleRun: true
  }, cb).start();
});

gulp.task('autoTest', () => {
  gulp.watch('__test__/client/**/*.js', ['client-test'] );
  gulp.watch('__test__/server/**/*.js', ['server-test'] );
});

gulp.task('default',['autoTest']);
