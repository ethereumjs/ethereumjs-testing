# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) 
(modification: no type change headlines) and this project adheres to 
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [1.2.4] - 2018-10-15
Updated ``tests`` submodule to ``95a3092``.

Test changes summary:
- Fixed wrong difficulty tests (blockchain tests) on NoProof setting
- Refilled wallet tests (``BlockchainTests/bcWalletTest/``)
- Removed legacy tests under ``BlockchainTests/GeneralStateTests/stArgsZeroOneBalance/``
- Fixed ``BLOCKHASH`` costs in Constantinople blockchain test versions

[1.2.4]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.3...v1.2.4

## [1.2.3] - 2018-10-10
Updated ``tests`` submodule to ``9777827``.

Test changes summary:
- New ``difficultyConstantinople.json`` difficulty tests
- Regenerated all state tests, mainly for ``SSTORE`` gas cost changes
- Fixed wrong timestamp in tests
- Refilled ``stCreate2`` with new gas prices
- Refilled state tests as blockchain tests
- Refill of VM tests
- Corrected Constantinople expect section in state tests

[1.2.3]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.2...v1.2.3

## [1.2.2] - 2018-09-20
Updated ``tests`` submodule to ``3f5febc``.

Test changes summary:
- Various new ``CREATE2`` test cases
- ``PUSH32`` without bytes at the end

[1.2.2]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.1...v1.2.2

## [1.2.1] - 2018-08-30
Updated ``tests`` submodule to ``691680a``.

Test changes summary:
- ``CREATE2`` init code tests
- Storage from self-destruct check (blockchain tests)
- Added sealEngine to the JSON schema
- ``RLP`` test fixes
- Bitshift instruction test changes (``SAR``)
- Changes in ``CREATE`` state tests and blockchain state tests

[1.2.1]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.0...v1.2.1

## [1.2.0] - 2018-06-22
- Updated ``tests`` submodule to ``428842e`` (``Byzantium`` compatible, partly ``Constantinople`` compatible)

[1.2.0]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.1.1...v1.2.0

## [1.1.1] - 2018-06-22
- Updated ``tests`` submodule (``Byzantium`` compatible, partly ``Constantinople`` compatible)
- Removed ``BlockchainTests`` limitation to ``GeneralStateTests`` subfolder
- Support for new ``GeneralStateTests`` format
- New ``--dir`` and ``excludeDir`` CL arguments
- Functionality for skipping tests
- Added API documentation in README
- New ``examples/`` folder with ``read-single-file`` and ``read-tests-with-args`` example
  (also for library testing)

[1.1.1]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.0.4...v1.1.1

## [1.1.0] - 2018-06-22

- NPM publication error, ignore

## [1.0.4] - 2016-11-10
- Minor Changes

[1.0.4]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.0.0...v1.0.4

## [1.0.0] - 2016-11-09
- Library rewrite, first generalized testing version

[1.0.0]: https://github.com/ethereumjs/ethereumjs-testing/compare/v0.0.2...v1.0.0


## Older releases:

- [0.0.2](https://github.com/ethereumjs/ethereumjs-testing/compare/v0.0.1...v0.0.2) - 2016-10-27
- 0.0.1 - 2016-01-20


