var Promise = require('bluebird')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var Url = require('url')
import { foreach, map } from 'ramda'



function handleError (err) {
  console.log('Oh no! An error:', err)
}

fs.readFile(__dirname + '/data/urls.json', 'utf8', (err, data) => {
  if (err) { handleError(err) }

  foreach((url) => {
    request(url, (err, data) => {
      if (err) { handleError(err) }
      var fileName = data.request.host + '.json'
      var $ = cheerio.load(data.body)
      var links = map($('a'), function (link) { return link.attribs.href })
      var linkFile = JSON.stringify(links)

      fs.writeFile(__dirname + '/data/' + fileName, linkFile, 'utf8', function (err) {
        if (err) { handleError(err) }
        console.log(fileName + ' written!')
      })
    })
  }, JSON.parse(data))
})
