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

const createMap = size =>
  new Array(size).fill(0).map(x => new Array(size).fill(0))

const map = createMap(1000)
const parseClaim = claim => {
  const [id, order] = claim.split(' @ ')
  const [location, size] = order.split(': ')
  const [x, y] = location.split(',').map(num => parseInt(num, 10))
  const [xLength, yLength] = size.split('x').map(num => parseInt(num, 10))

  const xMax = x + xLength
  const yMax = y + yLength

  for (let xIndex = x; xIndex < xMax; xIndex++) {
    for (let yIndex = y; yIndex < yMax; yIndex++) {
      map[xIndex][yIndex] = map[xIndex][yIndex] + 1
    }
  }
}

const countMap = map => {
  let conflicts = 0

  map.forEach(row => {
    row.forEach(coord => {
      if (coord >= 2) {
        conflicts++
      }
    })
  })

  return conflicts
}

rd.on('line', function(line) {
  logCount()

  parseClaim(line)
})

rd.on('close', function() {
  const conflicts = countMap(map)
  console.log('Merry Christmas: ', conflicts)
})
