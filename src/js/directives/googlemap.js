// * global google:true */

angular.module('auroraApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      locations: '='
    },
    link($scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 3,
        center: $scope.center
      });
      console.log($scope.locations);
      // let infoWindow = null;
      let marker = null;
      const markers = [];



      function addLocations() {
        $scope.locations.forEach(function(location){
          console.log(location)
          location.latitude = location.lat;
          location.longitude = location.lng;

          addMarker(location);
        });
      }

      addLocations();

      function addMarker(location) {
        const latLng = { lat: location.latitude, lng: location.longitude };
        // console.log(latLng);
        marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP
          // icon: '/assets/restaurant.svg' // Adding a custom icon
        });

        markers.push(marker);

      }
    }
  };
  return directive;
}
