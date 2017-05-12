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
      weather: '=',
      getLatLng: '&'
    },

    link($scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 2,
        center: $scope.center,
        scrollwheel: false,
        styles:

[
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
]

      });
      console.log($scope.weather);

      console.log($scope.locations);
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
          strokeColor: '#652a8e',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#42f4cb',
          fillOpacity: 0.5,
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
        $scope.lat = location.latitude;
        $scope.lng = location.longitude;
        $scope.selected = location;
        $scope.getLatLng({lat: $scope.lat, lng: $scope.lng});




        const htmlElement = `<div>
                                <h4 id="iw-title">Location Name: ${location.location.name}</h4>
                                <h4 id="iw-title">Probability of seeing the Aurora: ${location.probability}%</h4>
                                '<div class="iw-bottom-gradient"></div>
                               </div>`;
        if(infoWindow) infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
          content: htmlElement,
          position: circle.center
        });

        infoWindow.open(map, circle);
      }
    }
  };
  return directive;
}
