var app = angular.module('BuddyService',['ApiService'])
.factory('BuddyService',function(ApiService){
  return {
    changeDetected:false,
    strains:[],
    transactions:[],
    buyers:[],
    vendors:[],
    btcStash:[],
    usdStash:[]
  }
});
