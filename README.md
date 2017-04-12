# gulp-replace-with-sourcemaps [![NPM version]][npm-url]
> A string replace plugin for gulp 3

## Usage

First, install `gulp-replace-with-sourcemaps` as a development dependency:

```shell
npm install --save-dev gulp-replace-with-sourcemaps
```

Then, add it to your `gulpfile.js`:

### Regex Replace
```javascript
var replace = require('gulp-replace-with-sourcemaps');

gulp.task('templates', function(){
  gulp.src(['file.txt'])
    .pipe(replace(/foo(.{3})/g, '$1foo'))
    .pipe(gulp.dest('build/file.txt'));
});
```

## API

gulp-replace-with-sourcemaps can be called with regex only.

### replace(regex, replacement[, options])

#### regex
Type: `RegExp`

The regex pattern to search for. See the [MDN documentation for RegExp] for details.

#### replacement
Type: `String` or `Function`

The replacement string or function. See the [MDN documentation for String.replace] for details.

### gulp-replace-with-sourcemaps options

An optional third argument, `options`, can be passed.

#### options
Type: `Object`

##### options.skipBinary
Type: `boolean`  
Default: `false`

Skip binary files

[MDN documentation for RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[MDN documentation for String.replace]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter

[npm-url]: https://npmjs.org/package/gulp-replace-with-sourcemaps
