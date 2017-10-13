const tape = require('tape')
const testing = require('../index.js')

tape('Test access tests', function (t) {
  t.test('should read a single test file', function (st) {
    const testData = testing.getSingleFile('GeneralStateTests/stCodeSizeLimit/codesizeValid.json')
    st.equal(testData.codesizeValid.env.currentCoinbase, '0x2adc25665018aa1fe0e6bc666dac8fc2697ff9ba')
    st.end()
  })

  t.test('should read tests from args', function (st) {
    let args = {}
    args.dir = 'GeneralStateTests/stCallCodes'
    args.file = 'callcall_00_d0g0v0'
    args.forkConfig = 'Byzantium'

    testing.getTestsFromArgs('BlockchainTests', (fileName, testName, test) => {
      return new Promise((resolve, reject) => {
        st.equal(test.genesisBlockHeader.coinbase, '0x2adc25665018aa1fe0e6bc666dac8fc2697ff9ba')
        resolve()
      }).catch(err => st.comment(err))
    }, args).then(() => {
      st.end()
    })
  })
})
