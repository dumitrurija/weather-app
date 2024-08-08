async function getData(cityName) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=20fbabb30b479af57c2b77377594cb40`)
    const data = await response.json()
    getCityName()
    setData(data)
  }
  catch(err) {
    console.error(err);
  }
}

getData()

function getCityName() {
  const input = document.querySelector(".search-city input")
  const submitBtn = document.querySelector(".search-city button")

  submitBtn.addEventListener("click", () => {
    const cityName = input.value
    getData(cityName)
  })
}

function setData(data) {
  let celsius = data.main.temp - 273.15
  
  const temperature = document.querySelector(".temperature")
  const cityName = document.querySelector(".city-name")
  const weatherType = document.querySelector(".weather-type")
  const humidityPercent = document.querySelector(".humidity-percent")
  const windSpeed = document.querySelector(".wind-speed")

  setEmoji(celsius)
  temperature.textContent = `${celsius.toFixed(1)}°C`
  cityName.textContent = data.name
  weatherType.textContent = data.weather[0].description
  humidityPercent.textContent = `${data.main.humidity}%`
  windSpeed.textContent = `${data.wind.speed}km/h`
}

function setEmoji(celsius) {
  const emoji = document.querySelector(".emoji i");
  emoji.className = ''

  if (celsius < -10) {
    emoji.classList.add('fa-solid', 'fa-snowflake');
  } else if (celsius >= -10 && celsius < 0) {
    emoji.classList.add('fa-solid', 'fa-icicles');
  } else if (celsius >= 0 && celsius < 10) {
    emoji.classList.add('fa-solid', 'fa-cloud-showers-heavy');
  } else if (celsius >= 10 && celsius < 20) {
    emoji.classList.add('fa-solid', 'fa-cloud');
  } else if (celsius >= 20 && celsius < 25) {
    emoji.classList.add('fa-solid', 'fa-cloud-sun');
  } else if (celsius >= 25 && celsius < 30) {
    emoji.classList.add('fa-solid', 'fa-sun'); 
  } else if (celsius >= 30 && celsius < 35) {
    emoji.classList.add('fa-solid', 'fa-smile-beam'); 
  } else if (celsius >= 35 && celsius < 40) {
    emoji.classList.add('fa-solid', 'fa-thermometer-three-quarters'); 
  } else if (celsius >= 40) {
    emoji.classList.add('fa-solid', 'fa-fire'); 
  } else {
    emoji.classList.add('fa-solid', 'fa-question'); 
  }
}