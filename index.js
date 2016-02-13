var css = require('css');
var gutil = require('gulp-util');
var through = require('through2');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-css-variables';

module.exports = function() {
  return through.obj(_transform);
};


function _transform(file, enc, cb) {
  if (file.isNull()) {
    return cb(null, file);
  }
  
  if (file.isBuffer()) {
    file.contents = new Buffer(reorgnize(file.contents.toString()));
  }
  
  if (file.isStream()) {
    file.contents.on('data', function(chunk) {
      file.contents = this.pipe(createStream(reorgnize(chunk.toString())));
    });
  }
      
  cb(null, file);
}


function reorgnize(code) {
  var dic = {};
  
  var ast = css.parse(code);
  
  ast.stylesheet.rules.forEach(function(rule) {
    rule.declarations.forEach(function(declaration) {
      var key = [declaration.property, declaration.value];
      
      dic[key] = dic[key] || [];
      dic[key].push(declaration);
    });
  });
  
  var i = 0;
  var root = [];
  
  for (var key in dic) {
    if (dic.hasOwnProperty(key)) {
      if (1 < dic[key].length) {
        root[i] = key.split(',')[1];
        
        dic[key].forEach(function(declaration) {
          declaration.value = 'var(--' + String(i) + ')';
        });
        
        i++;
      }
    }
  }
  
  root = root.map(function(rule, i) {
    return '--' + String(i) + ': ' + rule + ';';
  });
  
  return ':root {\n  ' + root.join('\n  ') + '\n' + '}\n\n' + css.stringify(ast);
}


function createStream(text) {
  var stream = through();
  stream.write(text);
  return stream;
}