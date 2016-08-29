app.controller("Events", function($scope, $http, $location, AllEventFactory, eventData, VenueFactory, venueData) {
  const allEvents = this;

  allEvents.events = eventData.data;
  AllEventFactory.setAllEvents(eventData.data);

  allEvents.venues = venueData.data;
  VenueFactory.setAllVenues(venueData.data);

  allEvents.title = "this is where you view all events.";
  allEvents.dettitle = "this is an events detail view.";
  allEvents.clicked_event = 1;

  allEvents.getVenueName = (key) => {
    venue_filter = allEvents.venues.filter((venue) => {
      return venue.pk === key;
    });
    return venue_filter[0].fields.name;
  }

  allEvents.goToMyEvents = () => {
    console.log("going to my events");
    $location.path(`/myevents`);
  };

  allEvents.goToEventDetail = () => {
    console.log("going to an event detail.");
    $location.path(`/events/${allEvents.clicked_event}`);
  };

  allEvents.goToHome = () => {
    console.log("going to home. A logout will happen here.");
    window.location.assign('/logout/')
    // TODO: do something with django here to redirect to the django logged out stuff.
    // $location.path("/home");
  };

  allEvents.detailBack = (allOrMy) =>{
    console.log("going back. will pass whether the user clicked 'my events' or 'all events' back button here.");
    if (allOrMy === "all") {
      $location.path(`/events`);
    }
    else {
      $location.path(`/myevents`);
    }
  };
});
