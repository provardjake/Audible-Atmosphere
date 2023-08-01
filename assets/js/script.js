var jakeAPIKeyOpenWeather = "0ba3133cb694a7de240bc9e5f4fceed2";
var deezerRequestURLPrefix = "https://cors.iamnd.eu.org/?url=";


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

function getWeatherTest(){
    var lat = 46.9481;
    var lon = 7.4474;
    var openWeatherRequestURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+jakeAPIKeyOpenWeather;

    fetch(openWeatherRequestURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}

getWeatherTest();