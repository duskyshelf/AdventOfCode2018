const fs = require('fs')
const readline = require('readline')

let count = 0
const logCount = () => {
  count++

  if (count % 100 === 0) {
    console.log('\x1b[2m%s\x1b[0m', count)
  }
}

let solutionNotFound = true
let frequency = 0
let frequencies = [0]

const findSolution = () => {
  const rd = readline.createInterface({
    input: fs.createReadStream('./data.txt')
  })

  rd.on('line', function(line) {
    logCount()
    const change = parseInt(line)

    frequency += change

    if (frequencies.find(el => el === frequency) && solutionNotFound) {
      console.log('Merry Christmas: ', frequency)
      solutionNotFound = false
    }

    frequencies.push(frequency)
  })

  rd.on('close', function(line) {
    if (solutionNotFound) {
      findSolution()
    }
  })
}

findSolution()
