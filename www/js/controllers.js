angular.module('app.controllers',[])
.constant('FORECASTIO_KEY', '565c31a0d08df6730aa4fcd56258451b')
.controller('AppCtrl', function($scope,$log,Weather,Settings,$ionicLoading,Location){
	
})
.controller('WeatherCtrl', function($rootScope,$scope,$log,$ionicPlatform,Weather,$ionicLoading,$cordovaGeolocation,Settings,Location){
	//$log.info('WeatherCtrl Created');
	
	$ionicPlatform.ready(function(){
		if(Location.lat == 0){
			var posOptions = {
				timeout : 10000,
				enableHighAccuracy : false
			};
			$cordovaGeolocation
				.getCurrentPosition(posOptions)
				.then(function(position){
					Location.lat == position.coords.latitude;
					Location.long == position.coords.longitude;
					getWeather();
				}, function(err){
					//error
				});
		}
	})

	$scope.haveData = false;
	$ionicLoading.show({
		template: 'Loading...'
	});

	function getWeather(){
		$scope.haveData = false;
		$ionicLoading.show({
			template: 'Loading...'
		});
		Weather.getWeatherAtLocation(Location.lat,Location.long).then(function(resp){
			
			$log.info(resp);
			$scope.current = resp.data.currently;
			$scope.highTemp = Math.ceil(resp.data.daily.data[0].temperatureMax);
			$scope.lowTemp = Math.ceil(resp.data.daily.data[0].temperatureMin);
			$scope.currentTemp = Math.ceil($scope.current.temperature);
			$scope.haveData = true;
			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		}, function(error){
			alert('Unable to get current conditions');
			$log.error(error);
		})	
	}
	getWeather();

	$scope.doRefresh = function(){
		getWeather();
	}
	
	$rootScope.changeUnits = function(newUnits){
		console.log('units: ', newUnits);
		Settings.units = newUnits;
		getWeather();
	}
	
	
});