angular.module("mainController",["authServices"])
.controller("maincontroller",["Auth","$scope","$location","$timeout","$http","$rootScope",function(Auth,$scope,$location,$timeout,$http,$rootScope){
    var app = this
     $scope.canLoad = false
    $rootScope.$on("$routeChangeStart",function(){
        if(Auth.isLoggedIn()){
       $scope.logged = true
      console.log("is logged in")
      Auth.getUser()
      .then(function(data){
          $scope.username = data.data.username;
          $scope.email = data.data.email
           $scope.canLoad = true
      })
  }else{
       $scope.logged = false
      console.log("not logged in")
       $scope.username = ""
       $scope.email = ""
        $scope.canLoad = true
  }
})
    
    $scope.logMeIn = function(loginData){
       return Auth.logMeIn(loginData)
        .then(function(data){
            if(data.data.success){
                $scope.message = data.data.message
                $timeout(function(){
                $location.path("/home")
                 $scope.message = ""
                 }, 3000);
                 
                 
            }else{
                $scope.err = data.data.message
                $timeout(function(){
                    $scope.err = ""
                },3000)
            }
        })
        
    }
    $scope.logout = function (){
        Auth.logout()
        $location.path("/logout")
        $timeout(function(){
            $location.path("/login")
        },3000)
    }
}])