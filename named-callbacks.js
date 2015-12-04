import Promise from 'bluebird'
import fs from 'fs'
import request from 'request'
import cheerio from 'cheerio'
import { foreach, map, pipe } from 'ramda'


const fetchUrlsFromFile = (filePath, callback) => {
  fs.readFile(__dirname + filePath, 'utf8', function (err, data) {
    if (err) {
      callback(err)
    } else {
      foreach((url) => { request(url, callback) }, JSON.parse(data))
    }
  })
}

const formatLinkFile = (anchors) => R.compose(
  (links) => JSON.stringify(links, null, '\n '),
  map((anchor) => { return anchor.attribs.href }, anchors)
)



fetchUrlsFromFile('/data/urls.json', function (err, data) {
  if (err) {
    console.log('Oh no! An error: ', err)
  } else if (data) {
    var fileName = data.request.host + '.json'
    var $ = cheerio.load(data.body)
    var linkFile = formatLinkFile($('a'))

    fs.writeFile(__dirname + '/data/' + fileName, linkFile, 'utf8', function (err) {
      if (err) { handleError(err) }
      console.log(fileName + ' written!')
    })
  }
})
