import {open} from 'node:fs/promises'

async function assignment1() {
  let theKey = 0
  const file = await open(process.cwd() + '/2023/assignment-02/input.txt')
  for await (const line of file.readLines()) {)
    console.log(line)

    theKey += 1
  }

  return theKey
}

console.log(await assignment1())
