import {open} from 'node:fs/promises'

const numberStringToValueMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

function stringToNumber(string: string): string {
  const numbers = string.match(/^\d|\d\b|\d(?=\w)/g)

  if (numbers && numbers.length > 0) {
    return string
  }

  return numberStringToValueMap[string]
}

function forwardSearch(input: string): string {
  const numbers = input.match(
    /\d|\d\b|one|two|three|four|five|six|seven|eight|nine/g,
  )

  const numberArr =
    numbers?.map(numberString => stringToNumber(numberString)) || []

  console.log('forward search found:', numbers)

  return numberArr[0]
}

function backwardSearch(input: string): string {
  const numbers = input
    .split('')
    .reverse()
    .join('')
    .match(/\d|\d\b|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g)

  const numberArr =
    numbers?.map(numberString =>
      stringToNumber(numberString.split('').reverse().join('')),
    ) || []

  console.log(
    'backward search found:',
    numbers,
    input.split('').reverse().join(''),
  )

  return numberArr[0]
}

function numberAssembler(input: string) {
  return parseInt(forwardSearch(input) + backwardSearch(input), 10)
}

async function task2() {
  let theKey = 0
  const file = await open(process.cwd() + '/2023/assignment-01/input.txt')
  for await (const line of file.readLines()) {
    const numberAssembled = numberAssembler(line)
    console.log(numberAssembled)

    theKey += numberAssembled
  }

  return theKey
}

console.log(await task2())
