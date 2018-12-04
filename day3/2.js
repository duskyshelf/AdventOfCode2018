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
const ids = {}
const parseClaim = claim => {
  const [id, order] = claim.split(' @ ')
  const [location, size] = order.split(': ')
  const [x, y] = location.split(',').map(num => parseInt(num, 10))
  const [xLength, yLength] = size.split('x').map(num => parseInt(num, 10))

  const xMax = x + xLength
  const yMax = y + yLength

  for (let xIndex = x; xIndex < xMax; xIndex++) {
    for (let yIndex = y; yIndex < yMax; yIndex++) {
      if (map[xIndex][yIndex] !== 0) {
        ids[id] = false
        ids[map[xIndex][yIndex]] = false
      }

      map[xIndex][yIndex] = id

      if (ids[id] === undefined) {
        ids[id] = true
      }
    }
  }
}

const findGoodIds = list => {
  const goodIds = []
  for (const key in list) {
    if (list[key]) {
      goodIds.push(key)
    }
  }
  return goodIds
}

rd.on('line', function(line) {
  logCount()

  parseClaim(line)
})

rd.on('close', function() {
  const goodGuys = findGoodIds(ids)
  console.log('Merry Christmas: ', goodGuys)
})
