import Promise from 'bluebird'
import fs from 'fs'
import request from 'superagent'
import cheerio from 'cheerio'
import Url from 'url'
import R from 'ramda'

const handleError = (err) => {
  console.log('Oh no! An error:', err)
}

const formatLinkFile = (anchors) => R.compose(
  (links) => JSON.stringify(links, null, '\n '),
  R.map((anchor) => { return anchor.attribs.href }, anchors)
)

const getLinks = R.compose(R.map((link) => { return link.attribs ? link.attribs.href : null }), R.values)
const replace = (memo, val) => {
  console.log(val, memo)
  memo.push(val[1])
  return memo
}


fs.readFile(__dirname + '/data/urls.json', 'utf8', (err, urls) => {
  if (err) { handleError(err) }

  R.forEach((url) => {
    request
      .get(url)
      .end((err, data) => {
        if (err) { handleError(err) }
        // var fileName = data.request.host + '.json'
        var $ = cheerio.load(data.text)
        var links = getLinks($('a'))

        // console.log(typeof $('a'))
        // var linkFile = JSON.stringify(links)

        console.log(links)

        // fs.writeFile(__dirname + '/data/' + fileName, linkFile, 'utf8', function (err) {
        //   if (err) { handleError(err) }
        //   console.log(fileName + ' written!')
        // })
    })
  }, JSON.parse(urls))
})
