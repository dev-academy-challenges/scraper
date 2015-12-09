'use strict';

const Promise = require('bluebird')
const fs = require('fs')
const request = require('superagent')
const cheerio = require('cheerio')
const each = require('lodash.foreach')
const map = require('lodash.map')
const R = require('ramda')
const Url = require('url')
const filePath = __dirname + '/data/urls.json'

var readFileAsync = Promise.promisify(fs.readFile)

const extractUrls = R.compose(
  R.uniq,
  R.filter(href => R.match(/http/g, href).length > 0),
  R.map(anchor => anchor.attribs.href),
  R.filter(anchor => anchor.attribs && anchor.attribs.href),
  R.values
)


const requestAsync = (url) => {
  return new Promise((resolve, reject) => {
    let hostname = Url.parse(url).hostname

    request
      .get(url)
      .end((err, data) => {
        if (err) { reject(err) }
        var $ = cheerio.load(data.text)

        var links = R.filter(u => {
          let urlObj = Url.parse(u)
          return urlObj.hostname !== hostname
        }, extractUrls($('a')))

        resolve(links)
    })
  })
}

readFileAsync(filePath)
  .then(function (data) {
    var urls = JSON.parse(data)
    return Promise.map(urls, requestAsync)
  })
  .then(function (results) {
    console.log('result', results)
  })


// })
