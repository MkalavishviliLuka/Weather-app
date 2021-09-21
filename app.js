// API fetch
let myApi = '0c46ca046c933b9febab9981c5846ca1'
let url;
let cityName;
let cityDescription;
let cityDegree;
let cityTemp;
let response;
let cityHumidity;

// Elements
let search = document.getElementById('search')
let but = document.getElementById('but')
let city = document.getElementById('city')
let degree = document.getElementById('degree')
let type = document.getElementById('type')
let iconSrcLeft = document.getElementById('icon1')
let iconSrcRight = document.getElementById('icon2')
let humidity = document.getElementById('humidity')
let valid = document.getElementById('valid')

//API request 
async function sendRequest() {
    response = await fetch(url)
    var alldata = await response.json()
    useApiData(alldata)
}

function useApiData(data) {
    if (!data.main) {
        alert('Enter valid city name')
    }
    generalDescription = data.weather
    cityDegree = data.main
    // 
    cityTemp = Math.round(cityDegree.temp - 273)
    cityName = data.name
    cityDescription = generalDescription[0].description
    icon = generalDescription[0].icon
    cityHumidity = cityDegree.humidity
    // 
    city.innerHTML = cityName
    degree.innerHTML = cityTemp + '°'
    type.innerHTML = cityDescription
    humidity.innerHTML = cityHumidity + '%'
    iconSrcLeft.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    iconSrcRight.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
}

// Loader
let loading = document.getElementById('loading')
let opNum = 1;
let myInt;

setTimeout(() => {
    myInt = setInterval(() => {
        opNum -= 0.05
        if (opNum < 0) {
            clearInterval(myInt)
        }
        loading.style.opacity = opNum
    }, 50);
}, 2400);

setTimeout(() => {
    loading.style.display = 'none'
}, 3000);

// EventListner
but.addEventListener('click', () => {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${myApi}`
    sendRequest()
})

// Color Change
let inputback = document.getElementById('inputback')
let circle = document.getElementById('circle')
let clicked = true
let options = document.getElementById('options')
let container = document.getElementById('container')
let holder = document.getElementById('holder')

inputback.addEventListener('click', () => {
    clicked = !clicked
    if (clicked == false) {
        circle.style.backgroundImage = 'url(moon.jpg)'
        circle.style.transform = 'translate(50%, -50%)'
        options.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
        holder.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
        but.style.backgroundColor = 'white'
        but.style.color = 'rgba(0, 0, 0, 0.9)'
        search.style.backgroundColor = 'white'
        search.classList.remove('lightsearch')
        search.classList.add('darksearch')
        search.style.color = 'black'
    } else {
        circle.style.backgroundImage = 'url(sun.png)'
        circle.style.transform = 'translate(-10%, -50%)'
        options.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
        holder.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
        but.style.backgroundColor = 'rgba(102, 101, 101, 0.7)'
        but.style.color = 'white'
        search.style.backgroundColor = 'rgba(102, 101, 101, 0.7)'
        search.classList.remove('darksearch')
        search.classList.add('lightsearch')
        search.style.color = 'white'
    }
})

// Key pressed
document.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        but.click()
    }
});


document.addEventListener('keypress', (event) => {
    search.focus()
})