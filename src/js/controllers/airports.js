angular
  .module('auroraApp')
  .controller('AirportsIndexCtrl', AirportsIndexCtrl);

AirportsIndexCtrl.$inject = ['airports'];//stops $http (angular equiv of doing an ajax call) being changed during minification
function AirportsIndexCtrl(airports) {
  const vm = this;
  vm.flights = [];

  getAirports();

  function getAirports() {
    airports.getAirports()
    .then((quotes) => {
      console.log(quotes);
      vm.flights = quotes;
      console.log('vm.flights', vm.flights);
    });
  }
}
