app.controller("MyEvents", function($scope, $location, MyEventsFactory, VenueFactory) {

  const myCtrl = this;


  VenueFactory.fetchAllVenues()
    .then((res) => {
      $scope.venues = res.data;
      VenueFactory.setAllVenues(res.data);
    });

  MyEventsFactory.fetchMyEvents()
    .then((res) => {
      $scope.myEvents = res.data;
      MyEventsFactory.setMyEvents(res.data);
    });

  myEvents.createEvent = () => {
    console.log("going to create page, passing 'event'.");
    $location.path(`/myevents/create/`);
  };

  myEvents.createVenue = () => {
    console.log("going to create page, passing 'venue'.");
    $location.path(`myevents/venue/`);
  };

  myCtrl.title = "My Events";

  myCtrl.getVenueName = (key) => {
    venue_filter = $scope.venues.filter((venue) => {
      return venue.pk === key;
    });
    return venue_filter[0].fields.name;
  }

  myCtrl.logOut = () => {
    window.location.assign('/logout/');
  };
});
