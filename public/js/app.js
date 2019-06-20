console.log('client side js file')

const weatherform=document.querySelector('form.weather')
const search=document.querySelector('input')
const err=document.querySelector('p.error')
const forecast=document.querySelector('p.forecast')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
  const loc=search.value
 fetch('/weather?address='+loc).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
           err.textContent=error
        }else{
            forecast.textContent='the laction you entered is: '+data.location'the forecast is:'+data.forecast
        }
    })
})
})

// fetch('http://localhost:3000/weather?addres'+location).then((response)=>{
//     response.json().then((data)=>{
//         if(data.error)
//         {console.log(error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })