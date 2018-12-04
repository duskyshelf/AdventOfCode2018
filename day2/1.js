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

const hasBuilder = number => {
  return string => {
    const characters = string.split('')
    let hasNumber = false

    characters.forEach(char => {
      const charCount = (string.match(new RegExp(char, 'g')) || []).length

      if (charCount === number) {
        hasNumber = true
      }
    })

    return hasNumber
  }
}

const hasTwo = hasBuilder(2)
const hasThree = hasBuilder(3)

let twoCount = 0
let threeCount = 0
rd.on('line', function(line) {
  logCount()

  if (hasTwo(line)) {
    twoCount++
  }
  if (hasThree(line)) {
    threeCount++
  }
})

rd.on('close', function() {
  console.log('Merry Christmas: ', twoCount * threeCount)
})
