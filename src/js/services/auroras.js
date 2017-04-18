angular
  .module('auroraApp')
  .service('auroras', Auroras);

// Auroras.$inject = ['$http', 'API_URL'];
// function Auroras($http, API_URL) {
//   const vm = this;
//   function getAuroras() {
//
//     return $http
//     .get(`${API_URL}/location`)
//     .then((response) => {
//       return response.data;
//
//     });
//   }
//   vm.getAuroras = getAuroras;
// }
