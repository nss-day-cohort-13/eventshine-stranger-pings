const app = angular
  .module("stranger_pings", ["ngRoute"])
  .config(function($interpolateProvider, $routeProvider) {
    $interpolateProvider.startSymbol('##');
    $interpolateProvider.endSymbol('##');

    $routeProvider
     // This app only handles users after they are logged in. See our django templates for the login and register and homepage functionality.
      .when("/events", {
        templateUrl: "../../static/app/partials/events.html",
        controller: "Events",
        controllerAs: "allEvents",
        resolve: {
          eventData: function(AllEventData) {
            return AllEventData.fetchAllEvents();
          }
        }
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
      .otherwise("/events");
  });
