const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const sequelize = require('./util/database')
const path = require('path')

const cors = require('cors')
app.use(cors())

const admin_routes = require('./routes/admin')

app.use(bodyParser.json({ extended:false }))
app.use(express.static(path.join(__dirname,'public')))

app.use('/expenses', admin_routes)

sequelize.sync()
.then(result => {
    app.listen(4000)
    console.log("Synced with DB and app runing on port: ",4000)
}).catch(err => console.log(err))