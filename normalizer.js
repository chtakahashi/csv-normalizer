#!/usr/bin/env node

const readline = require('readline')

// split the incoming csv line with care for commas that appear inside quotes
const split = (line) => {
  return line.match(/("[^"]*")|[^,]+/g)
}

// replace invalid UTF8 characters
const replaceInvalidUtf = (str) => {
  if (typeof str === 'number' || typeof str === 'float') {
    return str
  }
  const buf = Buffer.from(str || '', 'utf8')
  return buf.toString()
}

const convertDurationToSeconds = (time) => {
  let temp = time.split(':')
  return parseInt(temp[0]) * 3600
    + parseInt(temp[1]) * 60
    + parseFloat(temp[2])
}

const convertRfc = (date) => {
  function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }
  return date.getUTCFullYear() +
    '-' + pad(date.getUTCMonth() + 1) +
    '-' + pad(date.getUTCDate()) +
    'T' + pad(date.getUTCHours()) +
    ':' + pad(date.getUTCMinutes()) +
    ':' + pad(date.getUTCSeconds()) +
    'Z';
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
  row[0] = convertRfc(date)
  // INDEX 1: no transformations other than Unicode verification
  // INDEX 2: ensure each zip code is 5 digits.
  row[2] = `00000${row[2]}`.slice(-5)
  // INDEX 3: FullName - capitalize
  row[3] = row[3].toUpperCase()
  // INDEX 4 and 5: FooDuration, BarDuration - convert to seconds
  const foo = convertDurationToSeconds(row[4])
  const bar = convertDurationToSeconds(row[5])
  if (isNaN(foo) || isNaN(bar)) {
    throw new Error('cannot parse foo or barDuration')
  }
  row[4] = foo.toFixed(3)
  row[5] = bar.toFixed(3)
  // INDEX 6: replace contents with foo + bar
  row[6] = (foo + bar).toFixed(3)
  // INDEX 7: no transformations other than Unicode verification

  // unicode verification
  return row.map((col) => replaceInvalidUtf(col)).join(',')
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
