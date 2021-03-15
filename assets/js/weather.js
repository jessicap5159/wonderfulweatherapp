var cityInputEl = document.querySelector("#mySearch");
var cities = []
var cityNameP = document.querySelector("#cityName");
var cityTemp = document.querySelector("#cityTemp");
var cityWind = document.querySelector("#cityWind");
var cityUV = document.querySelector("#cityUV");
var cityIcon = document.querySelector("#cityIcon");
var savedCities = document.querySelector("#savedCities");

var firstHumidity = document.querySelector("#humidity1")
// var citiesArray = [];

function displayDate() {
var currentDate = document.getElementById("date");
currentDate.textContent = moment().format("M/DD/YYYY");
}
refreshSaveList();
function refreshSaveList() {
    // clear saved city display 
    savedCities.innerHTML = ""
    // create h6 Saved Cities
    var title = document.createElement("h6");
    title.innerText = "Saved Cities";
    savedCities.appendChild(title);
    // load saved cities from local storage
    var cities = JSON.parse(localStorage.getItem("cities")) || [];
console.log(cities);
    // create button for each saved city
    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        var newButton = document.createElement("button");
        newButton.innerText = city;
        newButton.addEventListener("click", cityList);
        // newButton.addEventListener("click", citySubmitHandler);

        savedCities.appendChild(newButton);
    }
    // append to div
}

function cityList (event) {
    console.log(this);
    
   cityname = this.innerText;
    console.log("button clicked");
    if (cityname) {
        getWeather(cityname);
        getFiveDay(cityname);
      displayDate(); 
      forecastDates();
        
        cityInputEl.value = "";
        
    } else {
        //alert("Please enter a valid city name");
    }
};

function forecastDates() {
    var dateOne = document.getElementById("date1")
    dateOne.textContent = moment().add(1, "d").format("M/DD/YYYY");
    
    var dateTwo = document.getElementById("date2")
    dateTwo.textContent = moment().add(2, "d").format("M/DD/YYYY");

    var dateThree = document.getElementById("date3")
    dateThree.textContent = moment().add(3, "d").format("M/DD/YYYY");

    var dateFour = document.getElementById("date4")
    dateFour.textContent = moment().add(4, "d").format("M/DD/YYYY");

    var dateFive = document.getElementById("date5")
    dateFive.textContent = moment().add(5, "d").format("M/DD/YYYY");
}



var cityname;
var citySubmitHandler = function (event) {
console.log(event);
    event.preventDefault();
   
    cityname = cityInputEl.value.trim();

    if (cityname) {
        getWeather(cityname);
        getFiveDay(cityname);
      displayDate(); 
      forecastDates();
    
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


   https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=e163478ea3e20c4862d83fd871a92ec2&units=imperial


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
                    var lat = data.city.coord.lat;
                    var lon = data.city.coord.lon;
                    console.log(lat,lon);
                    var getUV = function() {
                        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=e163478ea3e20c4862d83fd871a92ec2&units=imperial`)
                        .then(function (response){
                            if (response.ok) {
                                response.json().then(function (data){
                                    console.log(data);
                                    cityUV.innerHTML = data.current.uvi
                                    
                                })
                                
                            }
                          

                        })
                
                 
                    };
                    getUV();
                        
                
                    
                    cities.push(cityname);
                    document.getElementById("icon1").src = "http://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png"; 
                    temp1.innerHTML = "Temp: " + [data.list[4].main.temp] + "&#8457"
                    humidity1.innerHTML = "Humidity: " + [data.list[4].main.humidity] + "%"

                    document.getElementById("icon2").src = "http://openweathermap.org/img/w/" + data.list[12].weather[0].icon + ".png"; 
                    temp2.innerHTML = "Temp: " + [data.list[12].main.temp] + "&#8457"
                    humidity2.innerHTML = "Humidity: " + [data.list[12].main.humidity] + "%"


                    document.getElementById("icon3").src = "http://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png"; 
                    temp3.innerHTML = "Temp: " + [data.list[16].main.temp] + "&#8457"
                    humidity3.innerHTML = "Humidity: " + [data.list[16].main.humidity] + "%"


                    document.getElementById("icon4").src = "http://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png"; 
                    temp4.innerHTML = "Temp: " + [data.list[24].main.temp] + "&#8457"
                    humidity4.innerHTML = "Humidity: " + [data.list[24].main.humidity] + "%"


                    document.getElementById("icon5").src = "http://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png"; 
                    temp5.innerHTML = "Temp: " + [data.list[32].main.temp] + "&#8457"
                    humidity5.innerHTML = "Humidity: " + [data.list[32].main.humidity] + "%"


                });
            } else {
                alert("Error: " + response.statusText);
            }
           
        })
        .catch(function (error) {
            alert("Unable to connect");
            // console.log(data);
        });
      
}

