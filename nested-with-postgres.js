import Promise from 'bluebird'
import fs from 'fs'
import pg from 'pg'
import request from 'superagent'
import cheerio from 'cheerio'
import Url from 'url'
import R from 'ramda'

const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/spider"

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

const db = new pg.Client(connectionString)

db.connect(err => {
  if (err) { handleError(err) }

  db.query('SELECT url FROM websites', (err, result) => {
    R.forEach((url) => {
      let hostname = Url.parse(url).hostname

      request
        .get(url)
        .end((err, res) => {
          if (err) { handleError(err) }

          let $ = cheerio.load(res.text)
          let links = R.filter(u => {
            let urlObj = Url.parse(u)
            return urlObj.hostname !== hostname
          }, extractUrls($('a')))

          let data = { links: links }

          console.log(url)

          db.query(`UPDATE websites SET data=$1 WHERE url=$2`, [data, url], (err, result) => {
            if (err) { handleError(err) }
            console.log('insert result', result, url)
            // console.log('result', result)


            db.query('SELECT * FROM websites', (err, result) => {
              if (err) { handleError(err) }

              result.rows.forEach(row => {
                console.log('row', row)
              })



              db.end()

            })
          })

      })
    }, R.map(row => row.url, result.rows))



  })
})
