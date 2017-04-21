angular
  .module('auroraApp')
  .controller('MapPageCtrl', MapPageCtrl)
  .controller('ProbabilitiesIndexCtrl', ProbabilitiesIndexCtrl);


MapPageCtrl.$inject = ['Trip',  '$stateParams', '$state', '$scope', '$auth', 'airports', 'auroras'];
function MapPageCtrl(Trip, $stateParams, $state, $scope, $auth, airports, auroras) {
  const vm = this;
  vm.trip = {};
  vm.flights = [];
  vm.aurora = [];

  // const userId = $auth.getPayload().userId;
  //
  // User.get({ id: userId }, (user) => {
  //   vm.user = user;
  // });
  //
  vm.trip = Trip.get($stateParams);


  function getLatLng(lat, lng) {
    console.log('inside here');
    console.log(lat, lng);
    vm.chosenLatLng = { lat, lng };
    console.log('chosenLatLng', vm.chosenLatLng);
    $scope.$apply();


    getAirports(vm.trip.origin_lat, vm.trip.origin_lng, lat, lng);

    function getAirports() {
      console.log('controller', vm.trip.origin_lat);
      airports.getAirports(vm.trip.origin_lat, vm.trip.origin_lng,lat, lng)
      .then((quotes) => {
        console.log(quotes);
        vm.flights = quotes;
        // console.log('vm.flights', vm.flights);
      });
    }

    getAuroras(lat, lng);

    function getAuroras() {
      auroras.getAuroras(lat, lng)
        .then((data) => {
          console.log(data);
          vm.aurora = data;
        });
    }
  }
  vm.getLatLng = getLatLng;
}

ProbabilitiesIndexCtrl.$inject = ['Probability'];
function ProbabilitiesIndexCtrl(Probability) {
  const vm = this;

  vm.all = Probability.query();
  console.log('is it this', vm.all);
}
