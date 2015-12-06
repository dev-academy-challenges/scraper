import pg from "pg"
const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/spider"

// SQL queries/commands
const createTable = "CREATE TABLE IF NOT EXISTS websites(url VARCHAR(512) PRIMARY KEY, data JSON)"
const insertUrls = "INSERT INTO websites(url) VALUES('https://news.ycombinator.com/news'),('http://www.reddit.com/'),('http://digg.com/')"
const selectUrls = "SELECT * FROM websites"

const client = new pg.Client(connectionString)

client.connect(err => {
  if (err) {
    return console.error('could not connect to postgres', err)
  }

  client.query(createTable, (err, result) => {
    if (err) {
      return console.error('error creating table', err)
    }

    client.query(selectUrls, (err, result) => {
      if (err) {
        return console.error('error getting urls from database', err)
      }

      if (result.rows.length === 0) {
        client.query(insertUrls, (err, result) => {
          if (err) {
            return console.error('error inserting urls from database', err)
          }

          console.log(result.rows)
          client.end()
        })

      } else {
        console.log('rows in the websites table ', result.rows)
        client.end()
      }
    })
  })
})
