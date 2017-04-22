angular
 .module('auroraApp')
 .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;

  function register() {
    $auth.signup(vm.user)
       .then(user => console.log(user));
  }
  vm.register = register;

  function login() {
    $auth.login(vm.credentials)
    .$promise
    .then(() => $state.go('tripsNew'));
  }
  vm.login = login;

  function authenticate(provider) {
    $auth.authenticate(provider)
      .then(user => console.log(user));
  }
  vm.authenticate = authenticate;
}
