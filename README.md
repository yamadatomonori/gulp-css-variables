# gulp-css-variables
gulp pulungin to reorgnize css files with css variables

## usage
```js
var cssVariables = require('gulp-css-variables');

var gulp = require('gulp');

gulp.task('default', function() {
  gulp.src('*.css')
    .pipe(cssVariables())
    .pipe(gulp.dest('./dest'));
});
```
