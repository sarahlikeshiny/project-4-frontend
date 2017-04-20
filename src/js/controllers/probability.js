// angular
//   .module('auroraApp')
//   .controller('ProbabilitiesIndexCtrl', ProbabilitiesIndexCtrl)
//   .controller('ProbabilitiesNewCtrl', ProbabilitiesNewCtrl)
//   .controller('ProbabilitiesShowCtrl', ProbabilitiesShowCtrl)
//   .controller('ProbabilitiesEditCtrl', ProbabilitiesEditCtrl);
//
// // TripsIndexCtrl.$inject = ['Trip','auroras'];
// // function TripsIndexCtrl(Trip, auroras) {
// ProbabilitiesIndexCtrl.$inject = ['Probability'];
// function ProbabilitiesIndexCtrl(Probability) {
//   const vm = this;
//
//   vm.all = Probability.query();
//   console.log(vm.all);
// }
//
//
// ProbabilitiesNewCtrl.$inject = ['Probability', '$state'];
// function ProbabilitiesNewCtrl(Probability, $state) {
//   const vm = this;
//   vm.Probability = {};
//
//   function probabilitiesCreate() {
//     // wrap the data in a `dBLocation` object
//     Probability
//       .save({ Probability: vm.Probability })
//       .$promise
//       .then(() => $state.go('ProbabilitiesIndex'));
//   }
//
//   vm.create = probabilitiesCreate;
// }
//
// ProbabilitiesShowCtrl.$inject = ['Probability', '$stateParams', '$state'];
// function ProbabilitiesShowCtrl(Probability, $stateParams, $state) {
//   const vm = this;
//
//   vm.probability = Probability.get($stateParams);
//
//   function probabilitiesDelete() {
//     vm.Probability
//       .$remove()
//       .then(() => $state.go('ProbabilitiesIndex'));
//   }
//
//   vm.delete = probabilitiesDelete;
// }
//
// ProbabilitiesEditCtrl.$inject = ['Probability', '$stateParams', '$state'];
// function ProbabilitiesEditCtrl(Probability, $stateParams, $state) {
//   const vm = this;
//
//   vm.probability =Probability.get($stateParams);
//
//   function probabilitiesUpdate() {
//     // wrap the data in a `dBLocation` object and pass the dBLocation's id
//     // to the model so it can generate the correct URL
//     Probability.update({ id: vm.probability.id, dBLocation: vm.probability })
//       .$promise
//       .then(() => $state.go('probabilitiesShow', $stateParams));
//   }
//
//   vm.update = probabilitiesUpdate;
// }
