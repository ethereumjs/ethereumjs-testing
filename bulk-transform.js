const path = require('path')
const child_process = require('child_process')
const fs = require('fs')
const bulkify = require('bulkify')

module.exports = function (file) {
  var testName = process.env.ethTest
  try {
    // pull only if the directory is not there
    fs.statSync(__dirname + '/tests/' + testName)
  } catch (e) {
    child_process.execSync('echo "' + testName + '/**" >> .git/info/sparse-checkout', {
      cwd: __dirname + '/tests'
    })
    child_process.execSync('git pull --rebase --depth=1  -X thiers', {
      stdio: [0, 1, 2],
      cwd: __dirname + '/tests'
    })
    child_process.execSync('git reset --hard', {
      stdio: [0, 1, 2],
      cwd: __dirname + '/tests'
    })
  }
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
