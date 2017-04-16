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
      center: '='
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

      //need to add data here...

    //google test data set
    // // Create a <script> tag and set the USGS URL as the source.
    //   var script = document.createElement('script');
    //
    //   // This example uses a local copy of the GeoJSON stored at
    //   // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    //   script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    //   document.getElementsByTagName('head')[0].appendChild(script);

      function eqfeedCallback(results) {//pass in the data to add to the map.
        console.log(results);
        var heatmapData = [];//creates an array of lat longs
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1], coords[0]);
          heatmapData.push(latLng);
        }
        new $window.google.maps.visualization.HeatmapLayer({//maps out the lat longs
          data: heatmapData,
          dissipating: false,
          map: map
        });
      }
      eqfeedCallback();
    }
  };
  return directive;
}
