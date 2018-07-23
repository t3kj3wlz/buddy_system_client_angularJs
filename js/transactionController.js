var app = angular.module('TransactionController',['BuddyService','ApiService'])
.controller('TransactionController',function($scope,BuddyService,ApiService){
  var self = this;
  self.strains = [];
  self.buyers = [];
  self.currentUsd = 0;
  self.currentBtc = 0;
  self.deal = false;
  self.selectedStrain = 0;
  self.purchaseIncrement = 'g';
  self.fronts = {
    purchases:[],
    sales:[]
  };
  self.sale = {
    buyer:0,
    strain:0,
    payment:0,
    amount:0,
    front:false,
    discrepency:false
  };
  self.tip = {
    amount:0,
    buyer:0
  };
  self.purchase = {
    vendor:0,
    strain:0,
    amount:0,
    payment:0,
    front:false
  };
  $scope.BuddyService = BuddyService;
  $scope.$watch('BuddyService.strains.length',function(newVal,oldVal){
    self.strains = [];
    BuddyService.strains.forEach(function(strain){
      if(parseInt(strain.inStock)){
        self.strains.push(strain);
      }
    });
    self.allStrains = BuddyService.strains;
    self.sale.strain = parseInt(self.strains.length) ? self.strains[0].UID : 0;
    self.purchase.strain = parseInt(self.allStrains.length) ? self.allStrains[0].UID : 0;
    self.selectedStrain = parseInt(self.strains.length) ? self.strains[0] : {};
  });
  $scope.$watch('BuddyService.usdStash.length',function(newVal,oldVal){
    self.currentUsd = BuddyService.usdStash[BuddyService.usdStash.length - 1];
  });
  $scope.$watch('BuddyService.btcStash.length',function(newVal,oldVall){
    self.currentBtc = BuddyService.btcStash[BuddyService.btcStash.length - 1];
  });
  $scope.$watch('BuddyService.buyers.length',function(onewVal,oldVal){
    self.buyers = [];
    BuddyService.buyers.forEach(function(buyer){
      if(parseInt(buyer.active)){
        self.buyers.push(buyer);
      }
    });
    self.sale.buyer = parseInt(self.buyers.length) ? self.buyers[0].UID : 0;
    self.tip.buyer = parseInt(self.buyers.length) ? self.buyers[0].UID : 0;
  });
  $scope.$watch('BuddyService.vendors.length',function(newVal,oldVal){
    self.vendors = BuddyService.vendors;
    self.purchase.vendor = parseInt(self.vendors.length) ? self.vendors[0].UID : 0;
  });
  $scope.$watch('BuddyService.transactions.length',function(newVal,oldVal){
    self.fronts = {purchases:[],sales:[]};
    BuddyService.transactions.forEach(self.parseFront);
  });
  self.makeSale = function(){
    console.log(self.sale);
    if(!self.deal && parseInt(self.sale.buyer)){
      self.sale.payment = parseInt(self.selectedStrain.ppg) * self.sale.amount;
    }else if(!parseInt(self.sale.buyer)){
      self.sale.payment = 0;
    }
    ApiService.makeSale(self.sale).then(function(data){
      BuddyService.changeDetected = true;
    });
  };
  self.acceptTip = function(){
    console.log(self.tip);
    ApiService.acceptTip(self.tip).then(function(data){
      BuddyService.changeDetected = true;
    });
  };
  self.makePurchase = function(){
    switch(self.purchaseIncrement){
      case "g":
      break;
      case "oz":
        self.purchase.amount *= 28;
      break;
      case "lb":
        self.purchase.amount *= 448;
      break;
      default:
      return;
    }
    self.purchase.vendor = -Math.abs(self.purchase.vendor);
    ApiService.makePurchase(self.purchase).then(function(data){
      BuddyService.changeDetected = true;
    });
  };
  self.settleFront = function(transactionId){
    ApiService.settleFront(transactionId).then(function(data){
      BuddyService.changeDetected = true;
    });
  };
  self.parseFront = function(transaction){
    if(parseInt(transaction.front) && transaction.front_paid === null){
      transaction.created_date = new Date(transaction.created_date);
      transaction.displayClass = self.calculateDebtClass(transaction);
      if(transaction.trans_type === 'S'){
        self.fronts.sales.push(transaction);
      }else{
        self.fronts.purchases.push(transaction);
      }
    }
  };
  self.calculateDebtClass = function(transaction){
    var now = new Date();
    var then = transaction.created_date;
    var seconds = Math.abs(now - then) / 1000;
    var days = Math.floor(seconds / 86400);
    if(days <= 3){
      return ['list-group-item','list-group-item-success'];
    }else if(days <= 7){
      return ['list-group-item','list-group-item-info'];
    }else if(days <= 14){
      return ['list-group-item','list-group-item-warning'];
    }
    return ['list-group-item','list-group-item-danger'];
  }
});
