const testing = require('../index.js')

let args = {}
args.dir = 'GeneralStateTests/stCallCodes'
args.forkConfig = 'Byzantium'

testing.getTestsFromArgs('BlockchainTests', (fileName, testName, test) => {
  return new Promise((resolve, reject) => {
    console.log(fileName)
    resolve()
  }).catch(err => console.log(err))
}, args).then(() => {
  console.log('Do something afterwards (e.g. t.end()).')
})
