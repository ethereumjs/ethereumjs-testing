# SYNOPSIS  
[![Build Status](https://img.shields.io/travis/ethereumjs/ethereumjs-testing.svg?branch=master&style=flat-square)](https://travis-ci.org/ethereumjs/ethereumjs-testing)
[![Gitter](https://img.shields.io/gitter/room/ethereum/ethereumjs.svg?style=flat-square)]() 

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Testing utilities for the ethereumjs stack.

Uses the offical [Ethereum Tests](https://github.com/ethereum/tests).

To fetch the latest tests:
```
git submodule init
git submodule update
cd tests
git pull origin develop
```

Releases on npm are outdated, latest releases are only done as tagged versions on GitHub due to npm size constraints, use e.g. ``git+https://github.com/ethereumjs/ethereumjs-testing.git#[LATEST_TAG_VERSION]`` in
your dependencies.

## API

```
const testing = require('ethereumjs-testing')
```

#### `testing.getTestsFromArgs(testType, onFile, args = {})`
Reads tests of a certain test type from several folders and files
- `testType` - Type of the test (``GeneralStateTests``, ``BlockchainTests``, ``VMTests``)
- `onFile` - Function to run the tests (see example)
- `args`
  - `forkConfig` - Run tests for selected fork (``BlockchainTests`` only)
  - `dir` - Only run tests from subdirectory
  - `file` - File filter to apply
  - `excludeDir` - Exclude directory filter to apply
  - `test` - Only run a single test case
  - `testsPath` - Path to the tests repository (without the ``tests`` dir)
  - `skipTests` - List of tests to skip
  - `skipVM` - List of VM tests to skip

#### `testing.getTestFromSource(file, onFile)`
Reads custom test from a relative path or file
- `file` - Relative path or filename
- `onFile` - Function to run the tests (see example)

#### `testing.getSingleFile(file)`
Reads a single test file
- `file` - Path to the file


Examples how to read tests with the API methods above can be found in 
the [./examples](./examples/) directory.
  
