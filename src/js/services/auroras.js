angular
  .module('auroraApp')
  .service('auroras', Auroras);

Auroras.$inject = ['$http', 'API_URL'];
function Auroras($http, API_URL) {
  const vm = this;
  function getAuroras(lat, lng) {

    return $http
    .get(`${API_URL}/auroraData`, { params: { lat, lng} })
    .then((response) => {
      return response.data;
    });
  }
  vm.getAuroras = getAuroras;
}
