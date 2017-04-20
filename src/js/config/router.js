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

    // .state('tripsIndex', {
    //   url: '/alltrips',
    //   templateUrl: 'js/views/trips/index.html',
    //   controller: 'TripsIndexCtrl as tripsIndex'
    // })
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

    .state('tripsShow', {
      url: '/trip/:id',
      templateUrl: 'js/views/trips/show.html',
      controller: 'TripsShowCtrl as tripsShow'
    })
    .state('tripsDestination', {
      url: '/auroras/:id',
      templateUrl: 'js/views/trips/destination.html',
      controller: 'MapPageCtrl as mapPage'
    })
    .state('tripsIndex', {
      url: '/alltrips',
      templateUrl: 'js/views/trips/index.html',
      controller: 'TripsIndexCtrl as tripsIndex'
    })

    //
    // .state('cinemas', {
    //   url: '/date/:id/addcinema',
    //   templateUrl: 'js/views/googleMap.html',
    //   controller: 'CinemaCtrl as cinemas'
    // })
    //
    // .state('restaurants', {
    //   url: '/date/:id/findrestaurant',
    //   templateUrl: 'js/views/restaurantMap.html',
    //   controller: 'RestaurantCtrl as restaurants'
    // })

    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })

    // .state('testing', {
    //   url: '/testing',
    //   templateUrl: 'js/views/testing.html',
    //   controller: 'AirportsIndexCtrl as airports'
    // })

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
