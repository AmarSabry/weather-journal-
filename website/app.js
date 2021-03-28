/* Global Variables */
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=8ae885600acb895e515f984a67710499';
const unit = "&units=metric";
//click event
document.getElementById('generate').addEventListener('click', () => {
    let userZip = document.getElementById('zip');
    let userFeelings = document.getElementById('feelings');
    let countryCode = document.getElementById('country-code');
    // Check if User add zip-code 
    if (userZip.value && countryCode.value) {
        //getting the data
        getData(apiUrl + userZip.value + "," + countryCode.value + unit + apiKey).then((data) => {
            //check if the data is working fine
            if (data.cod == 200) {
                //post the data to the root we built in the server side
                postProjectData('/postData',
                    { name: data.name, temp: data.main.temp, date: newDate, userResponse: userFeelings.value }
                ).then((resData) => {
                    // Update UI 
                    document.getElementById('Your-city').innerHTML = data.name;
                    document.getElementById('temp').innerText = data.main.temp + '°C'
                    document.getElementById('date').innerText = newDate
                    document.getElementById('content').innerText = userFeelings.value
                })
            } else {
                document.querySelector('.viewer').innerHTML = "**City not found please check Zip code and country code**"
            }
            //handle error
        }).catch((error) => {
            console.log(error)
        })

    } else if (countryCode.value && !userZip.value) {
        // Handle the empty field of zipcode 
        alert('please enter the Zipcode');
    } else {
        alert('please enter the country code');
    }
})

// API's async functions
const getData = async (url = '') => {
    try {
        let request = await fetch(url)
        return await request.json()
    } catch (error) {
        console.log("error", error)
    }
}

// Post Data to server
const postProjectData = async (url = '', data = { temp: 0, date: '', userResponse: '' }) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    try {
        const resData = await response.json()
        return resData
    } catch (error) {
        console.log("error", error)
    }
}


// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()