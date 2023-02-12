import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './config/db.js'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema/schema.js'

const app = express()
const port = process.env.PORT || 4000

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'Development'
}))

connectDB()
app.listen(port, () => console.log(`server is live at port: ${port}`))
