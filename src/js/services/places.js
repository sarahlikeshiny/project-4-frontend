angular
  .module('auroraApp')
  .service('places', Places);

Placess.$inject = ['$http'];
function Places($http) {
  this.getPlaces = function getPlaces(destination_lat, destination_lng) {
    return $http
            .get('/api/places', { params: { destination_lat, destination_lng } })
            .then((response) => {
              return response.data;
            });
  };
}
