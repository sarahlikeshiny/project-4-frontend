angular
  .module('auroraApp')
  .controller('TripsIndexCtrl', TripsIndexCtrl)
  .controller('TripsNewCtrl', TripsNewCtrl)
  .controller('TripsShowCtrl', TripsShowCtrl)
  .controller('TripsEditCtrl', TripsEditCtrl);

// TripsIndexCtrl.$inject = ['Trip','auroras'];
// function TripsIndexCtrl(Trip, auroras) {
TripsIndexCtrl.$inject = ['Trip'];
function TripsIndexCtrl(Trip) {
  const vm = this;

  vm.all = Trip.query();
  // vm.locations = [];

  // function getAuroras() {
  //   auroras.getAuroras()
  //     .then((response) => {
  //       vm.locations = response;
  //       console.log(vm.locations[0].lat);
  //     });
  // }
  //
  // getAuroras();
}


TripsNewCtrl.$inject = ['Trip', '$state', '$scope'];
function TripsNewCtrl(Trip, $state, $scope) {
  const vm = this;
  vm.trip = {};

  function tripsCreate() {
    // wrap the data in a `trip` object
    Trip
      .save({ trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  function getLatLng(lat, lng) {
    console.log('inside here');
    console.log(lat, lng);
    vm.chosenLatLng = { lat, lng };
    $scope.$apply();

  }

  vm.getLatLng = getLatLng;

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
