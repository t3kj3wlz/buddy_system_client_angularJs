var app = angular.module('VendorController',['ApiService','BuddyService'])
.controller('VendorController',function($scope,BuddyService,ApiService){
  var self = this;
  self.newVendor = {};
  self.vendors = [];
  $scope.BuddyService = BuddyService;
  $scope.$watch('BuddyService.vendors.length',function(newVal,oldVal){
    self.vendors = BuddyService.vendors;
  });
  self.addVendor = function(){
    console.log(self.newVendor);
    ApiService.createVendor(self.newVendor).then(function(data){
      BuddyService.changeDetected = true;
    });
  };
});
