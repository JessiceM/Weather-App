// Displays current time in Dallas
let currentDate = document.querySelector("h4");
let time = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let day = days[time.getDay()];
let hour = time.getHours();
let minutes = time.getMinutes();
currentDate.innerHTML = `${day} ${hour}:${minutes}`;

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
  axios.get(apiUrl).then(location);
}
//4B gets coordinates values and displays city then calls getTemp
function location(response) {
  let currentcity = document.querySelector("h1");
  currentcity.innerHTML = response.data.name;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

//4A & 5B. Final call for Submit and Current Button
function getTemp(response) {
  let Temp = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${Temp}`;
}
//2B. Get user coordinates
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
//1B. Current button clicks
let currentForm = document.querySelector("#current-input");
currentForm.addEventListener("click", getCurrentPosition);
