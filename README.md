# CSV normalizer
This program normalizes a CSV file according to certain requirements.

## Dependencies
Your computer will need to have the [NodeJS](https://nodejs.org/en/) runtime environment installed.

## Usage
1. Clone this repository and cd into the directory
2. Program can be run with the following command with an input file in the same folder and your chosen output file name:
```
node normalizer < sample.csv > output.csv
```

## Summary
* Used Node's built-in [Readline](https://nodejs.org/dist/latest-v14.x/docs/api/readline.html) API to access the input/output files via stdin/stdout
* Used Node's built-in [Buffer](https://nodejs.org/dist/latest-v14.x/docs/api/buffer.html) API to fix Unicode character encodings
* Columns such as date, foo/barDuration throw errors if inputs are not of a readable format
