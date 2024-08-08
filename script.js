async function getData(cityName) {
  const errorEl = document.querySelector("#error")
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=20fbabb30b479af57c2b77377594cb40`)
    const data = await response.json()

    errorEl.style.display = 'none'
    setData(data)
  }
  catch {
    document.querySelector(".main-info").style.display = "none"
    errorEl.style.display = 'block'
    errorEl.innerHTML = `<h4>Please, enter a city</h4>`
    errorEl.classList.add('error-animation');

    setTimeout(() => {
      errorEl.classList.remove('error-animation');
    }, 500)
  }
}

function getCityName() {
  const input = document.querySelector(".search-city input")
  const submitBtn = document.querySelector(".search-city button")

  input.focus()

  function handleCitySearch() {
    let cityName = input.value
    
    cityName = cityName[0].toUpperCase() + cityName.slice(1).toLowerCase()
    
    getData(cityName)
    input.value = ""
  }

  submitBtn.addEventListener("click", handleCitySearch)
  document.body.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      handleCitySearch()
    }
  })
}

getCityName()

function setData(data) {
  const container = document.querySelector(".container")
  const mainInfoEl = document.querySelector(".main-info")
  const searchCity = document.querySelector(".search-city")
  const detailsEl = document.querySelector(".details")

  container.style.justifyContent = "space-between"
  mainInfoEl.style.display = "flex"
  detailsEl.style.display = "flex"
  

  let celsius = data.main.temp - 273.15
  
  const temperature = document.querySelector(".temperature")
  const cityName = document.querySelector(".city-name")
  const weatherType = document.querySelector(".weather-type")
  const humidityPercent = document.querySelector(".humidity-percent")
  const windSpeed = document.querySelector(".wind-speed")

  setEmoji(celsius)
  temperature.textContent = `${celsius.toFixed(1)}°C`
  cityName.textContent = `${data.name}, ${data.sys.country}`
  weatherType.textContent = data.weather[0].description
  humidityPercent.textContent = `${data.main.humidity}%`
  windSpeed.textContent = `${data.wind.speed}km/h`
}

function setEmoji(celsius) {
  const emoji = document.querySelector(".emoji i")
  emoji.className = ''

  if (celsius < -10) {
    emoji.classList.add('fa-solid', 'fa-snowflake')
    emoji.style.color = "#b0e0e6"
  } else if (celsius >= -10 && celsius < 0) {
    emoji.classList.add('fa-solid', 'fa-icicles')
    emoji.style.color = "#87ceeb"
  } else if (celsius >= 0 && celsius < 10) {
    emoji.classList.add('fa-solid', 'fa-cloud-showers-heavy')
    emoji.style.color = "#4682b4"
  } else if (celsius >= 10 && celsius < 20) {
    emoji.classList.add('fa-solid', 'fa-cloud')
    emoji.style.color = "#a9a9a9" 
  } else if (celsius >= 20 && celsius < 25) {
    emoji.classList.add('fa-solid', 'fa-cloud-sun')
    emoji.style.color = "#f0e68c"
  } else if (celsius >= 25 && celsius < 30) {
    emoji.classList.add('fa-solid', 'fa-sun')
    emoji.style.color = "#fdb813"
  } else if (celsius >= 30 && celsius < 35) {
    emoji.classList.add('fa-solid', 'fa-smile-beam') 
    emoji.style.color = "#ff4500"
  } else if (celsius >= 35 && celsius < 40) {
    emoji.classList.add('fa-solid', 'fa-thermometer-three-quarters') 
    emoji.style.color = "#ff6347" 
  } else if (celsius >= 40) {
    emoji.classList.add('fa-solid', 'fa-fire') 
    emoji.style.color = "#ff4500"
  } else {
    emoji.classList.add('fa-solid', 'fa-question') 
    emoji.style.color = "#696969"
  }
}
