angular
  .module('auroraApp')
  .directive('autocomplete', autocomplete);

autocomplete.$inject = ['$window'];
function autocomplete($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
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
        scope.originLat = scope.geometry.lat;
        scope.originLng = scope.geometry.lng;
        // scope.getOriginLatLng({originLat: scope.originLat, originLng: scope.originLng});
        model.$setViewValue(element.val());
      });
    }
  };
}
