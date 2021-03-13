var cityInputEl = document.querySelector("#mySearch");
var cities = JSON.parse(localStorage.getItem("cities")) || [];
console.log(cities);
var cityNameP = document.querySelector("#cityName");
var cityTemp = document.querySelector("#cityTemp");
var cityWind = document.querySelector("#cityWind");
var cityUV = document.querySelector("#cityUV");
var cityIcon = document.querySelector("#cityIcon");
var savedCities = document.querySelector("#savedCities");
// var firstDay = document.querySelector("#date1");
var citiesArray = [];

function displayDate() {
var currentDate = document.getElementById("date");
currentDate.textContent = moment().format("M/DD/YYYY");
}



// if (cities.length > 0) {
//     document.getElementById("#savedCities").appendChild(cities);
// }

var cityname;
var citySubmitHandler = function (event) {

    event.preventDefault();
   
    cityname = cityInputEl.value.trim();

    if (cityname) {
        getWeather(cityname);
        getFiveDay(cityname);
      displayDate(); 
        // getUV(lat,long);
        cityInputEl.value = "";
        
    } else {
        //alert("Please enter a valid city name");
    }
};

document.getElementById("btn").addEventListener("click", citySubmitHandler);


var getWeather = function () {
    // format the api url
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=e163478ea3e20c4862d83fd871a92ec2&units=imperial`;
   console.log(cityname);


    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    cities.push(cityname);
                    localStorage.setItem("cities", JSON.stringify(cities));
                    
                   
                    cityNameP.innerHTML = [data.name]
                    cityTemp.innerHTML = [data.main.temp]
                    cityHumid.innerHTML = [data.main.humidity]
                    cityWind.innerHTML = [data.wind.speed]
                    
                    document.getElementById("wicon").src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"; 
                    
                  

                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect");
        });
};

var getFiveDay = function () {
    var apiFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=e163478ea3e20c4862d83fd871a92ec2&units=imperial`;
    fetch(apiFiveDay)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    cities.push(cityname);
                    // firstDay.innerHTML = 
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect");
        });
}

