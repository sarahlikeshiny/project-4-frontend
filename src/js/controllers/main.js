angular
  .module('auroraApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
function MainCtrl($rootScope, $state, $auth) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;

  vm.logout = logout;

  function logout(){
    $auth.logout();//remove the token
    $state.go('login');//send the user to the login
  }

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    if(err.status === 401) $state.go('login');
  });
  $rootScope.$on('$stateChangeSuccess', () => {
    if (vm.stateHasChanged) vm.message = null;//stops the message from persisting across the states.
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
  });
}
