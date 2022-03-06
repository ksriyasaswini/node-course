console.log('Client side JS')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


//messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    //console.log('location: '+ location)
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) =>{
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = (data.error)
            messageTwo.textContent = 'Loading...'
        }
        else {
            messageOne.textContent = data.address
            messageTwo.textContent = data.Info
            console.log(data.address)
            console.log(data.Info)
            console.log(Location)
        }
    })
})
})

