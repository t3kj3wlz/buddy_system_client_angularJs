var app = angular.module('BuddyClient',[
  'ngRoute',
  'ngCookies',
  'ApiService',
  'BuddyService',
  'LoginController',
  'HomeController',
  'StrainController',
  'TransactionController',
  'BuyerController',
  'VendorController',
  'BurnNoticeController',
  'RegistrationController'
])
.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/home',{templateUrl:'views/content.html'})
  .when('/register',{templateUrl:'views/register.html'})
  .when('/',{templateUrl:'views/login.html'})
  .otherwise({redirectTo:'/'});
}]);
