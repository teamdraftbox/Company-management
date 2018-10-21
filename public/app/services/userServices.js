angular.module("userServices",[])
.factory("User",["$http",function($http){
    var userFactory = {}
    userFactory.create = function(reg){
      return  $http.post("/api/user",reg)
    }
    return userFactory
}])

