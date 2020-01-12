//window.alert("Hello! I am an alert box!!");

console.log('Hello js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''

    fetch('http://localhost:3000/weather?location=' + search.value).then((response)=> {
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error
                //console.log(data.error)
            }
            else{
                msg1.textContent = 'The current temperature is ' + data.temperature
                msg2.textContent = 'Location: ' + data.location
                msg3.textContent = 'Summary: ' + data.summary
            }
        })
    }) 
})