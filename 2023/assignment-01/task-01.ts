import {open} from 'node:fs/promises'

// number iterator
function numberAssembler(input: string) {
  const numbers = input.match(/^\d|\d\b|\d(?=\w)/g)
  const numberArr = numbers?.map(numberString => numberString) || []
  if (numberArr.length === 1) {
    return parseInt(numberArr[0] + numberArr[0], 10)
  }
  if (numberArr.length > 1) {
    return parseInt(numberArr[0] + numberArr[numberArr.length - 1], 10)
  }

  return 0
}

async function task1() {
  let theKey = 0
  const file = await open(process.cwd() + '/2023/assignment-01/input.txt')
  for await (const line of file.readLines()) {
    const numberAssembled = numberAssembler(line)
    theKey += numberAssembled
  }

  return theKey
}

console.log(await task1())
