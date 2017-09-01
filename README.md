# ethereumjs-testing

Testing utilities for the ethereumjs stack.

Uses the offical [Ethereum Tests](https://github.com/ethereum/tests).

To fetch the latest tests:
```
git submodule init
git submodule update
cd tests
git pull origin develop
```

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
  - `test` - Only run a single test case
  - `skipTests` - List of tests to skip
  - `skipVM` - List of VM tests to skip

#### `testing.getSingleFile(file)`
Reads a single test file
- `file` - Path to the file


Examples how to read tests with the API methods above can be found in 
the [./examples](./examples/) directory.
  
