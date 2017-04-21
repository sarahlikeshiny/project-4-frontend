angular
  .module('auroraApp')
  .controller('ProbabilitiesIndexCtrl', ProbabilitiesIndexCtrl);


ProbabilitiesIndexCtrl.$inject = ['Probability'];
function ProbabilitiesIndexCtrl(Probability) {
  const vm = this;

  vm.all = Probability.query();
}
