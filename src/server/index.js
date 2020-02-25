require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

//set up server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// your API calls

// example API call
app.get('/apod', async (req, res) => {
  console.log("\ngetting image")
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        console.log(image)
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

//API call to get rover information
app.get('/rover', async (req, res) => {
  console.log("\n\ngetting rover info")
    try {
        let info = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        let info2 = info.photo_manifest
        console.log(info.photo_manifest)
        res.send({ info2 })

    } catch (err) {
        console.log('error:', err);
    }
})
