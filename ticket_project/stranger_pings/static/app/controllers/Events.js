app.controller("Events", function($scope, $http, $location) {
  const allEvents = this;

  allEvents.title = "this is where you view all events.";
  allEvents.dettitle = "this is an events detail view.";
  allEvents.current_user = 1;
  allEvents.clicked_event = 1;

  allEvents.goToMyEvents = () => {
    console.log("going to my events");
    $location.path(`/myevents/${allEvents.current_user}`);
  };

  allEvents.goToEventDetail = () => {
    console.log("going to an event detail.");
    $location.path(`/events/${allEvents.current_user}/${allEvents.clicked_event}`);
  };
 
  allEvents.goToHome = () => {
    console.log("going to home. A logout will happen here.");
    $location.path("/home");
  };

  allEvents.detailBack = (allOrMy) =>{
    console.log("going back. will pass whether the user clicked 'my events' or 'all events' back button here.");
    if (allOrMy === "all") {
      $location.path(`/events/${allEvents.current_user}`);
    }
    else {
      $location.path(`/myevents/${allEvents.current_user}`);
    }
  };
});
