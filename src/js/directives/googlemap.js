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
      new $window.google.maps.Marker({
        position: $scope.center,
        map: map,
        animation: $window.google.maps.Animation.DROP
      });

  //location markers


      // let markers = [];
      //
      // function addSensors() {
      //   $scope.locations.forEach(function(location){
      //     console.log('locations', location);
      //     location.latitude = $scope.locations.lat;
      //     location.longitude = $scope.locations.long;
      //
      //     addMarker(location);
      //     console.log(location);
      //   });


    //     function addMarker(location) {
    //       const latLng = { lat: location.latitude, lng: location.longitude };
    //       // console.log(latLng);
    //       marker = new google.maps.Marker({
    //         position: latLng,
    //         map,
    //         animation: google.maps.Animation.DROP
    //         // icon: '/assets/restaurant.svg' // Adding a custom icon
    //       });
    //       markers.push(marker);
    //     }
    //   }
    // }
    }
  };
  return directive;
}
//   function eqfeedCallback(results) {//pass in the data to add to the map.
//     console.log(results);
//     var heatmapData = [];//creates an array of lat longs
//     for (var i = 0; i < results.features.length; i++) {
//       var coords = results.features[i].geometry.coordinates;
//       var latLng = new google.maps.LatLng(coords[1], coords[0]);
//       heatmapData.push(latLng);
//     }
//     new $window.google.maps.visualization.HeatmapLayer({//maps out the lat longs
//       data: heatmapData,
//       dissipating: false,
//       map: map
//     });
//   }
//   eqfeedCallback();
// }
