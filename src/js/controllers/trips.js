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

TripsNewCtrl.$inject = ['Trip', '$state'];
function TripsNewCtrl(Trip, $state) {
  const vm = this;
  vm.trip = {};

  function tripsCreate() {
    // wrap the data in a `trip` object
    Trip
      .save({ trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsIndex'));
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
      .then(() => $state.go('tripsIndex'));
  }

  vm.delete = tripsDelete;
}

TripsEditCtrl.$inject = ['Trip', '$stateParams', '$state'];
function TripsEditCtrl(Trip, $stateParams, $state) {
  const vm = this;

  vm.trip = Trip.get($stateParams);

  function tripsUpdate() {
    // wrap the data in a `trip` object and pass the trip's id
    // to the model so it can generate the correct URL
    Trip.update({ id: vm.trip.id, trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsShow', $stateParams));
  }

  vm.update = tripsUpdate;
}
