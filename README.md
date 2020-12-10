<p align="center">
  <a href="https://github.com/ethereumjs/ethereumjs-vm/tree/master/packages">
    <img src="https://user-images.githubusercontent.com/47108/78554503-42c47000-77d9-11ea-8935-2d93981d50df.png" width="309">
  </a>
</p>

# SYNOPSIS

[![Actions Status](https://github.com/ethereumjs/ethereumjs-testing/workflows/Build/badge.svg)](https://github.com/ethereumjs/ethereumjs-testing/actions)
[![Discord][discord-badge]][discord-link]

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Testing utilities for the ethereumjs stack.

Uses the offical [Ethereum Tests](https://github.com/ethereum/tests).

To fetch the latest tests:

```
cd [SUBMODULE_FOLDER]
git fetch --tags origin develop
git tag -l
git checkout tags/[RELEASE_VERSION]
cd ..
git add [SUBMODULE_FOLDER]
git commit -m "[MESSAGE_ON_TEST_RELEASE_UPDATE]"
```

Releases on npm are outdated, latest releases are only done as tagged versions on GitHub due to npm size constraints, use e.g. `git+https://github.com/ethereumjs/ethereumjs-testing.git#[LATEST_TAG_VERSION]` in
your dependencies.

## API

```
const testing = require('ethereumjs-testing')
```

#### `testing.getTestsFromArgs(testType, onFile, args = {})`

Reads tests of a certain test type from several folders and files

- `testType` - Type of the test (`GeneralStateTests`, `BlockchainTests`, `VMTests`)
- `onFile` - Function to run the tests (see example)
- `args`
  - `forkConfig` - Run tests for selected fork (`BlockchainTests` only)
  - `dir` - Only run tests from subdirectory
  - `file` - File filter to apply
  - `excludeDir` - Exclude directory filter to apply
  - `test` - Only run a single test case
  - `testsPath` - Path to the tests repository (without the `tests` dir)
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

[discord-badge]: https://img.shields.io/static/v1?logo=discord&label=discord&message=Join&color=blue
[discord-link]: https://discord.gg/TNwARpR
