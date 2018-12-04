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

let subStrings
let solution = 'not found'
rd.on('line', function(line) {
  logCount()

  const idLength = line.length

  if (!subStrings) {
    subStrings = new Array(idLength).fill([])
  }

  for (let index = 0; index < idLength; index++) {
    const stringWithIndexRemoved =
      line.substr(0, index) + line.substr(index + 1)

    if (subStrings[index].indexOf(stringWithIndexRemoved) > 0) {
      solution = stringWithIndexRemoved
      rd.close()
    }
    subStrings[index] = [...subStrings[index], stringWithIndexRemoved]
  }
})

rd.on('close', function() {
  console.log('Merry Christmas: ', solution)
})
