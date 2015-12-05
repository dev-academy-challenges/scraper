import pg from 'pg'
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/links'

const client = new pg.Client(connectionString)
client.connect()

const createTable = 'CREATE TABLE IF NOT EXISTS links(url VARCHAR(512), data JSON)'
const query = client.query(createTable)
query.on('end', () => { client.end() })
