var app = angular.module('BurnNoticeController',['BuddyService'])
.controller('BurnNoticeController',function(BuddyService,$scope){
  var self = this;
  $scope.BuddyService = BuddyService;
  $scope.$watch('BuddyService.transactions.length',function(newVal,oldVal){
    self.stats = buddyModule.weeklyStats(BuddyService.transactions);
    if(self.stats.total < 28){
      self.increment = 'Grams';
    }else if(self.stats.total < 448){
      self.increment = 'Oz';
      self.stats.total = buddyModule._toOz(self.stats.total);
    }else{
      self.increment = 'Lb';
      self.stats.total = buddyModule._toPounds(self.stats.total);
    }
    self.stats.soldCss = self.calculateSalesClass(self.stats.sold);
    self.stats.personalCss = self.calculatePersonalClass(self.stats.personal);
    self.stats.discrepCss = self.calculateDiscrepClass(self.stats.discrepency);
  });
  self.calculateSalesClass = function(percentage){
    if(percentage >= 90){
      return ['list-group-item','list-group-item-success'];
    }else if(percentage <= 89 && percentage >= 80){
      return ['list-group-item','list-group-item-info'];
    }else if(percentage <= 79 && percentage >= 70){
      return ['list-group-item','list-group-item-warning'];
    }
    return ['list-group-item','list-group-item-danger'];
  };
  self.calculatePersonalClass = function(percentage){
    if(percentage >= 33){
      return ['list-group-item','list-group-item-danger'];
    }else if(percentage >= 25){
      return ['list-group-item','list-group-item-warning'];
    }else if(percentage >= 10){
      return ['list-group-item','list-group-item-info'];
    }
    return ['list-group-item','list-group-item-success'];
  };
  self.calculateDiscrepClass = function(percentage){
    if(percentage >= 20){
      return ['list-group-item','list-group-item-danger'];
    }else if(percentage >= 15){
      return ['list-group-item','list-group-item-warning'];
    }else if(percentage >= 10){
      return ['list-group-item','list-group-item-info'];
    }
    return ['list-group-item','list-group-item-success'];
  };
});
