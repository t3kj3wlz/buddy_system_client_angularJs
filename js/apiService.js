var app = angular.module('ApiService',[])
    .factory('ApiService',function($http){
        const APIBASE = 'http://api.outlawdesigns.io:9663/';
        return {
            token:1234,
            handleResponse:function(response){
                return response.data;
            },
            handleError:function(err){
                return err;
            },
            buildAuthHeader:function(){
                return {headers:{'auth_token': this.token}};
            },
            authenticate:function(username,password){
                var url = APIBASE + 'authenticate';
                var config = {headers:{"request_token": username,"password":password}};
                return $http.get(url,config).then(this.handleResponse,this.handleError);
            },
            verifyToken:function(){
                var url = APIBASE + 'verify';
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getAllTransactions:function(){
                var url = APIBASE + 'transaction';
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getTransaction:function(id){
                var url = APIBASE + 'transaction/' + id;
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            updateTransaction:function(id,transaction){
                var url = APIBASE + 'transaction/' + id;
                return $http.put(url,transaction,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            makeSale:function(saleObj){
                var url = APIBASE + 'transaction/sale';
                return $http.post(url,saleObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            makePurchase:function(purchaseObj){
                var url = APIBASE + 'transaction/purchase';
                return $http.post(url,purchaseObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            acceptTip:function(tipObj){
                var url = APIBASE + 'transaction/tip';
                return $http.post(url,tipObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getInventoryHistory:function(){
                var url = APIBASE + 'inventory/';
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getInventoryObj:function(id){
                var url = APIBASE + 'inventory/' + id;
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            createInventory:function(inventoryObj){
                var url = APIBASE + 'inventory/';
                return $http.post(url,inventoryObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            updateInventory:function(id,inventoryObj){
                var url = APIBASE + 'inventory/' + id;
                return $http.put(url,inventoryObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getAllStrains:function(){
                var url = APIBASE + 'strain/';
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getStrain:function(id){
                var url = APIBASE + 'strain/' + id;
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            createStrain:function(strainObj){
                var url = APIBASE + 'strain/';
                return $http.post(url,strainObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            updateStrain:function(id,strainObj){
                var url = APIBASE + 'strain/' + id;
                return $http.put(url,strainObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getAllOrders:function(){
                var url = APIBASE + 'order/';
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getOrder:function(id){
                var url = APIBASE + 'order/' + id;
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            createOrder:function(orderObj){
                var url = APIBASE + 'order/';
                return $http.post(url,orderObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            updateOrder:function(id,orderObj){
                var url = APIBASE + 'order/' + id;
                return $http.put(url,orderObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getAllTransfers:function(){
                var url = APIBASE + 'xfer/';
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getTransfer:function(id){
                var url = APIBASE + 'xfer/' + id;
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            createTransfer:function(xferObj){
                var url = APIBASE + 'xfer/';
                return $http.post(url,xferObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            updateTransfer:function(id,xferObj){
                var url = APIBASE + 'xfer/' + id;
                return $http.put(url,xferObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getAllVendors:function(){
                var url = APIBASE + 'vendor/';
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getVendor:function(id){
                var url = APIBASE + 'vendor/' + id;
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            createVendor:function(vendorObj){
                var url = APIBASE + 'vendor/';
                return $http.post(url,vendorObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            updateVendor:function(id,vendorObj){
                var url = APIBASE + 'vendor/' + id;
                return $http.put(url,vendorObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getAllUsdStash:function(){
                var url = APIBASE + 'stash_usd/';
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getUsdStash:function(id){
                var url = APIBASE + 'stash_usd/' + id;
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            createUsdStash:function(stashObj){
                var url = APIBASE + 'stash_usd/';
                return $http.post(url,stashObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            updateUsdStash:function(id,stashObj){
                var url = APIBASE + 'stash_usd/' + id;
                return $http.put(url,stashObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getAllBtcStash:function(){
                var url = APIBASE + 'stash_btc/';
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getBtcStash:function(id){
                var url = APIBASE + 'stash_btc/' + id;
                return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            createBtcStash:function(stashObj){
                var url = APIBASE + 'stash_btc';
                return $http.post(url,stashObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            updateBtcStash:function(id,stashObj){
                var url = APIBASE + 'stash_btc';
                return $http.put(url,stashObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getAllBuyers:function(){
              var url = APIBASE + 'buyer';
              return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            getBuyer:function(id){
              var url = APIBASE + 'buyer/' + id;
              return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            createBuyer:function(buyerObj){
              var url = APIBASE + 'buyer';
              return $http.post(url,buyerObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            updateBuyer:function(buyerObj){
              var url = APIBASE + 'buyer';
              return $http.put(url,buyerObj,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            },
            settleFront:function(transactionId){
              var url = APIBASE + 'transaction/front/' + transactionId;
              return $http.get(url,this.buildAuthHeader()).then(this.handleResponse,this.handleError);
            }
        }
    });
