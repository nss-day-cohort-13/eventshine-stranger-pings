app.controller('EventDetailCtrl', function($scope, $routeParams, $location, $timeout, EventDetailFactory, VenueFactory) {

  const eventDetail = this;

  // Loads venue names so that when the events render on the page,
  // the venue names can by matched using the venue ID on the event
  VenueFactory.fetchAllVenues()
    .then((res) => {
      $scope.venues = res.data;
    })

  EventDetailFactory.fetchSingleEvent($routeParams.event)
    // Fetches the full event object associated with the event ID
    // passed in through $routeParams
    .then((res) => {
      $scope.thisEvent = res.data;
      EventDetailFactory.fetchAllRegistrations($routeParams.event)
      // Fetches all UserEvent objects associate with the event to
      // count the number of registrations and display the number
      // of tickets left
        .then((res) => {
          num_registered = res.data.length;
          $scope.tix_left = $scope.thisEvent[0].fields.tix_limit - num_registered;
        })
    })

  EventDetailFactory.fetchUserEvent($routeParams.event)
    // Queries the database for a UserEvent matching the current event
    // and the user ID of the logged in user
    // If such a UserEvent exists, the user is registered
    // If not, the user is not registered
    .then((res) => {
      if (res.data.length === 1) {
        $scope.registered = true;
      } else {
        $scope.registered = false;
      }
    })


  eventDetail.getVenueName = (key) => {
    // Match the venue ID on the event object with a venue saved
    // in $scope.venues
    venue_filter = $scope.venues.filter((venue) => {
      return venue.pk === key;
    });
    return venue_filter[0].fields.name;
  }

  eventDetail.register = () => {
    // Requests that the database create a new UserEvent object
    // to register the user for the event
    // If successful, set $scope.registered to true and subtract
    // from the tickets remaining
    EventDetailFactory.eventRegister($routeParams.event)
      .then((res) => {
        if (res.data.success) {
          $scope.registered = true;
          $scope.tix_left -= 1
        } else {
          return;
        }
      })
  }

  eventDetail.unregister = () => {
    // Requests that the database delete a UserEvent object
    // to unregister the user for the event
    // If successful, set $scope.registered to false and add
    // to the tickets remaining
    EventDetailFactory.eventUnregister($routeParams.event)
      .then((res) => {
        if (res.data.success) {
          $scope.registered = false;
          $scope.tix_left += 1
        } else {
          return;
        }
      })
  }

  eventDetail.toggleRegister = () => {
    // Checks $scope.registered to see whether register()
    // or unregister() should be called
    if ($scope.registered === false) {
      eventDetail.register();
    } else {
      eventDetail.unregister();
    }
  }

  eventDetail.logOut = () => {
    // Logs out the current user
    window.location.assign('/logout/');
  };

});
