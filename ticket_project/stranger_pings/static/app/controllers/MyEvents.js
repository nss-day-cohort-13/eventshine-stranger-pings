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


  myCtrl.createEvent = () => {
    $location.path(`/myevents/create/`);
  };

  myCtrl.createVenue = () => {
    $location.path(`myevents/venue/`);
  };

  myCtrl.title = "My Events";

  myCtrl.getVenueName = (key) => {
    const venue_filter = $scope.venues.filter((venue) => {
      return venue.pk === key;
    });
    return venue_filter[0].fields.name;
  };

  myCtrl.goToDetail = (key) => {
    $location.path(`/events/${key}`);
  }

  myCtrl.logOut = () => {
    window.location.assign('/logout/');
  };
});
