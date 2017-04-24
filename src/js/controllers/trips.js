angular
  .module('auroraApp')
  .controller('TripsIndexCtrl', TripsIndexCtrl)
  .controller('TripsNewCtrl', TripsNewCtrl)
  .controller('TripsShowCtrl', TripsShowCtrl)
  .controller('TripsEditCtrl', TripsEditCtrl)
  .controller('TripsDeleteCtrl', TripsDeleteCtrl);


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
      .then((trip) => $state.go('tripsShow', { id: trip.id }));
  }


  vm.create = tripsCreate;
}

TripsShowCtrl.$inject = ['Trip', '$stateParams', '$state', '$uibModal'];
function TripsShowCtrl(Trip, $stateParams, $state, $uibModal) {
  const vm = this;
  vm.trip = Trip.get($stateParams);

  function openModal(){
    $uibModal.open({
      templateUrl: 'js/views/partials/tripDelete.html',
      controller: 'TripsDeleteCtrl as tripsDelete',
      resolve: {
        currentTrip: () => {
          return vm.trip; //already have the vm.bird from the database so just pass in.
        }
      }
    });
  }
  vm.open = openModal;

}

//
//   function tripsDelete() {
//     vm.trip
//       .$remove()
//       .then(() => $state.go('tripsNew'));
//   }
//
//   vm.delete = tripsDelete;
// }



TripsEditCtrl.$inject = ['Trip', '$stateParams', '$state', '$scope', '$auth', 'airports', 'auroras' ];
function TripsEditCtrl(Trip, $stateParams, $state, $scope, $auth, airports, auroras ) {
  const vm = this;
  vm.flights = [];
  vm.weather =[];
  vm.aurora = [];

  vm.trip = Trip.get($stateParams);


  function tripsUpdate() {

    Trip.update({ id: vm.trip.id, trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsShow', $stateParams));
  }

  vm.update = tripsUpdate;

  function getLatLng(lat, lng) {
    // console.log('inside here');
    // console.log(lat, lng);
    vm.chosenLatLng = { lat, lng };
    // console.log('chosenLatLng', vm.chosenLatLng);
    $scope.$apply();


    getAirports(vm.trip.origin_lat, vm.trip.origin_lng, lat, lng);

    function getAirports() {
      airports.getAirports(vm.trip.origin_lat, vm.trip.origin_lng,lat, lng)
      .then((quotes) => {
        // console.log(quotes);
        vm.flights = quotes;
        // console.log('vm.flights', vm.flights);
      });
    }

    getAuroras(lat, lng);

    function getAuroras() {
      auroras.getAuroras(lat, lng)
        .then((data) => {
          vm.weather = data.weather;
          vm.aurora = data;
        });
    }
  }

  vm.getLatLng = getLatLng;

  function addFlight(flight) {
    // console.log(flight);
    vm.selectedFlight = flight.QuoteId;
    vm.trip.destination_name = flight.DestinationCity;
    vm.trip.destination_airport = flight.DestinationAirport;
    vm.trip.origin_airport = flight.OriginAirport;
    vm.trip.price = flight.MinPrice;
    vm.trip.airline = flight.CarrierName;
    vm.trip.destination_lat = vm.chosenLatLng.lat;
    vm.trip.destination_lng = vm.chosenLatLng.lng;
  }

  vm.addFlight = addFlight;


}
TripsDeleteCtrl.inject = ['$uibModalInstance', 'currentTrip', '$state'];//instance of the modal thats just been opened. The currentBird is the item from resolve
function TripsDeleteCtrl($uibModalInstance, currentTrip, $state) {
  const vm = this;
  vm.trip = currentTrip;

  function closeModal() {
    $uibModalInstance.close();
  }
  vm.close = closeModal;

  function tripsDelete() {
    vm.trip
      .$remove()
      .then(() => {
        $state.go('tripsIndex');
        $uibModalInstance.close();//go to birds index page and close modal
      });
  }

  vm.delete = tripsDelete;

}
