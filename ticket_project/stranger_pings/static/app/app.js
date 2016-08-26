const app = angular
  .module("stranger_pings", ["ngRoute"])
  .config(function($interpolateProvider, $routeProvider) {
    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');

    $routeProvider 
      // since home is the default 'otherwise' page, we'll need to be able to check if the user is logged in or not. The ? after the 'user' route param allows the param to be null.
      .when("/home/:user?", {
        templateUrl: "app/home.html", 
        contoller: "Home", 
        controllerAs: "home"
      })
      // Login and register use the same controller.
      .when("/login", {
        templateUrl: "app/login.html", 
        controller: "LoginRegister", 
        controllerAs: "login"
      })
      .when("/register", {
        templateUrl: "app/register.html",
        controller: "LoginRegister", 
        controllerAs: "login"
      })
      // The 'view all events' saves the user optionally, so we can give the user add'l info about their events if needed.
      .when("/events/:user?", {
        templateUrl: "app/events.html", 
        controller: "Events", 
        controllerAs: "events"
      })
      .when("/events/:user?/:event", {
        templateUrl: "app/eventdetail.html", 
        controller: "Events", 
        controllerAs: "events"
      })
      .when("/events/:user/:event/register", {
        templateUrl: "app/register.html", 
        controller: "EventRegister", 
        controllerAs: "eventRegister"
      })
      .when("myevents/:user", {
        templateUrl: "app/myevents.html", 
        controller: "myEvents", 
        controllerAs: "myEvents"
      })
      // This controller can create either an Event or a Venue.
      .when("/myevents/:user/create", {
        templateUrl: "app/create.html", 
        controller: "Create", 
        controllerAs: "create"
      })
      .otherwise("/home/:user?");
  });
