var app = angular.module('StrainController',['BuddyService','ApiService'])
.controller('StrainController',function(BuddyService,ApiService,$scope){
  var self = this;
  self.total = 0;
  self.strains = [];
  self.detail = {};
  self.newStrain = {
    name:'',
    thc:0,
    indica:0,
    sativa:0,
    ppg:0
  };
  $scope.BuddyService = BuddyService;
  $scope.$watch('BuddyService.strains.length',function(newVal,oldVal){
    self.update();
  });
  self.calculateTotal = function(){
      var total = 0;
      var unit = 'G';
      self.strains.forEach(function(strain){
          if(parseInt(strain.inStock)){
              total += parseFloat(strain.inventory);
          }
      });
      if(total < 28){
          self.total = total;
      }else{
          unit = 'Oz';
          self.total = total / 28;
          if(self.total >= 16){
              unit = 'Lb';
              self.total = self.total / 16;
          }
      }
      self.total = (Math.round(self.total * 100) / 100).toString() + ' ' + unit;
  };
  self.update = function(){
    self.strains = BuddyService.strains;
    self.calculateTotal();
  };
  self.setDetails = function(index){
    self.detail = self.strains[index];
  };
  self.addStrain = function(){
    console.log(self.newStrain);
    ApiService.createStrain(self.newStrain).then(function(data){
      BuddyService.changeDetected = true;
    });
  }
});
