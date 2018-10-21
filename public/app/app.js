var myApp = angular.module("myApp",["appRoute","userController","userServices","authServices","ngAnimate","mainController","manageController"])


myApp.config(function($httpProvider){
    $httpProvider.interceptors.push("Interceptor")
})