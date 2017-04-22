// * global google:true */

angular.module('auroraApp')
  .directive('showPageMap', showPageMap);

showPageMap.$inject = ['$window'];
function showPageMap($window) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      trip: '='
    },

    link($scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 3,
        center: $scope.center,
        scrollWheel: false
      });
      // console.log($scope.locations);
      // let infoWindow = null;
      let line = null;
      console.log($scope.trip);

      const originLatLng = {lat: $scope.trip.origin_lat, lng: $scope.trip.origin_lng};
      console.log(originLatLng);
      const destinationLatLng = {lat: $scope.trip.destination_lat, lng: $scope.trip.destination_lng};
      console.log(destinationLatLng);

      const departure = new google.maps.LatLng(originLatLng);
      const arrival = new google.maps.LatLng(destinationLatLng);


      line = new google.maps.Polyline({
        path: [departure, departure],
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        strokeWeight: 1,
        geodesic: true, //set to false if you want straight line instead of arc
        map: map
      });
      var step = 0;
      var numSteps = 250; //Change this to set animation resolution
      var timePerStep = 10; //Change this to alter animation speed
      var interval = setInterval(function() {
        step += 1;
        if (step > numSteps) {
          clearInterval(interval);
        } else {
          var areWeThereYet = google.maps.geometry.spherical.interpolate(departure,arrival,step/numSteps);
          line.setPath([departure, areWeThereYet]);
        }
      }, timePerStep);
    }
  };

  return directive;
}
