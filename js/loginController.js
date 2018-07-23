var app = angular.module('LoginController',['ApiService','ngCookies'])
.controller('LoginController',function($location,$cookies,ApiService){
  var self = this;
  self.username;
  self.password;
  self.checkCookie = function(){
    var token = $cookies.get('auth_token');
    if(token !== undefined){
      ApiService.token = token;
      self.verifyToken();
    }
  };
  self.login = function(){
    ApiService.authenticate(self.username,self.password).then(function(data){
      if(!data.error){
        ApiService.token = data.token;
        $cookies.put('auth_token',ApiService.token);
        $location.path('/home');
      }
    });
  };
  self.verifyToken = function(){
    ApiService.verifyToken().then(function(data){
      console.log(data);
      if(!data.error){
        $location.path('/home');
      }
    });
  };
  self.checkCookie();
});
