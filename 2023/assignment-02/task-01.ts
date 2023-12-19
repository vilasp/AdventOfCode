import {open} from 'node:fs/promises'

type Game = {
  red: number
  blue: number
  green: number
  id: number
}

const CONFIGURATION = {
  red: 12,
  green: 13,
  blue: 14,
}

function parseCubesFromGame(game: string): Game {
  const maxCubesByColor = {
    red: 0,
    blue: 0,
    green: 0,
    id: 0,
  }

  for (const match of game.matchAll(
    /(?<id>(?<=Game )\d+)|(?<blue>\d+(?= blue))|(?<red>\d+(?= red))|(?<green>\d+(?= green))/g,
  )) {
    const numberOfCubes = parseInt(match[0], 10)

    if (match.groups?.red && numberOfCubes > maxCubesByColor.red) {
      maxCubesByColor.red = numberOfCubes
    } else if (match.groups?.blue && numberOfCubes > maxCubesByColor.blue) {
      maxCubesByColor.blue = numberOfCubes
    } else if (match.groups?.green && numberOfCubes > maxCubesByColor.green) {
      maxCubesByColor.green = numberOfCubes
    } else if (match.groups?.id) {
      maxCubesByColor.id = numberOfCubes
    }
  }

  return maxCubesByColor
}

function validateGameAgainstGameConfiguration(game: Game): boolean {
  if (
    game['red'] <= CONFIGURATION['red'] &&
    game['blue'] <= CONFIGURATION['blue'] &&
    game['green'] <= CONFIGURATION['green']
  ) {
    return true
  }
  return false
}

async function task() {
  let theKey = 0
  const file = await open(process.cwd() + '/2023/assignment-02/input.txt')
  for await (const line of file.readLines()) {
    const game = parseCubesFromGame(line)
    if (validateGameAgainstGameConfiguration(game)) {
      theKey += game.id
    }
  }

  return theKey
}

console.log(await task())
