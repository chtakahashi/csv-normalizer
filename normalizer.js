#!/usr/bin/env node

const readline = require('readline')

const normalizeCsvLine = (line) => {
  // TO DO:
  // For all rows: Invalid characters can be replaced with the Unicode Replacement Character. If that replacement makes data invalid (for example, because it turns a date field into something unparseable), print a warning to stderr and drop the row from your output.
  // Timestamp to RFC3339 format + convert to US/Eastern time
  // ZIP codes should be 5 digits. pad missing leading zeros
  // Address - Unicode validation only
  // Foo duration and bar durations - convert these to total number of seconds.
  // totalDuration = fooduration + barduration
  // no transformation
  return line
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (line) => {
  const normalizedLine = normalizeCsvLine(line)
  console.log(normalizedLine)
});
