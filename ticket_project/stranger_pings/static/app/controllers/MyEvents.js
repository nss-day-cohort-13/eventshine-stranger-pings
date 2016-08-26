app.controller("MyEvents", function($scope, $http, $location) {
  const myEvents = this;

  myEvents.title = "this is a my events page.";
  myEvents.dettitle = "this is a my events page.";
  myEvents.current_user = 1;
  myEvents.clicked_event = 1;

  myEvents.goToAllEvents= () => {
    console.log("going to all events page.");
    $location.path(`/events/${myEvents.current_user}`);
  };

  myEvents.goToEventDetail = () => {
    console.log("going to event detail page.");
    $location.path(`/events/${myEvents.current_user}/${myEvents.clicked_event}`);
  };

  myEvents.createEvent = () => {
    console.log("going to create page, passing 'event'.");
    $location.path(`/myevents/${myEvents.current_user}/create/${'event'}`);
  };

  myEvents.createVenue = () => {
    console.log("going to create page, passing 'venue'.");
    $location.path(`/${myEvents.current_user}/create/${'venue'}`);
  };

  myEvents.logOut = () => {
    console.log("going to home. A logout will happen here.");
    $location.path("/home");
  };
});
