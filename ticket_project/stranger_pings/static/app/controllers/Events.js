app.controller("Events", function($scope, $http, $location, $interval, AllEventsFactory, VenueFactory) {
  const allEvents = this;

  function loadAllEventData() {
    // First, load venue names so that when the events render on the page,
    // the venue names can by matched using the venue ID on the event
    VenueFactory.fetchAllVenues()
      .then((res) => {
        $scope.venues = res.data;
        VenueFactory.setAllVenues(res.data);

      // Then, fetch all events and save them in a temporary 'events' variable
      AllEventsFactory.fetchAllEvents()
        .then((res) => {
          let events = res.data;
          AllEventsFactory.setAllEvents(res.data);

          // Put all filtered current events on $scope
          $scope.currentEvents = allEvents.currentFilter(res.data);

          // Put all filtered past events on $scope
          $scope.pastEvents = allEvents.pastFilter(res.data);
        });
      });
  }

  // Load all data when the controller is instantiated, and check for new events
  // or events that have expired every 10 seconds.
  loadAllEventData();
  $interval(loadAllEventData, 10000);


  allEvents.getVenueName = (key) => {
    // Match the venue ID on the event object with a venue saved
    // in $scope.venues
    venue_filter = $scope.venues.filter((venue) => {
      return venue.pk === key;
    });
    return venue_filter[0].fields.name;
  };

  allEvents.currentFilter = (event_data) => {
    // With the data for all events, return only events where
    // the begin_date_time is greater than the current time

    let current = event_data.filter((event) => {
      let date = Date.now();
      let event_date = Date.parse(event.fields.begin_date_time);
      return event_date > date;
    });
    return current;
  }

  allEvents.pastFilter = (event_data) => {
    // With the data for all events, return only events where
    // the begin_date_time is less than or equal to the current time

    let past = event_data.filter((event) => {
      let date = Date.now();
      let event_date = Date.parse(event.fields.begin_date_time);
      return event_date <= date;
    });
    return past;
  }

  allEvents.goToDetail = (key) => {
    // Sends the app to the event detail page, using the event ID
    // of the event chosen as the route param 'event' (seen here as
    // function argument 'key')
    $location.path(`/events/${key}`);
  }

  allEvents.goToHome = () => {
    // Logs out the current user
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
