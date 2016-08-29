const app = angular
  .module("stranger_pings", ["ngRoute"])
  .config(function($interpolateProvider, $routeProvider) {
    $interpolateProvider.startSymbol('((');
    $interpolateProvider.endSymbol('))');

    $routeProvider 
      // since home is the default 'otherwise' page, we'll need to be able to check if the user is logged in or not. The ? after the 'user' route param allows the param to be null.
      .when("/home", {
        templateUrl: "../../static/app/partials/home.html", 
        controller: "Home", 
        controllerAs: "home"
      })
      // Login and register use the same controller.
      .when("/login", {
        templateUrl: "../../static/app/partials/login.html", 
        controller: "LoginRegister", 
        controllerAs: "login"
      })
      .when("/register", {
        templateUrl: "../../static/app/partials/user-register.html",
        controller: "LoginRegister", 
        controllerAs: "login"
      })
      // The 'view all events' saves the user optionally, so we can give the user add'l info about their events if needed.
      .when("/events", {
        templateUrl: "../../static/app/partials/events.html", 
        controller: "Events", 
        controllerAs: "allEvents"
      })
      .when("/events/:event", {
        templateUrl: "../../static/app/partials/eventdetail.html", 
        controller: "Events", 
        controllerAs: "allEvents"
      })
      .when("/events/:event/register", {
        templateUrl: "../../static/app/partials/event-register.html", 
        controller: "EventRegister", 
        controllerAs: "eventRegister"
      })
      .when("/myevents", {
        templateUrl: "../../static/app/partials/myevents.html", 
        controller: "MyEvents", 
        controllerAs: "myEvents"
      })
      // This controller can create either an Event or a Venue.
      .when("/myevents/create/:whatToCreate", {
        templateUrl: "../../static/app/partials/create.html", 
        controller: "Create", 
        controllerAs: "create"
      })
      .otherwise("/home/");
  });
