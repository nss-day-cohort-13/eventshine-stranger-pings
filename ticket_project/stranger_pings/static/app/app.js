const app = angular
  .module("stranger_pings", [])
  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');
  });
