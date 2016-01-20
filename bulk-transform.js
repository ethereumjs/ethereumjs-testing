const path = require('path')
const bulkify = require('bulkify')

module.exports = function (file) {
  var testName = process.env.ethTest
  var filedir = path.dirname(file)
  var opts = {
    vars: {
      __filename: file,
      __dirname: filedir,
      name: testName
    }
  }
  return bulkify(file, opts)
}
