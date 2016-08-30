app.controller("MyEvents", function($scope, $http, $location) {
  const myEvents = this;

  myEvents.title = "this is a my events page.";
  myEvents.dettitle = "this is a my events page.";
  myEvents.clicked_event = 1;

  myEvents.goToAllEvents= () => {
    console.log("going to all events page.");
    $location.path(`/events`);
  };

  myEvents.goToEventDetail = () => {
    console.log("going to event detail page.");
    $location.path(`/events/${myEvents.clicked_event}`);
  };

  myEvents.createEvent = () => {
    console.log("going to create page, passing 'event'.");
    $location.path(`/myevents/create/`);
  };

  myEvents.createVenue = () => {
    console.log("going to create page, passing 'venue'.");
    $location.path(`myevents/venue/`);
  };

  myEvents.logOut = () => {
    window.location.assign('/logout/');
  };
});
