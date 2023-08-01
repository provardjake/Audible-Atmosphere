

var requestLatLong = 'http://api.openweathermap.org/geo/1.0/direct?q=Sandy,UT,&limit=100&appid=6314948569672463577f027ffc3ab6b1'
var requestWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=38.0142&lon=84.6165&appid=6314948569672463577f027ffc3ab6b1';





function fetchData(requestLatLong){
    fetch(requestLatLong)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
    console.log(data)
    });
  }
  
  fetchData(requestLatLong);
  

function fetchData(requestWeatherUrl){
  fetch(requestWeatherUrl)
  .then(function (response){
      return response.json();
  })
  .then(function(data){
  console.log(data)
  });
}

fetchData(requestWeatherUrl);


