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

  var tests = exports.tests[type + 'Tests']

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
  delete tests.vmSystemOperationsTest
  return tests
}

/**
 * Runs a battery of tests
 * @method runTests
 * @param {Object} tests the tests usally fetched using `getTests`
 * @param {Object} tape an instance of tape
 * @param {Array.<String>} skip an Array of tests to skip
 * @param {Function} cb the callback function
 */
exports.runTests = function (runner, tests, tape, skip, cb) {
  // run all of the tests
  if (typeof skips === 'function') {
    cb = skip
    skips = []
  }

  if (!skip) {
    skip = []
  }

  async.eachSeries(Object.keys(tests), function (fileName, done) {
    var file = tests[fileName]
    async.eachSeries(Object.keys(file), function (testName, done2) {
      var test = file[testName]
      tape('[' + fileName + '] ' + testName, function (t) {
        if (skip.indexOf(testName) === -1) {
          runner(test, t, function () {
            t.end()
            done2()
          })
        } else {
          t.skip(testName)
          t.end()
          done2()
        }
      })
    }, done)
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
