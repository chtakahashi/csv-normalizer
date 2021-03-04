#!/usr/bin/env node

const readline = require('readline')

// split the incoming csv string with care for commas that appear inside quotes
const split = (line) => {
  return line.match(/("[^"]*")|[^,]+/g)
}

const convertDurationToSeconds = (time) => {
  let temp = time.split(':')
  return parseInt(temp[0]) * 3600
    + parseInt(temp[1]) * 60
    + parseFloat(temp[2])
}

const normalizeCsvLine = (line) => {
  const row = split(line)
  // perform no transformations on the header
  if (row[0] === 'Timestamp') {
    return line
  }
  // INDEX 0: address DateTime
  const date = new Date(row[0])
  // date is in Pacific Time. convert to Eastern (add 3 hours)
  date.setHours(date.getHours() + 3)
  row[0] = date.toISOString()
  // INDEX 1: no transformations other than Unicode verification

  // INDEX 2: ensure each zip code is 5 digits
  row[2] = `00000${row[2]}`.slice(-5)

  // INDEX 3: FullName - capitalize
  row[3] = row[3].toUpperCase()

  // INDEX 4: FooDuration - convert to seconds
  row[4] = convertDurationToSeconds(row[4])
  // INDEX 5: BarDuration - convert to seconds
  row[5] = convertDurationToSeconds(row[5])
  // INDEX 6: replace contents with foo + bar
  row[6] = row[4] + row[5]
  // INDEX 7: no transformations other than Unicode verification
  return row.join(',')
}

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.on('line', (line) => {
    try {
      const normalizedLine = normalizeCsvLine(line)
      console.log(normalizedLine)
    } catch (err) {
      console.error(err)
    }
  });
}

main();
