const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const pathPublicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// set up handlebars engine and views location

app.set('view engine', 'hbs')  //from  hbs file for dynamic content
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve

app.use(express.static(pathPublicDirectory))


//app.get('',(req,res)=>{       // get replace by app.use(express.static(pathPublicdirectory))
//    res.send('<h1>Hello Express !</h1>')  // passing html 
//})



//app.get("/help",(req,res)=>{   //help page 
//    //res.send("Help page")
//    res.send([{                     //passing json object 
//        name:'hrithik',
//        age:21 
//    },{
//        name : 'shiva',
//        age: 20
//    }])
//})
//app.com
//app.com/help
//app.com/about

//app.get('/about',(req,res)=>{  //about page
//    //res.send('About page')
//    res.send('<h1>About Title</h1>')
//})

app.get('',(req,res)=>{             //setting route for index.hbs page
    res.render('index',{
        title:'Weather App',
        name : 'Hrithik'
    })
})

app.get('/about',(req,res)=>{         //setting route for about.hbs page 
    res.render('about',{
        title : 'About Us Page',
        name : 'Hrithik'
    })               // in this line about is the name of the file which need to we view or render in web browser 
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText : 'This is some help tips.',
        title : 'Help Page '
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })





    //res.send('Weather Page')
    //res.send({
    //    forecast: 'it is raining ',
    //    location : 'jhansi',
    //    addrress : req.query.address
    //
    //})
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res)=>{
    //res.send('Help article not found!')
    res.render('404',{
        name:'Hrithik',
        title : 'Help Error!',
        errorMessage : 'hELP ARTICLE not exists !'
    })
})

app.get('*',(req,res)=>{
    //res.send('my 404 error page')
    res.render('404',{
        title : '404 Error !',
        name : 'Hrithik',
        errorMessage : 'Page does not exists'
    })
})

app.listen(port,()=>{
    console.log("server is up on port" + port)
})