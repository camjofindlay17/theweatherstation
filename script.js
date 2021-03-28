let search = document.getElementById("search")
let input = document.getElementById("input")
let ul = document.querySelector("ul")
let hist = document.getElementById("renderSearches")
let live = document.getElementById("location")
let uV = document.getElementById("uv")
let i1 = document.getElementById("img1")
let i2 = document.getElementById("img2")
let i3 = document.getElementById("img3")
let i4 = document.getElementById("img4")
let i5 = document.getElementById("img5")

// let autocomplete
// function initAutocomplete () {
//   autocomplete = new google.maps.places.Autocomplete(
//     document.getElementById("autocomplete"))
// }


let saveZip = function(e) {
  e.preventDefault()
  if (input.value == "") {
    confirm("Error: Please enter a zip code!")
  } else {
    const zip = input.value
    localStorage.setItem("zipcode", zip);
  }
}

const zipCode = JSON.parse(localStorage.getItem("zipcode"))

const searchList = (text) => {
  const li = document.createElement("li")
  li.textContent = text
  ul.appendChild(li)
}


function renderInfo() {
  const calls = document.getElementById("input").value
  let today = moment()
  let requestURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + calls + ",US&units=imperial&appid=59948208350e6af8ced51673faaaf707"
  let info = document.getElementById("displayInfo")
  fetch(requestURL)
    .then(function (response) {
      if (response.status >= 400) {
        confirm("Error: Please enter a valid five-digit zip-code!")
      }
      return response.json();
    })
    .then(function (data) {
    console.log(new Date(data.sunrise*1000+(data.timezone*1000)))
    let img = document.createElement("img")
    img.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
    info.children[0].innerHTML = data.name + '&nbsp&nbsp' + "(" + today.format("dddd, MMMM Do YYYY") + ")" + '&nbsp&nbsp'
    live.append(img)
    info.children[1].innerHTML = "Temperature: " + data.main.temp.toFixed() + "&deg;F"
    info.children[2].innerHTML = "Humidity: " + data.main.humidity.toFixed() + "%"
    info.children[3].innerHTML = "Wind Speed: " + data.wind.speed.toFixed() + '&nbsp' + "MPH"

    let lat = data.coord.lat
    let lon = data.coord.lon
    let uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=59948208350e6af8ced51673faaaf707"
    fetch (uvUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (uvdata) {
        let p = document.createElement("p")
        p.textContent = "UV: " + uvdata.value.toFixed()
          if (uvdata.value <= 2) {
            uV.style = "background-color: green"
          } else if (uvdata.value <= 5) {
            uV.style = "background-color: yellow"
          } else {
            uV.style = "background-color: red"
        }
        uV.innerHTML = p.textContent
      })
    })
}

function renderFive() {
  const calls = document.getElementById("input").value
  let requestURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + calls + ",us&units=imperial&appid=59948208350e6af8ced51673faaaf707"
  let day1 = document.getElementById("col-1")
  let day2 = document.getElementById("col-2")
  let day3 = document.getElementById("col-3")
  let day4 = document.getElementById("col-4")
  let day5 = document.getElementById("col-5")
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      let img = document.getElementById("img1")
      let img2 = document.getElementById("img2")
      let img3 = document.getElementById("img3")
      let img4 = document.getElementById("img4")
      let img5 = document.getElementById("img5")
      img.src = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png"
      img2.src = "https://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png"
      img3.src = "https://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png"
      img4.src = "https://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png"
      img5.src = "https://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png"
      day1.children[0].innerHTML = data.list[0].dt_txt 
      day1.children[1].innerHTML = '<img src="' + img.src + '"/>'
      day1.children[2].innerHTML = "Temperature: " + data.list[0].main.temp.toFixed()
      day1.children[3].innerHTML = "Humidity: " + data.list[0].main.humidity
      day2.children[0].innerHTML = data.list[8].dt_txt 
      day2.children[1].innerHTML = '<img src="' + img2.src + '"/>'      
      day2.children[2].innerHTML = "Temperature: " + data.list[8].main.temp.toFixed()
      day2.children[3].innerHTML = "Humidity: " + data.list[8].main.humidity.toFixed()
      day3.children[0].innerHTML = data.list[16].dt_txt 
      day3.children[1].innerHTML = '<img src="' + img3.src + '"/>'      
      day3.children[2].innerHTML = "Temperature: " + data.list[16].main.temp.toFixed()
      day3.children[3].innerHTML = "Humidity: " + data.list[16].main.humidity.toFixed()
      day4.children[0].innerHTML = data.list[24].dt_txt 
      day4.children[1].innerHTML = '<img src="' + img4.src + '"/>'     
      day4.children[2].innerHTML = "Temperature: " + data.list[24].main.temp.toFixed()
      day4.children[3].innerHTML = "Humidity: " + data.list[24].main.humidity.toFixed()
      day5.children[0].innerHTML = data.list[32].dt_txt 
      day5.children[1].innerHTML = '<img src="' + img5.src + '"/>'     
      day5.children[2].innerHTML = "Temperature: " + data.list[32].main.temp.toFixed()
      day5.children[3].innerHTML = "Humidity: " + data.list[32].main.humidity.toFixed()
    })
}

function run() {
search.addEventListener("click", saveZip)
search.addEventListener("click", renderInfo)
search.addEventListener("click", renderFive)
}

run()


search.addEventListener("click", function (e) {
  e.preventDefault()
  const calls = document.getElementById("input").value
  let requestURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + calls + ",US&units=imperial&appid=59948208350e6af8ced51673faaaf707"
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
  if (input.value == "") {
    searchList("")
  } else {
  searchList(input.value + " - " + data.name)
  input.value=""
  }
})
})
