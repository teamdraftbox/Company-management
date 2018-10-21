
var userController = angular.module("userController",["userServices"])

userController.controller("regcontroller",["$scope","$http","$location","$timeout","User",function($scope,$http,$location,$timeout,User){

   $scope.submit = function(reg){
        User.create(reg)
        .then(function(data){
            console.log( data.data.message)
            console.log( data.data.success)
            if(data.data.success){
                $scope.message = data.data.message
                $timeout(function(){
                $location.path("/home")
                 }, 3000);
                 
            }else{
                $scope.err = data.data.message
            }
            
             
          
        })
    }
}])