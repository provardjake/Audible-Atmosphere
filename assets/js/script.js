var requestLatLong = 'http://api.openweathermap.org/geo/1.0/direct?q=Sandy,UT,&limit=100&appid=6314948569672463577f027ffc3ab6b1'
var requestWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=38.0142&lon=84.6165&appid=6314948569672463577f027ffc3ab6b1';
var jakeAPIKeyOpenWeather = "0ba3133cb694a7de240bc9e5f4fceed2";
var deezerRequestURLPrefix = "https://cors.iamnd.eu.org/?url=";
var searchButton = document.querySelector("#generate-button");
var cityList = document.querySelector("#city-list");

//listen for input of city name or zip code
searchButton.addEventListener("click", function(event){
    event.preventDefault();
    var userInput = document.querySelector("#user-input").value;
    var checkUserInput = parseInt(userInput);
    if(isNaN(checkUserInput)){
        getCityName(userInput);
    }
    else{
        getZipCode(userInput);
    }
});

//get latitude and longitude from the geo api when user inputs city. 
function getCityName(userInput){
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+userInput+"&limit=5&appid="+jakeAPIKeyOpenWeather;
    var cityLongitude;
    var cityLatitude;
    var cityArray = [];
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        for(var i = 0; i < data.length; i++){
            var cityListItem = document.createElement("button");
            cityListItem.setAttribute("type", "button");
            cityListItem.setAttribute("data-array-index", i);
            cityListItem.setAttribute("class", "list-group-item list-group-item-action list-group-item-secondary"); 
            cityListItem.setAttribute("style", "display:block;");
            if(data[i].state === undefined || data[i].country !== "US"){
                cityListItem.textContent = data[i].name+", "+data[i].country;
            }
            else{
                cityListItem.textContent = data[i].name+", "+data[i].state;
            }
                cityArray.push(data[i]);
                cityList.appendChild(cityListItem);
            }
            cityList.style.display = "block";
            document.addEventListener("click", function(event){
                event.preventDefault();
                const target = event.target.closest(".list-group-item");
                if(target){
                    var cityArrayIndex = parseInt(target.getAttribute("data-array-index"));
                    cityLatitude = cityArray[cityArrayIndex].lat;
                    cityLongitude = cityArray[cityArrayIndex].lon;
                    getWeather(cityLatitude, cityLongitude);
            }
        })
    })
}
//If user inputs only numbers use the geo api to get latitude and longitude from zip code.     
function getZipCode(userInput){
        var requestUrl = "http://api.openweathermap.org/geo/1.0/zip?zip="+userInput+",US&appid="+jakeAPIKeyOpenWeather;
        var cityLongitude;
        var cityLatitude;
        fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            cityLatitude = data.lat;
            cityLongitude = data.lon;
            getWeather(cityLatitude, cityLongitude);
        })
    }

function getWeather(cityLatitude, cityLongitude){
    var openWeatherRequestURL = "https://api.openweathermap.org/data/2.5/weather?lat="+cityLatitude+"&lon="+cityLongitude+"&appid="+jakeAPIKeyOpenWeather+"&units=imperial";
    
    fetch(openWeatherRequestURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        getMusicType(data.weather[0].id);
    })
}
    

function generatePlaylist(){
    return;
}

function getMusicType(weatherConditionId){
    const thunderstorm = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
    const drizzle = [300, 302, 310, 311, 312, 313, 314, 321];
    const rain = [500, 501, 502, 503, 504, 511, 520, 521, 522, 532];
    const snow = [600, 601, 612, 613, 615, 616, 620, 621, 622];
    const atmosphere = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
    const clear = [800];
    const clouds = [801, 802, 803, 804];
    var genreArray = ["rock", "metal", "pop", "hip-hop", "edm", "latin", "country", "classical", "punk", "jazz", "blues"] ;

    if(weatherConditionId === thunderstorm){

    }
    if(weatherConditionId === clear){
        genreArray[2];
    }
}


