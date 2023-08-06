var requestLatLong = 'http://api.openweathermap.org/geo/1.0/direct?q=Sandy,UT,&limit=100&appid=6314948569672463577f027ffc3ab6b1'
var requestWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=38.0142&lon=84.6165&appid=6314948569672463577f027ffc3ab6b1';
var jakeAPIKeyOpenWeather = "0ba3133cb694a7de240bc9e5f4fceed2";
var deezerRequestURLPrefix = "https://cors.iamnd.eu.org/?url=";
var searchButton = document.querySelector("#generate-button");
var cityList = document.querySelector("#city-list");
var citySearch = [];
var searchLat1 = [];
var searchLon1 = [];
var searchCity1 = [];
var searchCountry1 = [];
var cityZip = [];
var searchCityZip1 = [];
var playlistBody = document.querySelector("#playlist-body");
var currentLocation;
var playlistTitleArray = [];
var playlistArtistArray = [];

document.getElementById("save-playlist-button")?.addEventListener("click", function(event){
    event.preventDefault();
    savePlaylist();
})

document.getElementById("generate-button")?.addEventListener("click", function(event){
    event.preventDefault();
    var userInput = document.querySelector("#user-input").value;
    localStorage.setItem("userInput", userInput);
    document.location.href='playlist.html';
});

function savePlaylist(){
    var savedTitleArray = JSON.parse(localStorage.getItem("playlistTitle") || "[]");
    var savedArtistArray = JSON.parse(localStorage.getItem("playlistArtist") || "[]");

    savedTitleArray = playlistTitleArray;
    savedArtistArray = playlistArtistArray;

    localStorage.setItem("playlistTitle", JSON.stringify(savedTitleArray));
    localStorage.setItem("playlistArtist", JSON.stringify(savedArtistArray));


}

function playlistLoad(){
    if(playlistBody != null){
        var userInput = JSON.parse(localStorage.getItem("userInput"));
        getZipCode(userInput);
    }
}

// function getCityName(userInput){
//     var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+userInput+"&limit=5&appid="+jakeAPIKeyOpenWeather;
//     var cityLongitude;
//     var cityLatitude;
//     var cityArray = [];
//     fetch(requestUrl)
//     .then(function(response){
//         return response.json();
//     })
//         .then(function(data){
//             for(var i = 0; i < data.length; i++){
//                 var cityListItem = document.createElement("button");
//                 cityListItem.setAttribute("type", "button");
//                 cityListItem.setAttribute("data-array-index", i);
//                 cityListItem.setAttribute("class", "list-group-item list-group-item-action list-group-item-secondary"); // change classes.  They are bootstrap
//                 if(data[i].state === undefined || data[i].country !== "US"){
//                     cityListItem.textContent = data[i].name+", "+data[i].country;
//                 }
//                 else{
//                     cityListItem.textContent = data[i].name+", "+data[i].state;
//                 }
//                 cityArray.push(data[i]);
//                 cityList.appendChild(cityListItem);
//             }
//             cityList.style.display = "flex";
//             document.addEventListener("click", function(event){
//                 event.preventDefault();
//                 const target = event.target.closest(".list-group-item");
//                 if(target){
//                     var cityArrayIndex = parseInt(target.getAttribute("data-array-index"));
//                     cityLatitude = cityArray[cityArrayIndex].lat;
//                     cityLongitude = cityArray[cityArrayIndex].lon;
//                     getWeather(cityLatitude, cityLongitude);
//                 }
//             })
//         })
// }
    

function getZipCode(userInput){
    var requestUrl = "http://api.openweathermap.org/geo/1.0/zip?zip="+userInput+",US&appid="+jakeAPIKeyOpenWeather;
    var cityLongitude;
    var cityLatitude;
    console.log("hello");
    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        cityLatitude = data.lat;
        cityLongitude = data.lon;
        cityZip = userInput;
        currentLocation = data.name;
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
    var searchLat = [cityLatitude];
    var searchLon = [cityLongitude];
    var searchCity = [data.name];
    var searchCountry = [data.sys.country];
    console.log(data);

    searchLat1 = JSON.parse(localStorage.getItem("latitudeSave") || "[]");
    searchLon1 = JSON.parse(localStorage.getItem("longitudeSave") || "[]");
    searchCity1 = JSON.parse(localStorage.getItem("citySave") || "[]");
    searchCountry1 = JSON.parse(localStorage.getItem("countrySave") || "[]");
    searchCityZip1 = JSON.parse(localStorage.getItem("zipCode") || "[]");

    searchLat1.push(searchLat);
    searchLon1.push(searchLon);
    searchCity1.push(searchCity);
    searchCountry1.push(searchCountry);
    searchCityZip1.push(cityZip);
  
    
    localStorage.setItem("latitudeSave",JSON.stringify(searchLat1));
    localStorage.setItem("longitudeSave",JSON.stringify(searchLon1));
    localStorage.setItem("citySave",JSON.stringify(searchCity1));
    localStorage.setItem("countrySave",JSON.stringify(searchCountry1));
    localStorage.setItem("zipCode",JSON.stringify(searchCityZip1));
    getMusicType(data.weather[0].id);
    displayWeather(data);
    displayRecentSearches();
})
}


