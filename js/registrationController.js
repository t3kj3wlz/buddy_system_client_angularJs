var app = angular.module('RegistrationController',['ApiService'])
.controller('RegistrationController',function(ApiService,$q,$location){
  var self = this;
  self.vendors = [];
  self.buyers = [];
  self.strains = [];
  self.buyerStr = '';
  self.vendorStr = '';
  self.btcStash = 0;
  self.usdStash = 0;
  self.addStrain = function(){
    self.strains.push({name:'',thc:0,indica:0,sativa:0,ppg:0,inStock:1,inventory:0,description:''});
  }
  self.removeStrain = function(index){
    self.strains.splice(index,1);
  }
  self.submit = function(){
    var promises = [];
    var totalGrams = 0;
    self.buyers = self.buyerStr.split("\n");
    self.vendors = self.vendorStr.split("\n");
    self.buyers.forEach((name)=>{
      var newBuyer = {buyer:name,active:1};
      promises.push(ApiService.createBuyer(newBuyer));
    });
    self.vendors.forEach((name)=>{
      var newVendor = {name:name};
      promises.push(ApiService.createVendor(newVendor));
    });
    self.strains.forEach((strain)=>{
      totalGrams += strain.inventory;
      promises.push(ApiService.createStrain(strain));
    });
    promises.push(ApiService.createInventory({currentInventory:totalGrams}));
    promises.push(ApiService.createUsdStash({current_stash:self.usdStash}));
    promises.push(ApiService.createBtcStash({current_stash:self.btcStash}));
    $q.all(promises).then(function(data){
      console.log(data);
      $location.path('/home');
    });
  }
  self.addStrain();
});
