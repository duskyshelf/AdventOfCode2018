const fs = require('fs');
var readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('./data.txt')
});

let count = 0;
const logCount = () => {
  count++;

  if (count % 10 === 0) {
    console.log('\x1b[2m%s\x1b[0m', count);
  }
};

let solution = 0;
rd.on('line', function(line) {
  logCount();

  solution += parseInt(line);
});

rd.on('close', function() {
  console.log('Merry Christmas: ', solution);
});
