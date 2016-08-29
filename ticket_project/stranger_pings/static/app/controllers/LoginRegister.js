app.controller("LoginRegister", function($scope, $http, $location) {
  const login = this;

  login.logtitle = "this is a log in page.";
  login.regtitle = "this is a register page.";

  login.goToMyEvents = () => {
    $location.path(`/myevents`);
  };

  login.goToAllEvents = () => {
    $location.path(`/events`);
  };

  login.goToRegister = () => {
    $location.path("/register");
  };

  login.goToLogin = () => {
    $location.path("/login");
  };
  login.goBack = () => {
    $location.path("/");
  };

});
