angular
  .module('auroraApp')
  .controller('TripsIndexCtrl', TripsIndexCtrl)
  .controller('TripsNewCtrl', TripsNewCtrl)
  .controller('TripsShowCtrl', TripsShowCtrl)
  .controller('TripsEditCtrl', TripsEditCtrl);


TripsIndexCtrl.$inject = ['Trip'];
function TripsIndexCtrl(Trip) {
  const vm = this;

  vm.all = Trip.query();

}

TripsNewCtrl.$inject = ['Trip', '$state' ];
function TripsNewCtrl(Trip, $state ) {
  const vm = this;
  vm.trip = {};


  function tripsCreate() {
    // wrap the data in a `trip` object
    Trip
      .save({ trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsDestination'));
  }


  vm.create = tripsCreate;
}

TripsShowCtrl.$inject = ['Trip', '$stateParams', '$state'];
function TripsShowCtrl(Trip, $stateParams, $state) {
  const vm = this;
  vm.trip = Trip.get($stateParams);

  function tripsDelete() {
    vm.trip
      .$remove()
      .then(() => $state.go('alltrips'));
  }

  vm.delete = tripsDelete;
}



TripsEditCtrl.$inject = ['Trip', '$stateParams', '$state', '$scope', '$auth', 'airports', 'auroras' ];
function TripsEditCtrl(Trip, $stateParams, $state, $scope, $auth, airports, auroras ) {
  const vm = this;
  vm.flights = [];
  vm.aurora = [];

  vm.trip = Trip.get($stateParams);

  function tripsUpdate() {

    Trip.update({ id: vm.trip.id, trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsShow', $stateParams));
  }

  vm.update = tripsUpdate;

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

  function addFlightToRecord(DestinationCity, DestinationAirport, OriginAirport, MinPrice, CarrierName, lat, lng) {
    vm.trip.destination_name = DestinationCity;
    vm.trip.destination_airport = DestinationAirport;
    vm.trip.origin_airport = OriginAirport;
    vm.trip.price = MinPrice;
    vm.trip.airline = CarrierName;
    vm.trip.destination_lat = lat;
    vm.trip.destination_lng =lng;
  }

  vm.addFlightToRecord = addFlightToRecord;

  }

  vm.getLatLng = getLatLng;
}
