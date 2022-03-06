const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode =  require('./utils/geocode')

const app = express()

const port = process.env.PORT || 3000

//define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views loc
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static dirctory to server
app.use(express.static(publicDirPath))

//app.com
app.get('', (req, res) => {
    //res.send('Hello Express')
    res.render('index', {
        title: 'Weather Application',
        name: 'Kandarpa',
        footer: 'home footer'
    })
})

//app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Hey this is yasaswini',
        title: 'Help',
        name: 'Kandarpa',
        footer: 'help footer'
    })
    //res.send('In Help Express')
})

//app.com/about
app.get('/about', (req, res) => {
    //app.use(express.static(about))
    res.render('about', {
        title: 'About me',
        name: 'Kandarpa',
        footer: 'about footer'
    })
    //res.send('<h1>In about page</h1>')
})

//app.com/Weather
app.get('/weather', (req, res) => {
    //res.send('In weather page')
    if(!req.query.address) {
        res.send({
            error: 'U must provide a search term'
        })
    }
    else{
        geocode.geocode(req.query.address, (error, {latitude, Longitude, Location}={}) => {
            if (error) {
                return res.send({error})
            }
        
            forecast(latitude, Longitude, (error, data) => {
                if(error) {
                    return res.send({error})
                } else {
                    res.send({
                        Location:req.query.address,
                        address:Location,
                        Info: data
                    })
                }
              })
        })
    }

})



app.get('/products', (req, res)=> {
    if(!req.query.search) {
        res.send({
            error: 'U must provide a search term'
        })
    }
    else{
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error page',
        errorMsg: 'help article not found',
        footer: 'Error footer'
    })
    //res.send('help article not found')

})
app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        title: 'Error page',
        errorMsg: '404 Error. Page not found',
        footer: 'Error footer'
    })
})

app.listen(3000, () => {
    console.log('server is up at '+ port )
})