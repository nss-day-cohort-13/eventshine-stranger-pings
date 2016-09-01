app.controller("MyEvents", function($scope, $location, MyEventsFactory, VenueFactory) {

  const myCtrl = this;

  // First, load venue names so that when the events render on the page,
  // the venue names can by matched using the venue ID on the event
  VenueFactory.fetchAllVenues()
    .then((res) => {
      $scope.venues = res.data;
      VenueFactory.setAllVenues(res.data);

      // Then, load all of the events associated with the currently
      // logged in user
      MyEventsFactory.fetchMyEvents()
        .then((res) => {
          $scope.myEvents = res.data;
          MyEventsFactory.setMyEvents(res.data);
        });
    });


  myCtrl.title = "My Events";

  myCtrl.getVenueName = (key) => {
    // Match the venue ID on the event object with a venue saved
    // in $scope.venues
    const venue_filter = $scope.venues.filter((venue) => {
      return venue.pk === key;
    });
    return venue_filter[0].fields.name;
  };

  myCtrl.goToDetail = (key) => {
    // Sends the app to the event detail page, using the event ID
    // of the event chosen as the route param 'event' (seen here as
    // function argument 'key')
    $location.path(`/events/${key}`);
  }

  myCtrl.logOut = () => {
    // Logs out the current user
    window.location.assign('/logout/');
  };
});
