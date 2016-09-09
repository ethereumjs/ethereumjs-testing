const async = require('async')
const bulk = require('bulk-require')
const path = require('path')

/**
 * @method getTests
 * @param {String} type the type of test to run
 * @param argv
 * @param {String} argv.file the file to run
 * @param {String} argv.test the test in the file to run
 * @param {String} argv.local the path to the file
 */
exports.getTests = function (type, argv) {
  if (argv.local) {
    return {
      base: require(path.join(process.cwd(), argv.local))
    }
  }

  let tests
  if (argv.file === 'RandomTests') {
    tests = exports.tests.randomVMTest
  } else {
    tests = exports.tests[type + 'Tests']
    // for running a single file
    if (argv.file) {
      var i = {}
      i[argv.file] = tests[argv.file]

      // run a single test from a single file
      if (argv.test) {
        i[argv.file] = {}
        i[argv.file][argv.test] = tests[argv.file][argv.test]
      }

      tests = i
    }
  }

  return tests
}

/**
 * Runs a battery of tests
 * @method runTests
 * @param {Function} runner the test runner
 * @param {Object} tests the tests usally fetched using `getTests`
 * @param {Object} tape an instance of tape
 * @param {Function} filter to enable test skipping, called with skipFn(index, testName, testData) 
 * @param {Function} cb the callback function
 */
exports.runTests = function (runner, tests, tape, skipFn, cb) {
  // run all of the tests

  var testCategoryNames = Object.keys(tests)
  async.eachSeries(testCategoryNames, function (testCategoryName, nextTestCategory) {
    var testCategory = tests[testCategoryName]
    var testNames = Object.keys(testCategory)
    async.eachSeries(testNames, function (testName, nextTest) {
      var index = testNames.indexOf(testName)
      var testData = testCategory[testName]
      var testLabel = '[' + testCategoryName + '] ' + testName

      // start test
      tape(testLabel, function (t) {
        var shouldSkip = skipFn(index, testName, testData)
        if (shouldSkip) {
          t.skip(testName)
          t.end()
          nextTest()
        } else {
          runner(testData, t, function onTestComplete() {
            t.end()
            nextTest()
          })
        }
      })

    }, nextTestCategory)

  }, cb)
}

var tests = exports.tests = {}

Object.defineProperties(tests, {
  blockchainTests: {
    get: getTests.bind(this, 'BlockchainTests')
  },
  basicTests: {
    get: getTests.bind(this, 'BasicTests')
  },
  trieTests: {
    get: getTests.bind(this, 'TrieTests')
  },
  stateTests: {
    get: getTests.bind(this, 'StateTests')
  },
  transactionTests: {
    get: getTests.bind(this, 'TransactionTests')
  },
  vmTests: {
    get: getTests.bind(this, 'VMTests')
  },
  randomVMTest: {
    get: getTests.bind(this, 'VMTests/RandomTests')
  },
  powTests: {
    get: getTests.bind(this, 'PoWTests')
  }
})

function getTests (name) {
  var tests = bulk(__dirname + '/tests/' + name + '/', ['**/*.json'])
  var random = ['RandomTests', 'RandomBlockTest', 'Homestead']
  random.forEach(function (i) {
    if (tests[i]) {
      for (var prop in tests[i]) {
        tests[i + ' ' + prop] = tests[i][prop]
        if (i === 'Homestead') {
          var homesteadTests = tests[i][prop]
          Object.keys(homesteadTests).map(function (v) {
            homesteadTests[v].homestead = true
            return v
          })
        }
      }
      delete tests[i]
    }
  })
  return tests
}
