const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
console.log('abcd')
const app = express()
const port= process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error:'you must provide an address!'})
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {
        if(error){
            return res.send({error})

        }
    
        forecast(latitude,longitude,(error,forecastdata)=>{
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search) {
        return res.send({
            error:'you must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})
//for particular call
app.get('/help/*',(req,res)=>{
    res.send('please check url')
})
//for all calls
app.get('*', (req, res) => {
    res.send('shut the fuck up nigga')
})

app.listen(port, () => {
    console.log('Server is up on port.'+port)
})



// const path=require('path')
// const express = require('express')
// const hbs=require('hbs')

// const app = express()

// //define paths for express config
// const viewspath=path.join(__dirname,'../templates/views')
// const partialspath=path.join(__dirname,'../template/partials')

// //setup handlebars engine and views location
// app.set('view engine','hbs')
// app.set('views',viewspath)
// hbs.registerPartials(partialspath)

// //setup static directory to serve
// //app.use(express.static(path.join(__dirname,'../public')))

// app.get('', (req, res) => {
//     res.render('index',{
//         title:'weather app',
//         name:'yo'
//     })
// })
// app.get('/about', (req, res) => {
//     res.render('about',{
//         title:'weather app',
//         name:'yo'
//     })
// })
// app.get('/help', (req, res) => {
//     res.render('help',{
//         title:'weather app',
//         name:'yo'
//     })
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast:'Your weather',
//         location:'philadelphia'
//     })
// })

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })