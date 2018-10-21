var appRoute = angular.module("appRoute",["ngRoute"])

appRoute.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){
    $routeProvider
    .when("/home",{
        templateUrl:"app/views/pages/home.html",
        authenticated:false
    })
    .when("/manage",{
        templateUrl:"app/views/pages/company/manage.html",
        controller:"managecontroller",
        authenticated:true
    })
     .when("/add",{
        templateUrl:"app/views/pages/company/addData.html",
        controller:"managecontroller",
        authenticated:true
    })
     .when("/show/:id",{
        templateUrl:"app/views/pages/company/show.html",
        controller:"showcontroller",
        authenticated:true
    })
    .when("/edit/:id",{
        templateUrl:"app/views/pages/company/updateData.html",
        controller:"editcontroller",
        authenticated:true
    })
    .when("/login",{
        templateUrl:"app/views/pages/user/login.html",
        authenticated:false
    })
     .when("/logout",{
        templateUrl:"app/views/pages/user/logout.html",
        authenticated:true
    })
    .when("/register",{
        templateUrl:"app/views/pages/user/register.html",
        controller:"regcontroller",
        authenticated:false
    })
    .when("/profile",{
        templateUrl:"app/views/pages/user/profile.html",
        controller:"regcontroller",
        authenticated:true
    })
    .otherwise({
        redirectTo:"/home"
    })
    $locationProvider.html5Mode({
        enabled:true,
        requireBase:true
    })
}])

appRoute.run(["$rootScope","Auth","$location","$timeout",function($rootScope,Auth,$location,$timeout){
     $rootScope.$on("$routeChangeStart",function(event,next,current){
        if(next.$$route.authenticated === true && !Auth.isLoggedIn() ){
            event.preventDefault() 
            $timeout(function(){
              $location.path("/login")  
            },1000)
           
        }
     })
}])

 