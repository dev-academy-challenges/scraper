var Promise = require('bluebird')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var each = require('lodash.foreach')
var filter = require('lodash.filter')
var map = require('lodash.map')
var Url = require('url')

function filterUrls (url) {
  if (!url) { return false }
  var parsed = Url.parse(url)
  if (!parsed.protocol) { return false }
  return parsed.protocol.slice(0, 4) === 'http'
}




fs.readFile(__dirname + '/data/urls.json', 'utf8', function (err, data) {
  var urls = JSON.parse(data)

  urls.forEach(function (url) {
    var parsed = Url.parse(url)
    var fileName = parsed.hostname + '.json'

    request(url, function (err, data) {
      var $ = cheerio.load(data.body)
      var links = $('a')
      var urls = map(links, function (link) { return link.attribs.href })
      var fullUrls = JSON.stringify(filter(urls, filterUrls), null, ' ')

      fs.writeFile(__dirname + '/data/' + fileName, fullUrls, 'utf8', function (err) {
        console.log(fileName + ' written!')
      })
    })
  })
})
