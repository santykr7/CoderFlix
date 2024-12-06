const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const {connectDb} = require('./connection')
dotenv.config()
const {readdirSync} = require('fs')
const port = process.env.PORT || 8000

connectDb()
app.use(cors({
    origin:'*'
}))
app.use(express.json())

app.get('/',(req,res) => {
    res.send('Server is running')
})

readdirSync('./routes').map((route) =>
    app.use('/api',require(`./routes/${route}`)) 
)

app.listen(port,() => console.log(`server is running on ${port}`))
