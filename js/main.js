/* Weather-App - v0.1.0 -2016-02-18 */(function() {
  var app = angular.module("app", []);

  app.controller("main", function($scope) {
    $scope.message = "Weather Forecast Service";
  });

  app.controller("content", function($scope, weatherData, $interval, $log) {

    //function expression to handle the http connection error 
    var onError = function(reason) {
      //hide results if no data available
      $scope.hidePanel = true;

      //show message error
      $scope.showError = true; 
    };

    //function expression to handle the http response
    var onSearchComplete = function(data) {
      $scope.cityData = data;

      //handles any error returned from http response - anything < 299 is acceptable
      if($scope.cityData.cod > "299"){
        $scope.error = $scope.cityData.message;

        //hide results if no data available
        $scope.hidePanel = true;

        //show message error
        $scope.showError = true; 
      }
      else{
        //show result panel if data correct
        $scope.hidePanel = false;
        $scope.showError = false; 

        //convent Kelvin to Celsius
        $scope.temperature = Math.round($scope.cityData.main.temp - 273.15);
        $scope.temperatureMin = Math.round($scope.cityData.main.temp_min - 273.15);
        $scope.temperatureMax = Math.round($scope.cityData.main.temp_max - 273.15);

        //call function to set bg colour according to temperature level
        backgroundChange($scope.temperature);

        //round humidity value
        $scope.humidity = Math.round($scope.cityData.main.humidity);

        //round wind speed value
        $scope.windSpeed = Math.round($scope.cityData.wind.speed);
      }
    };

    //function expression to perform the search 
    $scope.search = function(city) {
      $log.info("Searching for " + city);

      //if input value is undefined then avoid searching
      if(city !== undefined){
        weatherData.getCityInfo(city).then(onSearchComplete, onError);
      }
    };

    //function expression to set the app bg colour according to city temperature
    var backgroundChange = function(temperature) { 
       if (temperature >= 30) {
           $scope.dynamicBgColour = 'very-hot';
       }
       else if (temperature > 20 && temperature < 30) {
           $scope.dynamicBgColour = 'hot';
       }
       else if (temperature> 10 && temperature < 20) {
           $scope.dynamicBgColour = 'mild';
        }
      else if (temperature > 0 && temperature < 10) {
           $scope.dynamicBgColour = 'cold';
       }
       else if (temperature<= 0) {
           $scope.dynamicBgColour = 'very-cold';
       }
    };

    //define variables for validation, regex and default city to search
    $scope.city = "London";
    $scope.regex = /^[a-zA-Z\s]*$/;
    $scope.validationMessage = "Please use letters only";
    $scope.validationMessageEmpty = "Please enter a city name";
    $scope.errorRetrieveData = "Error: Could not retrieve the data.";

    //load city info by calling search method
    $scope.search($scope.city);

    //$interval service used to run the automatic search every 2 minutes (120000 ms)
    $interval(function(){
      $scope.search($scope.city);
    },120000);

  });

}());

;(function() {

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