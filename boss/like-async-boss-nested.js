import R from 'ramda'
import fs from 'fs'
import shuffleWords from 'shuffle-words'
import request from 'superagent'

const forEachIndexed = R.addIndex(R.forEach)

const subordinateFunc = (dataSource, callback) => {
  console.log('subordinate fetching data....')
  request
    .get(dataSource.url)
    .end((err, res) => {
      if (err) {
        handleError(err)
      } else {
        const report = generateReport(res.text)
        callback(report)
      }
    })
  console.log('another day, another dollar')
}

const pietFunc = subordinateFunc
const charlesFunc = subordinateFunc
const joshFunc = subordinateFunc

const handleError = (err) => {
  console.log('Oh no! An error:', err)
}

const generateReport = (info) => {
  return R.take(12, shuffleWords(info))
}

const dataSources = [
  { url: 'https://baconipsum.com/api/?type=meat-and-fille&format=text' },
  { url: 'https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1&format=text' },
  { url: 'https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text' },
]

const doBossStuff = () => console.log('doing boss stuff...')

const smokeCigar = (options) => {
  console.log('All reports have been published!')
  if (options.cuban) {
    console.log("Ahh...life is good")
  }
}

const publishReport = (report) => {
  console.log('report: ', report)
}

const bossFunc = (dataSources) => {
  const subordinates = [
    pietFunc,
    charlesFunc,
    joshFunc,
  ]

  const count = subordinates.length

  forEachIndexed((subordinateFunc, i)  => {
    request
      .get(dataSources[i].url)
      .end((err, res) => {
        if (err) {
          handleError(err)
        } else {
          publishReport(generateReport(res.text))

          counter --
          if (counter === 0) {
            smokeCigar({ cuban: true })  //All reports have been published! Time to relax!
          }

        }
      })

  }, subordinates)

  doBossStuff() //I get to do my boss stuff right away!

}

const simonFunc = bossFunc

simonFunc(dataSources)
