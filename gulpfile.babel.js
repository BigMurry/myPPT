/**
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

//import path from 'path';
import gulp from 'gulp';
//import del from 'del';
//import runSequence from 'run-sequence';
import {spawn} from 'child_process';
import gulpLoadPlugins from 'gulp-load-plugins';
import pkg from './package.json';

const $ = gulpLoadPlugins();
const TEST_CLIENT = pkg.scripts['test-client']
const TEST_SERVER = pkg.scripts['test-server']
const TEST_ALL = pkg.scripts['test']

function splitCmd(cmd){

}


gulp.task('autoTest', () => {
  gulp.watch('__test__/client/**/*.js', ['test-client'] )
  gulp.watch('__test__/server/**/*.js', ['test-server'] )
})

gulp.task('test-client', $.shell.task(TEST_CLIENT))
gulp.task('test-server', $.shell.task(TEST_SERVER))

gulp.task('default',['autoTest'])
