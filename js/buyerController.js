var app = angular.module('BuyerController',['BuddyService','ApiService'])
.controller('BuyerController',function($scope,BuddyService,ApiService){
  var self = this;
  self.newBuyer = {
    buyer:'',
    active:1
  };
  self.activeBuyers = [];
  self.buyers = [];
  $scope.BuddyService = BuddyService;
  $scope.$watch('BuddyService.buyers.length',function(newVal,oldVal){
    self.buyers = BuddyService.buyers;
  });
  $scope.$watch('BuddyService.transactions.length',function(newVal,oldVal){
    if(self.buyers.length && newVal > 0){
      self.activeBuyers = [];
      self.buyers.forEach((buyer)=>{
        if(parseInt(buyer.active)){
          buyer.stats = buddyModule.buyerStats(BuddyService.transactions,buyer.buyer);
          buyer.stats.predictionClass = self.calculatePredictionClass(buyer.stats.predictedDays);
          self.activeBuyers.push(buyer);
        }
      });
    }
    console.log(self.activeBuyers);
  });
  self.addBuyer = function(){
    console.log(self.newBuyer);
    ApiService.createBuyer(self.newBuyer).then(function(data){
      BuddyService.changeDetected = true;
    });
  };
  self.calculatePredictionClass = function(predictedDays){
    if(parseInt(predictedDays) < 0){
      return ['list-group-item','list-group-item-danger'];
    }else if(parseInt(predictedDays) <= 3){
      return ['list-group-item','list-group-item-success'];
    }
    return ['list-group-item','list-group-item-info'];
  }
});
