const city = document.getElementById("city"),
  hour = document.getElementById("hour"),
  photo = document.getElementById("photo"),
  description = document.getElementById("description"),
  _1 = document.getElementById("1"),
  _2 = document.getElementById("2"),
  _3 = document.getElementById("3"),
  celeciouse = document.getElementById("celeciouse"),
  button = document.getElementById("button"),
  input = document.getElementById("input"),
  back = document.getElementById("back");

let url;

back.addEventListener("click", () => {
  document.querySelector(".place").style.display = "block";

  setTimeout(()=>{
    document.querySelector(".place").style.transform = "translate(0%)";
  },100)
  document.querySelector(".card").style.transform = "translate(300%)";
  setTimeout(()=>{
    document.querySelector(".card").style.display = "none";
  },2000)
});
input.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && input.value != "") {
    requestApi(input.value);
  }
});

function requestApi(city) {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=887380a78e9c0c82b024e1be687de9c1`;
  get();
}

button.addEventListener("click", () => {
  if (navigator.geolocation) {
    // if browser support geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess);
  } else {
    alert("Your browser not support geolocation api");
  }
});
function onSuccess(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=887380a78e9c0c82b024e1be687de9c1`;
  get();
}

async function get() {
  const response = await fetch(url);
  const data = await response.json();
  weatherDetails(data);
}

function weatherDetails(info) {
  if (info.cod == "404") {
    document.querySelector(".error").style.top = "30px";
  } else {
    document.querySelector(".error").style.top = "-30px";
    document.querySelector(".place").style.transform = "translate(-300%)";

    setTimeout(()=>{
      document.querySelector(".card").style.transform = "translate(0%)";
    },100)
    document.querySelector(".card").style.display = "block";
    setTimeout(()=>{
      document.querySelector(".place").style.display = "none";
    },2000)
    let ci = info.name;
    let country = info.sys.country;
    let id = info.weather[0].id;
    let temp = info.main.temp;
    let des = info.weather[0].description;
    let wind = info.wind.speed;
    let feels_like = info.main.feels_like;
    let humidity = info.main.humidity;
    if (id == 800) {
      photo.src = "icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      photo.src = "icons/storm.svg";
    } else if (id >= 600 && id <= 622) {
      photo.src = "icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      photo.src = "icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      photo.src = "icons/cloud.svg";
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      photo.src = "icons/rain.svg";
    }
    let date = new Date();
    city.innerHTML = ci;
    hour.innerHTML = `${date.getHours()} : ${date.getMinutes()}`;
    celeciouse.innerHTML = `${Math.floor(temp)} C`;
    description.innerHTML = des;
    _1.innerHTML = `<i class="fa-solid fa-wind"></i> ${wind} km/h`;
    _2.innerHTML = `<i class="fa-solid fa-temperature-low"></i> ${Math.floor(
      feels_like
    )} C`;
    _3.innerHTML = `<i class="fa-solid fa-droplet"></i> ${humidity} %`;
  }
}
