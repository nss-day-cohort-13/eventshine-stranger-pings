app.controller("Events", function($scope, $http, $location, AllEventsFactory, VenueFactory) {
  const allEvents = this;


  VenueFactory.fetchAllVenues()
    .then((res) => {
      $scope.venues = res.data;
      VenueFactory.setAllVenues(res.data);
    });

  AllEventsFactory.fetchAllEvents()
    .then((res) => {
      $scope.events = res.data;
      AllEventsFactory.setAllEvents(res.data);
    });

  allEvents.getVenueName = (key) => {
    venue_filter = $scope.venues.filter((venue) => {
      return venue.pk === key;
    });
    return venue_filter[0].fields.name;
  };

  allEvents.goToHome = () => {
    window.location.assign('/logout/');
  };

  allEvents.detailBack = (allOrMy) =>{
    if (allOrMy === "all") {
      $location.path(`/events`);
    }
    else {
      $location.path(`/myevents`);
    }
  };
});
