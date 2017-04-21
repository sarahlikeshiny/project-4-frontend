angular
  .module('auroraApp')
  .directive('autocomplete', autocomplete);

autocomplete.$inject = ['$window'];
function autocomplete($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      geometry: '=',
      originLat: '=originlat',
      originLng: '=originlng'
    },
    link: function(scope, element, attrs, model) {
      const options = {
        types: []
        // componentRestrictions: {}
      };

      const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        scope.geometry = place.geometry.location.toJSON();
        console.log('geometry', scope.geometry.lat);
        scope.originLat = scope.geometry.lat;
        scope.originLng = scope.geometry.lng;
        console.log('originLat',scope.originLat);
        console.log('originLng',scope.originLng);
        // scope.getOriginLatLng({originLat: scope.originLat, originLng: scope.originLng});
        model.$setViewValue(element.val());
      });
    }
  };
}
// $scope.lat = location.latitude;
// $scope.lng = location.longitude;
// $scope.selected = location;
// // console.log($scope.lat, $scope.lng);
// $scope.getLatLng({lat: $scope.lat, lng: $scope.lng})
