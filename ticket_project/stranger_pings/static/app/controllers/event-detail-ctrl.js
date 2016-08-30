app.controller('EventDetailCtrl', function($scope, $routeParams, $location, $timeout, EventDetailFactory, VenueFactory) {

  const eventDetail = this;


  VenueFactory.fetchAllVenues()
    .then((res) => {
      $scope.venues = res.data;
    })

  EventDetailFactory.fetchSingleEvent($routeParams.event)
    .then((res) => {
      $scope.thisEvent = res.data;
    })

  EventDetailFactory.fetchUserEvent($routeParams.event)
    .then((res) => {
      console.log("res: ", res);
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
        console.log("register res: ", res);
        if (res.data.success) {
          $scope.registered = true;
        } else {
          return
        }
      })
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
