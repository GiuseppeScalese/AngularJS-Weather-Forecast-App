(function() {

  //custom service to perform the http GET method
  var weatherData = function($http){
    
    //function expression that retrieves data from API
    var getCityInfo = function(city){
      return $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=68a2809807cc9d79ea6310d2f92c55c3")
            .then(function(response){
              return response.data;
            });
    }; 
    
    return {
      getCityInfo: getCityInfo
    };
    
  };
    var module = angular.module("app");
    module.factory("weatherData", weatherData);
}());