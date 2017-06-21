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
  if (testType === 'BlockchainTests') {
    // currently maintained BlockchainTests are located in BlockchainTests/GeneralStateTests
    // e.g. https://github.com/ethereum/tests/tree/e17e44a002e4c602e56486663244b74d8dbbff54/BlockchainTests/GeneralStateTests
    testType += '/GeneralStateTests'
  }
  return new Promise((resolve, reject) => {
    dir.readFiles(path.join(__dirname, 'tests', testType), {
      match: fileFilter
    }, async (err, content, fileName, next) => {
      if (err) reject(err)

      fileName = path.parse(fileName).name
      const tests = JSON.parse(content)

      for (let testName in tests) {
        if (!skipFn(testName)) {
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

function skipTest (testName, skipList) {
  return skipList.map((skipName) => (new RegExp(`^${skipName}`)).test(testName)).some(isMatch => isMatch)
}

exports.getTestsFromArgs = function (testType, onFile, args = {}) {
  let fileFilter, skipFn

  skipFn = (name) => {
    return skipTest(name, args.skipFiles)
  }

  // setup skip function
  if (testType === 'BlockchainTests') {
    const forkFilter = new RegExp(`${args.forkConfig}$`)
    skipFn = (name) => {
      return ((forkFilter.test(name) === false) || skipTest(name, args.skipFiles))
    }
  }

  if (args.file) {
    fileFilter = new RegExp(args.file)
  }

  if (args.test) {
    skipFn = (testName) => {
      return testName !== args.test
    }
  }
  return getTests(testType, onFile, fileFilter, skipFn)
}

exports.getSingleFile = (file) => {
  return require(path.join(__dirname, 'tests', file))
}
