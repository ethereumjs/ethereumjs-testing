#!/usr/bin/env node

const async = require('async');
const tape = require('tape');
const path = require('path');

//argv.file {string} the file to run
//argv.test {string} the test in the file to run
//argv.path (string} the path to the file
exports.getTests = function (type, argv) {

  if (argv.local) {
    var base = path.basename(argv.local);
    return {
      base: require(argv.local)
    };
  }

  var tests =  exports.tests[type + 'Tests'];

  //move the random tests
  if (type === 'vm') {
    for (var prop in tests.RandomTests) {
      tests[prop] = tests.RandomTests[prop];
    }
    delete tests.RandomTests;
    delete tests.vmSystemOperationsTest;
  }

  //move the random tests
  if (type === 'state') {
    for (var prop in tests.RandomTests) {
      tests[prop] = tests.RandomTests[prop];
    }

    delete tests.RandomTests;
  }

  if (type === 'blockchain') {
    for (var prop in tests.RandomBlockTest) {
      tests[prop] = tests.RandomBlockTest[prop];
    }
    delete tests.RandomTests;
  }


  //for running a single file
  if (argv.file) {
    var i = {};
    i[argv.file] = tests[argv.file];

    //run a single test from a single file
    if (argv.test) {
      i[argv.file] = {};
      i[argv.file][argv.test] = tests[argv.file][argv.test];
    }

    tests = i;
  }
  return tests;
}

exports.runTests = function(runner, tests, skips, cb) {
  //run all of the tests
  if(typeof skips === 'function'){
    cb = skips
    skips = []
  }

  if(!skips)
    skips = []

  async.eachSeries(Object.keys(tests), function (fileName, done) {
    var file = tests[fileName];
    async.eachSeries(Object.keys(file), function (testName, done2) {
      var test = file[testName];
      tape('[' + fileName + '] ' + testName, function (t) {
        if (skip.indexOf(testName) === -1) {
          runner(test, t, function () {
            t.end();
            done2();
          });
        } else {
          t.skip(testName);
          t.end();
          done2();
        }
      });
    }, done);
  }, cb);
}

var tests = exports.tests = {};
const testDir =  __dirname + '/tests'

Object.defineProperties(tests, {
  blockchainTests: {
    get: require('require-all').bind(this, testDir + '/BlockchainTests')
  },
  basicTests: {
    get: require('require-all').bind(this, testDir + '/BasicTests/')
  },
  trieTests: {
    get: require('require-all').bind(this, testDir + '/TrieTests/')
  },
  stateTests: {
    get: require('require-all').bind(this, testDir + '/StateTests/')
  },
  transactionTests: {
    get: require('require-all').bind(this, testDir + '/TransactionTests/')
  },
  vmTests: {
    get: require('require-all').bind(this, testDir + '/tests/VMTests')
  },
  powTests: {
    get: require('require-all').bind(this, testDir + '/PoWTests')
  }
});
