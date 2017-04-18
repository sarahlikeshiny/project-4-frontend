angular
  .module('auroraApp')
  .controller('DBLocationsIndexCtrl', DBLocationsIndexCtrl)
  .controller('DBLocationsNewCtrl', DBLocationsNewCtrl)
  .controller('DBLocationsShowCtrl', DBLocationsShowCtrl)
  .controller('DBLocationsEditCtrl', DBLocationsEditCtrl);

// TripsIndexCtrl.$inject = ['Trip','auroras'];
// function TripsIndexCtrl(Trip, auroras) {
DBLocationsIndexCtrl.$inject = ['DBLocation'];
function DBLocationsIndexCtrl(DBLocation) {
  const vm = this;

  vm.all = DBLocation.query();

}


DBLocationsNewCtrl.$inject = ['DBLocation', '$state'];
function DBLocationsNewCtrl(DBLocation, $state) {
  const vm = this;
  vm.DBLocation = {};

  function dBLocationsCreate() {
    // wrap the data in a `dBLocation` object
    DBLocation
      .save({ dBLocation: vm.dBLocation })
      .$promise
      .then(() => $state.go('dBLocationsIndex'));
  }

  vm.create = dBLocationsCreate;
}

DBLocationsShowCtrl.$inject = ['DBLocation', '$stateParams', '$state'];
function DBLocationsShowCtrl(DBLocation, $stateParams, $state) {
  const vm = this;

  vm.dBLocation = dBLocation.get($stateParams);

  function dBLocationsDelete() {
    vm.dBLocation
      .$remove()
      .then(() => $state.go('DBLocationsIndex'));
  }

  vm.delete = dBLocationsDelete;
}

DBLocationsEditCtrl.$inject = ['DBLocation', '$stateParams', '$state'];
function DBLocationsEditCtrl(DBLocation, $stateParams, $state) {
  const vm = this;

  vm.dBLocation = DBLocation.get($stateParams);

  function dBLocationsUpdate() {
    // wrap the data in a `dBLocation` object and pass the dBLocation's id
    // to the model so it can generate the correct URL
    DBLocation.update({ id: vm.dBLocation.id, dBLocation: vm.dBLocation })
      .$promise
      .then(() => $state.go('dBLocationsShow', $stateParams));
  }

  vm.update = dBLocationsUpdate;
}
