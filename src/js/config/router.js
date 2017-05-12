angular
  .module('auroraApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {//homepage - with logo
      url: '/',
      templateUrl: 'js/views/home.html'
    })
    .state('tripsNew', {//new date form page
      url: '/trip/new',
      templateUrl: 'js/views/trips/new.html',
      controller: 'TripsNewCtrl as tripsNew'
    })

    .state('tripsEdit', {
      url: '/trip/:id/edit',
      templateUrl: 'js/views/trips/edit.html',
      controller: 'TripsEditCtrl as tripsEdit'
    })

    .state('flights', {
      url: '/trip/:id/flights',
      templateUrl: 'js/views/trips/flightsboard.html',
      controller: 'TripsEditCtrl as tripsEdit'
    })

    .state('tripsShow', {
      url: '/trip/:id',
      templateUrl: 'js/views/trips/show.html',
      controller: 'TripsShowCtrl as tripsShow'
    })
    .state('tripsIndex', {
      url: '/alltrips',
      templateUrl: 'js/views/trips/index.html',
      controller: 'TripsIndexCtrl as tripsIndex'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    });


  $urlRouterProvider.otherwise('/login');
}
