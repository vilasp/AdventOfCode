import {open} from 'node:fs/promises'

// number iterator
function numberAssembler(input: string) {
  const numbers = input.match(/^\d+|\d+\b|\d+(?=\w)/g)
  const numberArr = numbers?.map(numberString => +numberString) || [0, 0]
  return numberArr[0] + numberArr[numberArr.length - 1]
}

async function assignment1() {
  let theKey = 0
  const file = await open(process.cwd() + '/2023/assignment-01/input.txt')
  for await (const line of file.readLines()) {
    theKey += numberAssembler(line)
  }

  return theKey
}

console.log(await assignment1())
