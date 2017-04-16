angular
  .module('auroraApp')
  .factory('ErrorHandler', ErrorHandler);

ErrorHandler.$inject = ['$rootScope'];
function ErrorHandler($rootScope) {
  return {
    responseError(err) {
      $rootScope.$broadcast('error', err);
    }
  };
}
