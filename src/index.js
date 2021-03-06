// Displays current time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastDaily");
  console.log(response.data.daily);
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="forecastDay">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="forecastTemp">
         <strong> <span class="forecastTemp-max" > ${Math.round(
           forecastDay.temp.max
         )}° </span></strong>|
          <span class="forecastTemp-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecastDay(coordinates) {
  console.log(coordinates);
  let apiKey = "e5d2f23cc936c207378a1d9745e0ab60";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//1A. Submit button clicks
let apiKey = "e5d2f23cc936c207378a1d9745e0ab60";
let form = document.querySelector("#weather-form");
form.addEventListener("click", replace);
let cityInput;

//2A. Replaces h1 city with the user input then calls userCityInput
function replace(event) {
  event.preventDefault();
  cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

//3A. userCityInput stores value from user input then calls getTemp function
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

//3B. Stores users coordinates then calls location function
let lat; //showPosition will update value here and location will retrieve value
let lon;
function showPosition(response) {
  lat = response.coords.latitude;
  lon = response.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(locaTion);
}
//4B gets coordinates values and displays city then calls getTemp
function locaTion(response) {
  let currentcity = document.querySelector("h1");
  currentcity.innerHTML = response.data.name;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}
//let Temp = null;
//4A & 5B. Final call for Submit and Current Button.....Displays Temp and weather icon
function getTemp(response) {
  let Temp = response.data.main.temp;
  let h2 = document.querySelector("h2");
  h2.innerHTML = Math.round(Temp);
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  let windDesc = document.querySelector("#wind");
  let description = document.querySelector("#description");
  windDesc.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  let currentDate = document.querySelector("#dateTime");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
  getForecastDay(response.data.coord);
}
//2B. Get user coordinates
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

//1B. Current button clicks
let currentForm = document.querySelector("#current-input");
currentForm.addEventListener("click", getCurrentPosition);
search("Dallas");
