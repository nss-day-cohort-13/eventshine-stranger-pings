const app = angular
  .module("stranger_pings", ['ngRoute', 'uiSwitch'])
  .config(function($interpolateProvider, $routeProvider, $httpProvider) {
    $interpolateProvider.startSymbol('##');
    $interpolateProvider.endSymbol('##');
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";

    $routeProvider
     // This app only handles users after they are logged in. See our django templates for the login and register and homepage functionality.
      .when("/events", {
        templateUrl: "../../static/app/partials/events.html",
        controller: "Events",
        controllerAs: "allEvents"
      })
      .when("/events/:event", {
        templateUrl: "../../static/app/partials/eventdetail.html",
        controller: "EventDetailCtrl",
        controllerAs: "eventDetail"
      })
      .when("/events/:event/register", {
        templateUrl: "../../static/app/partials/event-register.html",
        controller: "EventRegister",
        controllerAs: "eventRegister"
      })
      .when("/myevents", {
        templateUrl: "../../static/app/partials/myevents.html",
        controller: "MyEvents",
        controllerAs: "myCtrl"
      })
      .when("/myevents/create/", {
        templateUrl: "../../static/app/partials/create.html",
        controller: "Create",
        controllerAs: "create"
      })
      .when("/myevents/venue/", {
        templateUrl: "../../static/app/partials/venue.html",
        controller: "Venue",
        controllerAs: "venue"
      })
      .otherwise("/events");
  });
