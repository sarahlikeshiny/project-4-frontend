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
      lng: '=',
      getLatLng: '&'
    },

    link($scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 2,
        center: $scope.center,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]

      });
      // console.log($scope.locations);
      // let infoWindow = null;
      let infoWindow = null;
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
          strokeColor: '#d4dbd9',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#42f4cb',
          fillOpacity: 0.35,
          map: map,
          center: latLng,
          radius: location.value * 10000
        });

        markers.push(circle);

        google.maps.event.addListener(circle, 'click', () => {
          circleClick(location, circle);
        });

      }

      function circleClick (location, circle) {
        console.log('clicked', location);
        $scope.lat = location.latitude;
        $scope.lng = location.longitude;
        $scope.selected = location;
        console.log($scope.lat, $scope.lng);
        $scope.getLatLng({lat: $scope.lat, lng: $scope.lng});
        const htmlElement = `<div id="infoWindow">
                                <a>more info in here!</a>
                               </div>`;
        if(infoWindow) infoWindow.close();

        infoWindow = new google.maps.InfoWindow({
          content: htmlElement,
          position: circle.center
        });

        map.setCenter(circle.center);
        map.panTo(circle.center);
        infoWindow.open(map, circle);
      }
    }
  };
  return directive;
}
