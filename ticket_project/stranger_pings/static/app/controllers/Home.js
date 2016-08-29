app.controller("Home", function($scope, $http, $location) {
  const home = this;

  home.title = "this is the home page.";

  home.goToLogin = () => {
    $location.path(`/login`);
  }; 
  home.goToRegister = () => {
    $location.path(`/register`);
  };

});
