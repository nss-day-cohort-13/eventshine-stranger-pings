app.controller('EventDetailCtrl', function($routeParams, $location, AllEventFactory, VenueFactory) {

  const eventDetail = this;

  eventDetail.thisEvent = AllEventFactory.getSingleEvent(parseInt($routeParams.event));
  console.log("thisEvent: ", eventDetail.thisEvent);

  eventDetail.getVenueName = (key) => {
    let allVenues = VenueFactory.getAllVenues();
    venue_filter = allVenues.filter((venue) => {
      return venue.pk === key;
    });
    return venue_filter[0].fields.name;
  }

  eventDetail.detailBack = (allOrMy) => {
    if (allOrMy === 'all') {
      $location.path(`/events`);
    }
    else {
      $location.path(`/myevents`);
    }
  }

});
