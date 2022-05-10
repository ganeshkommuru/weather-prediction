console.log('client side js file loaded')



const formSelector = document.querySelector('form')
const inputSelector = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const messageThree = document.querySelector('#message-three')


formSelector.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageThree.textContent = ''
    messageTwo.textContent = ''

    const searchValue = inputSelector.value
    if(searchValue==''){
        messageOne.textContent = 'Please Enter Value'
        return
    }
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(searchValue)).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = 'Unable to Fetch the API'
        }else{
            messageOne.textContent = 'Temperature: ' + data.temperature
            messageTwo.textContent = 'FeelsLike: ' + data.feelslike
            messageThree.textContent = 'Address: ' + data.address
        }
    })
})
})