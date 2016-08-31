app.controller("Events", function($scope, $http, $location, AllEventsFactory, VenueFactory) {
  const allEvents = this;


  VenueFactory.fetchAllVenues()
    .then((res) => {
      $scope.venues = res.data;
      VenueFactory.setAllVenues(res.data);
    AllEventsFactory.fetchAllEvents()
      .then((res) => {
        events = res.data;
        AllEventsFactory.setAllEvents(res.data);
        $scope.currentEvents = events.filter((event) => {
          date = Date.now();
          event_date = Date.parse(event.fields.begin_date_time);
          return event_date >= date;
        });
        $scope.pastEvents = events.filter((event) => {
          date = Date.now();
          now = Date.parse(date);
          event_date = Date.parse(event.fields.begin_date_time);
          return event_date <= date;
        });
      });
    });



  allEvents.title = "Events";

  allEvents.getVenueName = (key) => {
    venue_filter = $scope.venues.filter((venue) => {
      return venue.pk === key;
    });
    return venue_filter[0].fields.name;
  }

  allEvents.currentFilter = (event) => {
    date = new Date();
    now = date.toISOString();
    return event.begin_date_time >= now;
  }

  allEvents.pastFilter = (event) => {
    date = new Date();
    now = date.toISOString();
    return event.begin_date_time <= now;
  }

  allEvents.goToHome = () => {
    window.location.assign('/logout/');
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
