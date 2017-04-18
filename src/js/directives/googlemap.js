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
      locations: '=',
      selected: '=',
      lat: '=',
      lng: '='
    },
    link($scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 3,
        center: $scope.center
      });
      // console.log($scope.locations);
      // let infoWindow = null;
      let infoWindow = null;
      let marker = null;
      const markers = [];


      function addLocations() {
        $scope.locations.forEach(function(location){
          // console.log(location)
          location.latitude = location.location.lat;
          location.longitude = location.location.lng;
          location.probability = location.value;

          addMarker(location);
        });
      }

      addLocations();

      function addMarker(location) {
        const latLng = { lat: location.latitude, lng: location.longitude };

        var circle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: latLng,
          radius: location.value * 10000
        });
        console.log(circle);

        markers.push(circle);

        google.maps.event.addListener(circle, 'click', () => {
          circleClick(location, circle);
        });

        // // console.log(latLng);
        // marker = new google.maps.Marker({
        //   position: latLng,
        //   map: map,
        //   animation: google.maps.Animation.DROP
        //   // icon: '/assets/restaurant.svg' // Adding a custom icon
        // });

        // markers.push(marker);
      console.log('first',location);

      // map.data.setStyle(function(location) {
      //   console.log('second',location);
      //    const probability = location.value;
      //    return {
      //      icon: getCircle(probability)
      //    };
      //  });
     }

      // function getCircle(probability) {
      //   return {
      //     path: google.maps.SymbolPath.CIRCLE,
      //     fillColor: 'red',
      //     fillOpacity: .2,
      //     scale: Math.pow(2, probability) / 2,
      //     strokeColor: 'white',
      //     strokeWeight: .5
      //   };
      // }

      function circleClick (location, circle) {
        console.log('clicked', location);
        const htmlElement = `<div id="infoWindow">
                                <a>more info in here!</a>
                               </div>`;
        if(infoWindow) infoWindow.close();

        infoWindow = new google.maps.InfoWindow({
          content: htmlElement,
          position: circle.center
        });

        google.maps.event.addListener(infoWindow, 'domready', () => {
          document.getElementById('infoWindow').onclick = function handleWindowClick() {
            $scope.selected = location;
            $scope.lat = location.latitude;
            $scope.lng = location.longitude;
            $scope.$apply();
          };

        });
        map.setCenter(circle.center);
        map.panTo(circle.center);
        infoWindow.open(map, circle);
      }





    }
  };
  return directive;
}
