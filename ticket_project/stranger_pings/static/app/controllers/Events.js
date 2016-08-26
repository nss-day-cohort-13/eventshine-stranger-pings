app.controller("Events", function($scope, $http, $location) {
  const allEvents = this;

  allEvents.title = "this is where you view all events.";
  allEvents.current_user = 1;
  allEvents.clicked_event = 1;

  allEvents.goToMyEvents = () => {
    console.log("going to my events");
    $location.path("/myevents/${allEvents.current_user}");
  };

  allEvents.goToEventDetail = () => {
    console.log("going to an event detail.");
    $location.path("/events/${allEvents.current_user}/${allEvents.clicked_event}");
  };

});
