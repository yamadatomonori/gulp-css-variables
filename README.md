# gulp-css-variables
gulp pulungin to reorgnize old css files with css variables

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

## input
```css
.one {
  color: white;
  background-color: brown;
  margin: 10px;
  width: 50px;
  height: 50px;
  display: inline-block;
}

.two {
  color: white;
  background-color: black;
  margin: 10px;
  width: 150px;
  height: 70px;
  display: inline-block;
}
.three {
  color: white;
  background-color: brown;
  margin: 10px;
  width: 75px;
}
.four {
  color: white;
  background-color: brown;
  margin: 10px;
  width: 100px;
}

.five {
  background-color: brown;
}
```


## output
```css
:root {
  --0: white;
  --1: brown;
  --2: 10px;
  --3: inline-block;
}

.one {
  color: var(--0);
  background-color: var(--1);
  margin: var(--2);
  width: 50px;
  height: 50px;
  display: var(--3);
}

.two {
  color: var(--0);
  background-color: black;
  margin: var(--2);
  width: 150px;
  height: 70px;
  display: var(--3);
}

.three {
  color: var(--0);
  background-color: var(--1);
  margin: var(--2);
  width: 75px;
}

.four {
  color: var(--0);
  background-color: var(--1);
  margin: var(--2);
  width: 100px;
}

.five {
  background-color: var(--1);
}
```
