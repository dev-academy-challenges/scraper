import Promise from 'bluebird'
import fs from 'fs'
import pg from 'pg'
import request from 'superagent'
import cheerio from 'cheerio'
import Url from 'url'
import R from 'ramda'

const handleError = (err) => {
  console.log('Oh no! An error:', err)
}

const extractUrls = R.compose(
  R.uniq,
  R.filter(href => R.match(/http/g, href).length > 0),
  R.map(anchor => anchor.attribs.href),
  R.filter(anchor => anchor.attribs && anchor.attribs.href),
  R.values
)

fs.readFile(__dirname + '/data/urls.json', 'utf8', (err, urls) => {
  if (err) { handleError(err) }

  R.forEach((url) => {
    let hostname = Url.parse(url).hostname

    request
      .get(url)
      .end((err, data) => {
        if (err) { handleError(err) }
        let fileName = hostname + '.json'
        let $ = cheerio.load(data.text)

        let links = R.filter(u => {
          let urlObj = Url.parse(u)
          return urlObj.hostname !== hostname
        }, extractUrls($('a')))

        let linkFile = JSON.stringify(links, null, '\n')

        console.log(links)

        fs.writeFile(__dirname + '/data/' + fileName, linkFile, 'utf8', function (err) {
          if (err) { handleError(err) }
          console.log(fileName + ' written!')
        })
    })
  }, JSON.parse(urls))
})
