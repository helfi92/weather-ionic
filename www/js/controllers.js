angular.module('app.controllers',[])
.controller('AppCtrl', function($scope,$log){
	$log.info('AppCtrl Created');
})
.controller('WeatherCtrl', function($scope,$log, Weather,$ionicLoading, Settings){
	$log.info('WeatherCtrl Created');
	$scope.haveData = false;
	$ionicLoading.show({
		template: 'Loading...'
	})
	Weather.getWeatherAtLocation(32.42, -117).then(function(resp){
		
		$log.info(resp);
		$scope.current = resp.data.currently;
		$scope.highTemp = Math.ceil(resp.data.daily.data[0].temperatureMax);
		$scope.lowTemp = Math.ceil(resp.data.daily.data[0].temperatureMin);
		$scope.currentTemp = Math.ceil($scope.current.temperature);
		$scope.haveData = true;
		$ionicLoading.hide();
	}, function(error){
		alert('Unable to get current conditions');
		$log.error(error);
	})
	
})