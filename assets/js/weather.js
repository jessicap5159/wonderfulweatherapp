var cityInputEl = document.querySelector("#mySearch");
var cities = [];
var cityNameP = document.querySelector("#cityName");
var cityTemp = document.querySelector("#cityTemp");
var cityWind = document.querySelector("#cityWind");
var cityUV = document.querySelector("#cityUV");
var cityIcon = document.querySelector("#cityIcon");
var savedCities = document.querySelector("#savedCities");
var firstDate = document.querySelector("#date1");
var cityname;
var citySubmitHandler = function (event) {

    event.preventDefault();
    console.log(cityNameP);
    console.log(event);
    console.log(cityInputEl);
    cityname = cityInputEl.value.trim();

    if (cityname) {
        console.log(cityname);
        getWeather(cityname);
        getFiveDay(cityname);
        cityInputEl.value = "";

    } else {
        //alert("Please enter a valid city name");
    }
};

document.getElementById("btn").addEventListener("click", citySubmitHandler);





var getWeather = function () {
    // format the api url
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=e163478ea3e20c4862d83fd871a92ec2&units=imperial`;
    // var apiForUV = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} ** need to get lat and long
   

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
                    cityIcon.innerHTML = JSON.parse[data.weather[0].icon]
                    cityTemp.innerHTML = [data.main.temp]
                    cityWind.innerHTML = [data.wind.speed]
                    // cityUV.innerHTML = [data.]
                    // date???
                    // console.log(JSON.parse(localStorage.getItem("cities")));

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
                // firstDate.innerHTML = 
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function (error) {
        alert("Unable to connect");
    });
}
