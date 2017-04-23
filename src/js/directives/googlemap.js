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
        scrollWheel: false,
        styles:
        [
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#000000"
                },
                {
                    "lightness": -100
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#dddddd"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": -3
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
                {
                    "hue": "#000000"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": -100
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#000000"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": -100
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#bbbbbb"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 26
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "hue": "#ffffff"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 100
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#ffffff"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 100
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
                {
                    "hue": "#000000"
                },
                {
                    "lightness": -100
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#ffffff"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 100
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#2a2a2a"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "hue": "#000000"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": -100
                },
                {
                    "visibility": "off"
                }
            ]
        }
    ]
      });
      // console.log($scope.locations);
      // let infoWindow = null;
      let infoWindow = null;
      const markers = [];

      console.log('scope', $scope.weather);

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
        console.log('clicked', location);
        $scope.lat = location.latitude;
        $scope.lng = location.longitude;
        $scope.selected = location;
        console.log('selected', $scope.selected);
        $scope.getLatLng({lat: $scope.lat, lng: $scope.lng});


        const htmlElement = `<div>
                                <h4 id="iw-title">Location Name: ${location.location.name}</h4>
                                <h4 id="iw-title">Probability: ${location.probability}%</h4>
                                <a>more information</a>
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