function displayRecentSearches(){
    var results = JSON.parse(localStorage.getItem("zipCode"));
    var lastElement = results[results.length - 1];
    var resultsContainer = document.getElementById("results-container");
    var resultsElement = document.createElement("p");
    resultsElement.textContent = lastElement;
    resultsContainer.appendChild(resultsElement);
}

function renderRecentSearches(){
    var zipCodeArray = JSON.parse(localStorage.getItem("zipCode"));
    var resultsContainer = document.getElementById("results-container");
    for(var i = 0; i < zipCodeArray.length; i++){
        var resultsElement = document.createElement("p");
        resultsElement.textContent = zipCodeArray[i];
        resultsContainer.appendChild(resultsElement);
    }
}


function getRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

function generatePlaylist(genreOneId, genreTwoId, genreThreeId){
    var requestURLGenre = "https://api.deezer.com/genre";
    var requestURLArtist = "https://api.deezer.com/artist";
    
    if(genreOneId != undefined && genreTwoId == undefined && genreThreeId == undefined){
        fetch(deezerRequestURLPrefix+requestURLGenre+"/"+genreOneId+"/artists")
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            for(var i = 0; i < 10; i++){
                var randomArtist = data.data[getRandomInteger(0, data.data.length)];
                var artistId = randomArtist.id;
                fetch(deezerRequestURLPrefix+requestURLArtist+"/"+artistId+"/top")
                .then(function (response){
                    return response.json();
                })
                .then(function(data){
                    var randomSong = data.data[getRandomInteger(0, data.data.length)];
                    var albumCoverLink = randomSong.album.cover_small;
                    playlistTitle = randomSong.title_short;
                    playlistArtist = randomSong.artist.name;
                    playlistTitleArray.push(playlistTitle);
                    playlistArtistArray.push(playlistArtist);
                    displayPlaylist(playlistTitle, playlistArtist, albumCoverLink);
                });
            }
        });
    }

    if(genreOneId != undefined && genreTwoId != undefined && genreThreeId == undefined){
        for(var i = 0; i < 10; i++){
            var genreArray = [genreOneId, genreTwoId];
            var randomGenreId = getRandomInteger(0,2);
            fetch(deezerRequestURLPrefix+requestURLGenre+"/"+genreArray[randomGenreId]+"/artists")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                var randomArtist = data.data[getRandomInteger(0, data.data.length)];
                var artistId = randomArtist.id;
                fetch(deezerRequestURLPrefix+requestURLArtist+"/"+artistId+"/top")
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    var randomSong = data.data[getRandomInteger(0, data.data.length)];
                    var albumCoverLink = randomSong.album.cover_small;
                    playlistTitle = randomSong.title_short;
                    playlistArtist = randomSong.artist.name;
                    playlistTitleArray.push(playlistTitle);
                    playlistArtistArray.push(playlistArtist);
                    displayPlaylist(playlistTitle, playlistArtist, albumCoverLink);
                });
            });
        }
    }

    if(genreOneId != undefined && genreTwoId != undefined && genreThreeId != undefined){
        for(var i = 0; i < 10; i++){
            var genreArray = [genreOneId, genreTwoId, genreThreeId];
            var randomGenreId = getRandomInteger(0,3);
            fetch(deezerRequestURLPrefix+requestURLGenre+"/"+genreArray[randomGenreId]+"/artists")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                var randomArtist = data.data[getRandomInteger(0, data.data.length)];
                var artistId = randomArtist.id;
                fetch(deezerRequestURLPrefix+requestURLArtist+"/"+artistId+"/top")
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    var randomSong = data.data[getRandomInteger(0, data.data.length)];
                    var albumCoverLink = randomSong.album.cover_small;
                    playlistTitle = randomSong.title_short;
                    playlistArtist = randomSong.artist.name;
                    playlistTitleArray.push(playlistTitle);
                    playlistArtistArray.push(playlistArtist);
                    displayPlaylist(playlistTitle, playlistArtist, albumCoverLink);
                });
            });
        }
    }   
}

