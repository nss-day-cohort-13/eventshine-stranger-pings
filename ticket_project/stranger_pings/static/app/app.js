var app = angular
  .module("TodoApp", [])
  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');
});
