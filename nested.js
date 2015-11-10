var Promise = require('bluebird')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var each = require('lodash.foreach')
var filter = require('lodash.filter')
var map = require('lodash.map')
var Url = require('url')


function handleError (err) {
  console.log('Oh no! An error:', err)
}

fs.readFile(__dirname + '/data/urls.json', 'utf8', function (err, data) {
  if (err) { handleError(err) }
  var urls = JSON.parse(data)

  urls.forEach(function (url) {
    request(url, function (err, data) {
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
  })
})
