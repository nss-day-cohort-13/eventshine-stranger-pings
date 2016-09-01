app.controller('EventDetailCtrl', function($scope, $routeParams, $location, $timeout, EventDetailFactory, VenueFactory) {

  const eventDetail = this;

  VenueFactory.fetchAllVenues()
    .then((res) => {
      $scope.venues = res.data;
    })

  EventDetailFactory.fetchSingleEvent($routeParams.event)
    .then((res) => {
      $scope.thisEvent = res.data;
      EventDetailFactory.fetchAllRegistrations($routeParams.event)
        .then((res) => {
          num_registered = res.data.length;
          $scope.tix_left = $scope.thisEvent[0].fields.tix_limit - num_registered;
        })
    })

  EventDetailFactory.fetchUserEvent($routeParams.event)
    .then((res) => {
      if (res.data.length === 1) {
        $scope.registered = true;
      } else {
        $scope.registered = false;
      }
    })


  eventDetail.getVenueName = (key) => {
    venue_filter = $scope.venues.filter((venue) => {
      return venue.pk === key;
    });
    return venue_filter[0].fields.name;
  }

  eventDetail.register = () => {
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
    if ($scope.registered === false) {
      eventDetail.register();
    } else {
      eventDetail.unregister();
    }
  }

  eventDetail.detailBack = (allOrMy) => {
    if (allOrMy === 'all') {
      $location.path(`/events`);
    }
    else {
      $location.path(`/myevents`);
    }
  }

  eventDetail.logOut = () => {
    window.location.assign('/logout/');
  };

});
