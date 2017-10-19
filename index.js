const fs = require('fs')
const dir = require('node-dir')
const path = require('path')
var asyncFromLib = require('asyncawait/async')
var awaitFromLib = require('asyncawait/await')

/**
 * Runs a battery of tests
 * @method runTests
 * @param {Function} runner the test runner
 * @param {Object} tests the tests usally fetched using `getTests`
 * @param {Function} filter to enable test skipping, called with skipFn(index, testName, testData)
 */
const getTests = exports.getTests = (testType, onFile, fileFilter = /.json$/, skipFn = () => {
  return false
}, testDir = '', excludeDir = '', testsPath = __dirname + '/tests') => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    dir.readFiles(path.join(testsPath, testType, testDir), {
      match: fileFilter,
      excludeDir: excludeDir
    }, asyncFromLib((err, content, fileName, next) => {
      if (err) reject(err)

      fileName = path.parse(fileName).name
      const tests = JSON.parse(content)

      for (let testName in tests) {
        if (!skipFn(testName)) {
          awaitFromLib(onFile(fileName, testName, tests[testName]))
        }
      }
      next()
    }), (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}

function skipTest (testName, skipList = []) {
  return skipList.map((skipName) => (new RegExp(`^${skipName}`)).test(testName)).some(isMatch => isMatch)
}

/**
 * Loads a single test specified in a file
 * @method getTestFromSource
 * @param {String} file or path to load a single test from
 * @param {Function} Callback function which is invoked, and passed the contents of the specified file (or an error message)
 */
const getTestFromSource = exports.getTestFromSource = function (file, onFile) {
  let stream = fs.createReadStream(file)
  let contents = ''
  let test = null

  stream.on('data', function (data) {
    contents += data
  }).on('error', function (err) {
    onFile(err)
  }).on('end', function () {
    try {
      test = JSON.parse(contents)
    } catch (e) {
      onFile(e)
    }

    let testName = Object.keys(test)[0]
    let testData = test[testName]
    testData.testName = testName

    onFile(null, testData)
  })
}

exports.getTestsFromArgs = function (testType, onFile, args = {}) {
  let testsPath, testDir, fileFilter, excludeDir, skipFn

  skipFn = (name) => {
    return skipTest(name, args.skipTests)
  }

  if (testType === 'BlockchainTests') {
    const forkFilter = new RegExp(`${args.forkConfig}$`)
    skipFn = (name) => {
      return ((forkFilter.test(name) === false) || skipTest(name, args.skipTests))
    }
  }

  if (testType === 'VMTests') {
    skipFn = (name) => {
      return skipTest(name, args.skipVM)
    }
  }

  if (args.singleSource) {
    return getTestFromSource(args.singleSource, onFile)
  }

  if (args.dir) {
    testDir = args.dir
  }

  if (args.file) {
    fileFilter = new RegExp(args.file)
  }

  if (args.excludeDir) {
    excludeDir = new RegExp(args.excludeDir)
  }

  if (args.test) {
    skipFn = (testName) => {
      return testName !== args.test
    }
  }

  if (args.testsPath) {
    testsPath = args.testsPath
  }

  return getTests(testType, onFile, fileFilter, skipFn, testDir, excludeDir, testsPath)
}

exports.getSingleFile = (file) => {
  return require(path.join(__dirname, 'tests', file))
}
