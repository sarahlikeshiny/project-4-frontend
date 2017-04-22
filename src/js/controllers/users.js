angular
  .module('auroraApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();
}

UsersShowCtrl.$inject = ['User', 'Trip', '$stateParams', '$state'];
function UsersShowCtrl(User, Trip, $stateParams, $state) {
  const vm = this;
  vm.userTrips = [];

  vm.user = User.get($stateParams, (user) => {
    vm.user = user;
    vm.userTrips = Trip.query({ createdBy: user.id });
  });

  function usersDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('tripsNew'));
  }

  vm.delete = usersDelete;
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    vm.user
      .$update()
      .then(() => $state.go('usersShow', $stateParams));
  }

  vm.update = usersUpdate;
}
