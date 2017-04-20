angular
  .module('auroraApp')
  .controller('TripsIndexCtrl', TripsIndexCtrl)
  .controller('TripsNewCtrl', TripsNewCtrl)
  .controller('TripsShowCtrl', TripsShowCtrl)
  .controller('TripsEditCtrl', TripsEditCtrl);
  // .controller('TripsDeleteCtrl', TripsDeleteCtrl);

// TripsIndexCtrl.$inject = ['Trip','auroras'];
// function TripsIndexCtrl(Trip, auroras) {
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

TripsShowCtrl.$inject = ['Trip', '$stateParams', '$state', '$uibModal'];
function TripsShowCtrl(Trip, $stateParams, $state, $uibModal) {
  const vm = this;

      vm.trip = Trip.get($stateParams);

    //   function openModal(){
    //     $uibModal.open({
    //       templateUrl: 'js/views/partials/tripsDelete.html',
    //       controller: 'TripsDeleteCtrl as tripsDelete',
    //       resolve: {
    //         currentTrips: () => {
    //           return vm.trip;
    //         }
    //       }
    //     });
    // }
  vm.open = openModal;
}



TripsEditCtrl.$inject = ['Trip', '$stateParams', '$state' ];
function TripsEditCtrl(Trip, $stateParams, $state ) {
  const vm = this;

  vm.trip = Trip.get($stateParams);

  function tripsUpdate() {

    Trip.update({ id: vm.trip.id, trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsShow', $stateParams));
  }

  vm.update = tripsUpdate;
}
