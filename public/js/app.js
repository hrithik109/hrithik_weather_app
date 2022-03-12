console.log('client side javascript is loaded up')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageone.textContent = 'From JavaSCript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    //console.log('testing')
    // goal to fetch data from http request
    messageone.textContent = 'Loading...' 
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //console.log(data.error)
                messageone.textContent = data.error 

            }else{
                //console.log(data.forecast)
                //console.log(data.location)
                messageone.textContent = data.location
                messageTwo.textContent = data.forecast

            }
        })
    })
})