var path = require('path')
var bulkify = require('bulkify');

module.exports = function (file) {
  var filedir = path.dirname(file)
  var opts = {
    vars: {
      __filename: file,
      __dirname: filedir,
      name: process.env.ethTest
    }
  }
  return bulkify(file, opts)
}
