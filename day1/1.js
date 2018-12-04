const fs = require('fs')
const readline = require('readline')

const rd = readline.createInterface({
  input: fs.createReadStream('./data.txt')
})

let count = 0
const logCount = () => {
  count++

  if (count % 100 === 0) {
    console.log('\x1b[2m%s\x1b[0m', count)
  }
}

let frequency = 0
rd.on('line', function(line) {
  logCount()

  frequency += parseInt(line)
})

rd.on('close', function() {
  console.log('Merry Christmas: ', frequency)
})
