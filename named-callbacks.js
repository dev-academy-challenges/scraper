var Promise = require('bluebird')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var each = require('lodash.foreach')
var map = require('lodash.map')

function fetchUrlsFromFile (filePath, callback) {
  fs.readFile(__dirname + filePath, 'utf8', function (err, data) {
    if (err) {
      callback(err)
    } else {
      var urls = JSON.parse(data)
      urls.forEach(function (url) {
        request(url, callback)
      })
    }
  })
}

fetchUrlsFromFile('/data/urls.json', function (err, data) {
  if (err) {
    console.log('Oh no! An error: ', err)
  } else if (data) {
    var fileName = data.request.host + '.json'
    var $ = cheerio.load(data.body)
    var links = map($('a'), function (link) { return link.attribs.href })
    var linkFile = JSON.stringify(links, null, ' ')

    fs.writeFile(__dirname + '/data/' + fileName, linkFile, 'utf8', function (err) {
      if (err) { handleError(err) }
      console.log(fileName + ' written!')
    })
  }
})