function displayWeather(data){
    var weatherBox = document.getElementById("weather-box");
    var currentWeatherLocation = document.getElementById("weather-location-text");

    var weatherContainer = document.createElement("div");
    var currentTemp = document.createElement("h1");
    var highTemp = document.createElement("h3");
    var lowTemp = document.createElement("h3");
    var currentConditions = document.createElement("h3");

    
    currentTemp.setAttribute("id", "current-temp");
    highTemp.setAttribute("class", "highlow-temp");
    lowTemp.setAttribute("class", "highlow-temp");
    currentConditions.setAttribute("id", "current-conditions")

    currentWeatherLocation.textContent = "Current weather in "+currentLocation;
    currentTemp.textContent = Math.round(data.main.temp)+"°";
    highTemp.textContent = "↑"+Math.round(data.main.temp_max)+"°";
    lowTemp.textContent = "↓"+Math.round(data.main.temp_min)+"°";
    currentConditions.textContent = data.weather[0].description;
    

    weatherBox.appendChild(weatherContainer);
    weatherContainer.appendChild(currentTemp);
    weatherContainer.appendChild(highTemp);
    weatherContainer.appendChild(lowTemp);
    weatherContainer.appendChild(currentConditions);
    console.log(data);
}

function displayPlaylist(playlistTitle, playlistArtist, albumCoverLink){
    var playListUl = document.getElementById("playlist");

    var playlistItem = document.createElement("li");
    var playlistItemContainer = document.createElement("div");
    var playlistItemSong = document.createElement("li");
    var playlistItemArtist = document.createElement("li");
    var albumCover = document.createElement("img");

    playlistItem.setAttribute("class", "playlist-item");
    albumCover.setAttribute("src", albumCoverLink);
    albumCover.setAttribute("class", "album-cover-picture");
    playlistItemContainer.setAttribute("class", "playlist-item-container");
    playlistItemArtist.setAttribute("class", "playlist-item-text");
    playlistItemSong.setAttribute("class", "playlist-item-text");
    playlistItemSong.textContent = playlistTitle;
    playlistItemArtist.textContent = playlistArtist;
    playListUl.appendChild(playlistItem);
    playlistItem.appendChild(playlistItemContainer);
    playlistItemContainer.appendChild(playlistItemSong);
    playlistItemContainer.appendChild(playlistItemArtist);
    playlistItem.appendChild(albumCover);
}


// this function takes in the id of the weather conditions and then applies a music genre based off that id. 
function getMusicType(weatherConditionId){
    // the following arrays are all ids for certain weather conditions in the openweather api
    const thunderstorm = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
    const drizzle = [300, 302, 310, 311, 312, 313, 314, 321];
    const rain = [500, 501, 502, 503, 504, 511, 520, 521, 522, 532];
    const snow = [600, 601, 612, 613, 615, 616, 620, 621, 622];
    const atmosphere = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
    const clear = [800];
    const clouds = [801, 802, 803, 804];
    //the below array is ids for genres in the deezer api
    const genreArray = [152, 464, 132, 116, 106, 84, 98, 113, 129, 153, 85, 169];


    if(thunderstorm.includes(weatherConditionId)){
        generatePlaylist(genreArray[0], genreArray[1], genreArray[4]);
    }
    if(drizzle.includes(weatherConditionId)){
        generatePlaylist(genreArray[8], genreArray[9]);
    }
    if(rain.includes(weatherConditionId)){
        generatePlaylist(genreArray[6], genreArray[9]);
    }
    if(clear.includes(weatherConditionId)){
        generatePlaylist(genreArray[2], genreArray[3]);
    }
    if(atmosphere.includes(weatherConditionId)){
        generatePlaylist(genreArray[10], genreArray[7]);
    }
    if(snow.includes(weatherConditionId)){
        generatePlaylist(genreArray[6], genreArray[11]);
    }
    if(clouds.includes(weatherConditionId)){
        generatePlaylist(genreArray[10], genreArray[2]);
    }
    if(weatherConditionId === undefined){
        generatePlaylist(genreArray[2]);
    }
}

playlistLoad();
renderRecentSearches();