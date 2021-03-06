# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) 
(modification: no type change headlines) and this project adheres to 
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [1.3.3] - 2020-08-04
Updated `tests` submodule to 
[66a55cd42f](https://github.com/ethereum/tests/commit/66a55cd42f63845e34767504d0a7a62b452a7e7a) 
(2020-07-13) `develop` branch state of the `ethereum/tests` library.

This is an intermediary release including first `EIP-2537` (Precompile for BLS12-381 curve operations) 
tests, see `ethereum/tests` PR [#713](https://github.com/ethereum/tests/pull/713).

[1.3.3]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.3.2...v1.3.3

## [1.3.2] - 2020-06-11
Updated `tests` submodule to 
[84b071c](https://github.com/ethereum/tests/commit/84b071cd3747b8fec6918f04430660eecf951aa2) 
(2020-06-11) `develop` branch state of the `ethereum/tests` library.

This is an intermediary release included first `EIP-2315` (EVM Subroutines) tests,
see `ethereum/tests` PR [#692](https://github.com/ethereum/tests/pull/692) for a test case
description.

[1.3.2]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.3.1...v1.3.2

## [1.3.1] - 2020-05-11
Updated `tests` submodule to [v7.0.0](https://github.com/ethereum/tests/releases/tag/v7.0.0) `ethereum/tests`
release.

This is a final **pre-Berlin HF** state release and encompasses HF changes up to `Petersburg` (respectively, `MuirGlacier`). See release notes for a detailed list on the changes.

[1.3.1]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.3.0...v1.3.1

## [1.3.0] - 2019-11-12
Updated `tests` submodule to [v7.0.0-beta.1](https://github.com/ethereum/tests/releases/tag/v7.0.0-beta.1) `ethereum/tests` release. This is the first release on
`ethereum/tests` with substantial **Istanbul support**.

Note that the release is coming with substantial format/location changes on the
tests repo (see "Test Format Changes" section within the release notes), e.g.
a new `LegacyTests` folder for tests on older HFs and a new subfolder structure
for the `BlockchainTests`. These changes will likely require some adoption on
integration.

[1.3.0]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.8...v1.3.0

## [1.2.8] - 2019-03-20
- Remove `asyncawait` dependency (browser compatibility),
  PR [#38](https://github.com/ethereumjs/ethereumjs-testing/pull/38)
- Dropped Node 6 support, added Node 10 support,
  PR [#38](https://github.com/ethereumjs/ethereumjs-testing/pull/38)
- Clean up of the `getTests()` function, 
  PR [#38](https://github.com/ethereumjs/ethereumjs-testing/pull/38)

[1.2.8]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.7...v1.2.8

## [1.2.7] - 2019-01-30
Updated `tests` submodule to `5cef36e` (Jan 24, 2019) `ethereum/tests` commit
which merges the PR [#582](https://github.com/ethereum/tests/pull/582)
with the test updates on the Constantinople pre-/post reentrancy fixes.

This is just a temporary release to get some basis for further development
and should be replaced with a tag-release based release once a new
tag-release becomes available on the `ethereum/tests` repo.

[1.2.7]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.6...v1.2.7

## [1.2.6] - 2019-01-10
Updated `tests` submodule to [v6.0.0-beta.3](https://github.com/ethereum/tests/releases/tag/v6.0.0-beta.3) `ethereum/tests` release.

[1.2.6]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.5...v1.2.6

## [1.2.5] - 2018-11-14
Updated `tests` submodule to [v6.0.0-beta.2](https://github.com/ethereum/tests/releases/tag/v6.0.0-beta.2) `ethereum/tests` release.

##### Note:
Tests on `ethereum/tests` are now released as versioned tagged releases. The `tests` submodule will from this release onwards directly reference the
latest tag on `ethereum/tests` + link to the respective release notes.

[1.2.5]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.4...v1.2.5

## [1.2.4] - 2018-10-15
Updated `tests` submodule to `95a3092`.

Test changes summary:
- Fixed wrong difficulty tests (blockchain tests) on NoProof setting
- Refilled wallet tests (`BlockchainTests/bcWalletTest/`)
- Removed legacy tests under `BlockchainTests/GeneralStateTests/stArgsZeroOneBalance/`
- Fixed `BLOCKHASH` costs in Constantinople blockchain test versions

[1.2.4]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.3...v1.2.4

## [1.2.3] - 2018-10-10
Updated `tests` submodule to `9777827`.

Test changes summary:
- New `difficultyConstantinople.json` difficulty tests
- Regenerated all state tests, mainly for `SSTORE` gas cost changes
- Fixed wrong timestamp in tests
- Refilled `stCreate2` with new gas prices
- Refilled state tests as blockchain tests
- Refill of VM tests
- Corrected Constantinople expect section in state tests

[1.2.3]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.2...v1.2.3

## [1.2.2] - 2018-09-20
Updated `tests` submodule to `3f5febc`.

Test changes summary:
- Various new `CREATE2` test cases
- `PUSH32` without bytes at the end

[1.2.2]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.1...v1.2.2

## [1.2.1] - 2018-08-30
Updated `tests` submodule to `691680a`.

Test changes summary:
- `CREATE2` init code tests
- Storage from self-destruct check (blockchain tests)
- Added sealEngine to the JSON schema
- `RLP` test fixes
- Bitshift instruction test changes (`SAR`)
- Changes in `CREATE` state tests and blockchain state tests

[1.2.1]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.2.0...v1.2.1

## [1.2.0] - 2018-06-22
- Updated `tests` submodule to `428842e` (`Byzantium` compatible, partly `Constantinople` compatible)

[1.2.0]: https://github.com/ethereumjs/ethereumjs-testing/compare/v1.1.1...v1.2.0

## [1.1.1] - 2018-06-22
- Updated `tests` submodule (`Byzantium` compatible, partly `Constantinople` compatible)
- Removed `BlockchainTests` limitation to `GeneralStateTests` subfolder
- Support for new `GeneralStateTests` format
- New `--dir` and `excludeDir` CL arguments
- Functionality for skipping tests
- Added API documentation in README
- New `examples/` folder with `read-single-file` and `read-tests-with-args` example
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

