angular
  .module('auroraApp')
  .controller('PlacesCtrl', PlacesCtrl);

PlacesCtrl.$inject = [ 'Trip', '$stateParams', '$scope'];
function PlacesCtrl(Trip, $stateParams, $scope) {
  const vm = this;
  vm.all = [];
  vm.trip = {};

  // DateNight.get($stateParams, (date) => {
  //   vm.date = date;
  //   // console.log('date', vm.date);
  // });
  //
  // $scope.$watch(() => vm.date, getRestaurants);
  // // $scope.$watch(() => vm.selected, getSelectedRestaurant);
  // //
  // // function getSelectedRestaurant() {
  // //
  // // }

  function getAirports() {
    if(!vm.trip.origin_airport) return false;
    places.getAirports(vm.trip.destination_lat, vm.trip.destaintion_lng)
    .then((data)=>{
      console.log('data', data);
      return vm.all = data;
    });
  }
}
