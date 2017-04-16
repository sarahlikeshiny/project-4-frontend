angular
 .module('auroraApp')
 .controller('RegisterCtrl', RegisterCtrl)
 .controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user= {};

  function submit() {
    $auth.signup(vm.user)
    .then(() => $state.go('login'));
  }
  vm.submit = submit;
}

LoginCtrl.$inject = ['$auth', '$state', '$rootScope'];
function LoginCtrl($auth, $state, $rootScope) {
  const vm = this;
  vm.credentials= {};

  function submit() {
    if (vm.loginForm.$valid) {
      $auth.login(vm.credentials)
        .then((res) => {
          const currentUserId = $auth.getPayload().userId;
          $rootScope.$broadcast('loggedIn', res.data.user);
          // $state.go('usersShow', { id: currentUserId });
          $state.go('tripsNew');
        });
    }
  }

  vm.submit = submit;
}
