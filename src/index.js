// Displays current time in Dallas
function timeDate(timestamp) {
  let currentDate = document.querySelector("#dateTime");
  let time = new Date(timestamp);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let day = days[time.getDay()];
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  currentDate.innerHTML = `${day} ${hour}:${minutes}`;
  return `${day} ${hours}:${minutes}`;
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
  let city = document.querySelector("h1");
  city.innerHTML = cityInput.value;
  userCityInput();
}
//3A. userCityInput stores value from user input then calls getTemp function
function userCityInput(response) {
  let city = cityInput.value;
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
let Temp = null;
//4A & 5B. Final call for Submit and Current Button.....Displays Temp and weather icon
function getTemp(response) {
  Temp = response.data.main.temp;
  let h2 = document.querySelector("h2");
  h2.innerHTML = Math.round(Temp);
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}
//2B. Get user coordinates
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

//1B. Current button clicks
let currentForm = document.querySelector("#current-input");
currentForm.addEventListener("click", getCurrentPosition);

// Displays fahren
function displayFahren(event) {
  event.preventDefault(); //don't open browser
  let temp = document.querySelector("h2");
  //Remove the active class the celsius link
  celsiusLink.classList.remove("active");
  fahrenLink.classList.add("active");
  let fahrenTemp = (Temp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenTemp);
}

// Displays back to celcius
function displayCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("h2");
  celsiusLink.classList.add("active");
  fahrenLink.classList.remove("active");

  temp.innerHTML = Math.round(Temp);
}

let fahrenLink = document.querySelector("#fahrenConvert");
fahrenLink.addEventListener("click", displayFahren);

let celsiusLink = document.querySelector("#celsiusConvert");
celsiusLink.addEventListener("click", displayCelsius);
