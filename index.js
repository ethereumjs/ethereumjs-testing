const dir = require('node-dir')
const path = require('path')

/**
 * Runs a battery of tests
 * @method runTests
 * @param {Function} runner the test runner
 * @param {Object} tests the tests usally fetched using `getTests`
 * @param {Function} filter to enable test skipping, called with skipFn(index, testName, testData)
 */
const getTests = exports.getTests = (testType, onFile, fileFilter = /.json$/, skipFn = () => {
  return false
}) => {
  return new Promise((resolve, reject) => {
    dir.readFiles(path.join(__dirname, 'tests', testType), {
      match: fileFilter
    }, async (err, content, fileName, next) => {
      if (err) reject(err)

      fileName = path.parse(fileName).name
      const tests = JSON.parse(content)

      for (let testName in tests) {
        if (skipFn(testName)) {
          next()
        } else {
          await onFile(fileName, testName, tests[testName])
        }
      }
      next()
    }, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}

exports.getTestsFromArgs = function (testType, onFile, args = {}) {
  let fileFilter, testFn

  if (args.file) {
    fileFilter = new RegExp(args.file)
  }

  if (args.test) {
    testFn = (testName) => testName !== args.test
  } else {
    testFn = args.testFn
  }
  return getTests(testType, onFile, fileFilter, testFn)
}

exports.getSingleFile = (file) => {
  return require(path.join(__dirname, 'tests', file))
}
