import R from 'ramda'
import fs from 'fs'
import shuffleWords from 'shuffle-words'

const subordinateFunc = (dataSource, instructions) => {
  console.log('another day, another dollar')
  if (instructions.generateReport) {
    const info = fs.readFileSync(__dirname + dataSource.path, 'utf8') //load info into memory
    return generateReport(R.join(' ', JSON.parse(info)))
  } else {
    return null
  }
}

const writeReport = (info) => {
  return R.take(10, shuffleWords(info))
}

const pietFunc = subordinateFunc
const charlesFunc = subordinateFunc
const joshFunc = subordinateFunc

const dataSources = [
  { path: '/data/lorem-1.json' },
  { path: '/data/lorem-1.json' },
  { path: '/data/lorem-1.json' },
]

const doBossStuff = () => console.log('doing boss stuff')

const smokeCigar = (options) => {
  if (options.cuban) {
    console.log("Ahh, life is good")
  }
}

const publishReport = (report) => {
  console.log('report: ', report)
}

const bossFunc = (dataSources) => {
  // let's have a meeting!
  const reports = [
    pietFunc(dataSources[0], { writeReport: true }),
    charlesFunc(dataSources[1], { writeReport: true }), //We're waiting for you Piet...
    joshFunc(dataSources[2], { writeReport: true }), //We're waiting for you Charles...
  ]

  doBossStuff() //finally I get to do my boss stuff...

  R.forEach(publishReport, reports)

  // Reports published! Finally I get to smoke my cigar...
  smokeCigar({ cuban: true })
}

const simonFunc = bossFunc

simonFunc(dataSources)
