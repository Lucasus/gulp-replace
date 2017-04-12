'use strict';

var Transform = require('readable-stream/transform');
var rs = require('replacestream');
var istextorbinary = require('istextorbinary');
var applySourceMap = require('vinyl-sourcemaps-apply');
var Replacer = require('regexp-sourcemaps');

module.exports = function(search, replacementParameter, options) {
  return new Transform({
    objectMode: true,
    transform: function(file, enc, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }

      function doReplace() {
        
        if (file.isStream()) {
          throw new Error("Streams are not  supported");
        }

        if (file.isBuffer()) {
          if (search instanceof RegExp) {
            var replacement;

            if (typeof replacementParameter === 'function') {
                replacement = replacementParameter(search);
            } else {
                replacement = replacementParameter;
            }

            var contentAfterReplacement = file.contents.toString('utf8').replace(search, replacement);
            file.contents = new Buffer(contentAfterReplacement);

            if (file.sourceMap) {
               var replacer = new Replacer(search,replacement);
               var result = replacer.replace(contentAfterReplacement, file.relative);
               applySourceMap(file, result.map);
            }
          } else {
             throw new Error("Only regex replace is supported");
          }
          
          return callback(null, file);
        }

        callback(null, file);
      }

      if (options && options.skipBinary) {
        istextorbinary.isText(file.path, file.contents, function(err, result) {
          if (err) {
            return callback(err, file);
          }

          if (!result) {
            callback(null, file);
          } else {
            doReplace();
          }
        });

        return;
      }

      doReplace();
    }
  });
};
