const async = require('async')
const tape = require('tape')
const bulk = require('bulk-require')
const child_process = require('child_process')
const fs = require('fs')

// getTests('TransactionTests')
// argv.file {string} the file to run
// argv.test {string} the test in the file to run
// argv.local {string} the path to the file
exports.getTests = function (type, argv) {

  if (argv.local) {
    return {
      base: require(argv.local)
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
  return tests
}

exports.runTests = function (runner, tests, skip, cb) {
  // run all of the tests
  if (typeof skips === 'function') {
    cb = skip
    skips = []
  }

  if (!skip)
    skip = []

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

function getTests(name) {
  pullRepo(name)
  var tests = bulk( __dirname +'/tests/' + name + '/', ['**/*.json'])
  var random = ['RandomTests', 'RandomBlockTest']
  random.forEach(function (i) {
    if (tests[i]) {
      for (var prop in tests[i]) {
        tests[prop] = tests[i][prop]
      }
      delete tests[i]
    }
  })
  return tests
}

function pullRepo(dir) {
  if (!process.browser) {
    try {
      //pull only if the directory is not there
      fs.statSync(__dirname + '/tests/' + dir)
    } catch (e) {
      child_process.execSync('echo "' + dir + '/**" >> .git/info/sparse-checkout', {
        cwd: __dirname + '/tests'
      })
      child_process.execSync('git pull --rebase --depth=1 -X thiers origin master', {
        stdio: [0, 1, 2],
        cwd: __dirname + '/tests'
      })
      child_process.execSync('git reset --hard', {
        stdio: [0, 1, 2],
        cwd: __dirname + '/tests'
      })
    }
  }
}
