angular.module("manageController",[])

.controller("managecontroller",["$scope","$http","$location","$timeout",function($scope,$http,$location,$timeout){
    $http.get("/manage/management").then(function(managerData){
       $scope.data = managerData.data.data
    })
    $scope.addData = function(data){
        $http.post("/manage/management",data).then(function(result){
            $location.path("/manage")
        })
    }
}])
.controller("showcontroller",["$scope","$http","$timeout","$location","$routeParams",function($scope,$http,$timeout,$location,$routeParams){
     $http.get("/manage/management/" + $routeParams.id).then(function(company){
           console.log(company.data.data)
           $scope.companyName =  company.data.data.companyName
           $scope.managerName =  company.data.data.managerName
           $scope.companyImage =  company.data.data.companyImage
           $scope.detail = company.data.data.detail
            $scope.id = company.data.data._id
        })
           $scope.delete = function(){
               var object = {id:$scope.id}
               $http.delete("/manage/management/" + $routeParams.id,object).then(function(){
               $location.path("/manage")
           })
               
         }
}])
.controller("editcontroller",["$scope","$http","$timeout","$location","$routeParams",function($scope,$http,$timeout,$location,$routeParams){
     $http.get("/manage/management/" + $routeParams.id,).then(function(company){
           $scope.companyName =  company.data.data.companyName
           $scope.managerName =  company.data.data.managerName
           $scope.companyImage =  company.data.data.companyImage
           $scope.detail = company.data.data.detail
            $scope.id = company.data.data._id
            $scope.email = company.data.data.email
        })
       
        $scope.editData = function(){
             var object = {
            companyName: $scope.companyName,
            managerName:$scope.managerName,
            companyImage: $scope.companyImage,
            detail: $scope.detail,
            email: $scope.email,
            id:$scope.id
        }
           $http.put("/manage/management/" + $routeParams.id,object).then(function(){
               $location.path("/manage")
           })
        }
      
}])