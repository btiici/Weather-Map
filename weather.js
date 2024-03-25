const input = document.querySelector('.input')
const weatherForm = document.querySelector('.weatherForm')
const card = document.querySelector('.card')
const apiKey = '49437a6de8378a4025f733428bfc1cd9'

weatherForm.addEventListener("submit", async event => {
    event.preventDefault()

    const city = input.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData);
        }
        catch(error){
            displayError(error);
        }
    }else{
        displayError("Please enter a city")
    }

    if(event.key === 'Enter'){
        event.preventDefault()

        const city = input.value;
    
        if(city){
            try{
                const weatherData = await getWeatherData(city)
                displayWeatherInfo(weatherData);
            }
            catch(error){
                displayError(error);
            }
        }else{
            displayError("Please enter a city")
        }
    
    }
})

function displayWeatherInfo(data){
    const {name: city,
           main:{temp, humidity}, 
           weather:[{description, id}]} = data;

           card.textContent='';
           card.style.display = "flex";

    const cityName = document.createElement('h1')
    const weatherTemp = document.createElement('p')
    const weatherHum = document.createElement('p')
    const weatherDesc = document.createElement('p')
    const weatherEmoji = document.createElement('p')

    cityName.classList.add('cityName')
    weatherTemp.classList.add('weatherTemp')
    weatherHum.classList.add('weatherHum')
    weatherDesc.classList.add('weatherDesc')
    weatherEmoji.classList.add('weatherEmoji')
    
    cityName.textContent = city;
    weatherTemp.textContent = ((temp - 273.15).toFixed(1)) + '°C';
    weatherHum.textContent = `Humidity: ${humidity}%`;
    weatherDesc.textContent = description;
    weatherEmoji.textContent = getweatherEmoji(id)

    card.appendChild(cityName)
    card.appendChild(weatherTemp)
    card.appendChild(weatherHum)
    card.appendChild(weatherDesc)
    card.appendChild(weatherEmoji)
    
}

async function getWeatherData(city) {

const  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

const response = await fetch(apiUrl)
if(!response.ok){
    throw new Error('Could not fetch weather data')
}

return await response.json()

}

function getweatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦";
        case (weatherId >= 500 && weatherId < 600):
            return "☁️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "😶‍🌫️";
        case (weatherId === 800):
        return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return'❓'
    }
}

function displayError(message){
    const errorDisplay = document.createElement('p')
    errorDisplay.textContent = message
    errorDisplay.classList.add('.error')

    card.textContent ='';
    card.style.display = 'flex';

    card.appendChild(errorDisplay)
}





