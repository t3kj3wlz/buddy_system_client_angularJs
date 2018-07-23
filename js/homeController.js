var app = angular.module('HomeController',['ngCookies','ApiService','BuddyService'])
.controller('HomeController',function($location,$cookies,$scope,ApiService,BuddyService){
  var self = this;
  $scope.BuddyService = BuddyService;
  $scope.$watch('BuddyService.changeDetected',function(newVal,oldVal){
    if(newVal){
      self.init();
    }
  });
  self.checkCookie = function(){
    var token = $cookies.get('auth_token');
    if(token !== undefined){
      ApiService.token = token;
      ApiService.verifyToken().then(function(data){
        if(data.error){
          $location.path('/');
          return;
        }
        self.init();
      });
    }
  };
  self.init = function(){
    console.log('Running home.init');
    BuddyService.strains = [];
    BuddyService.transactions = [];
    ApiService.getAllStrains().then(function(data){
      if(!data.error){
        BuddyService.strains = data;
      }
    });
    ApiService.getAllVendors().then(function(data){
      if(!data.error){
        BuddyService.vendors = data;
      }
    });
    ApiService.getAllBuyers().then(function(data){
      if(!data.error){
        BuddyService.buyers = data;
      }
    });
    ApiService.getAllTransactions().then(function(data){
      if(!data.error){
        BuddyService.transactions = data;
      }
    });
    ApiService.getAllBtcStash().then(function(data){
      if(!data.error){
        BuddyService.btcStash = data;
      }
    });
    ApiService.getAllUsdStash().then(function(data){
      if(!data.error){
        BuddyService.usdStash = data;
      }
    });
    BuddyService.changeDetected = false;
  };
  self.checkCookie();
});
