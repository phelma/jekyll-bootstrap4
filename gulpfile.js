'use strict';

const gulp = require('gulp');
const shell = require('gulp-shell');
const browserSync = require('browser-sync');
const cp = require('child_process');

gulp.task('jekyll-watch', done => {
  const proc = cp.execFile('bundle', ['exec', 'jekyll', 'build', '--watch']);
  proc.stdout.on('data', message => {
    console.log('[Jekyll]', message);
    if (message.indexOf('done') >= 0) {
      browserSync.reload();
    }
  });
  proc.on('close', done);
  return proc;
  // shell.task(['bundle exec jekyll build --watch'])(() => {
  //   console.log("aaa")
  // });
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: '_site/'
    }
  });
  // gulp.watch('_site/**/*').on('change', browserSync.reload);
});

gulp.task('default', ['jekyll-watch', 'serve']);
