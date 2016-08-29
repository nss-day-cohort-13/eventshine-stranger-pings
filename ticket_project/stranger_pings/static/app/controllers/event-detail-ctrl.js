app.controller('EventDetailCtrl', function($routeParams, $location, AllEventFactory, VenueFactory) {

  // FYI -- and this is a big one -- you cannot simply refresh the event detail page as of now.
  // The controller depends on data that is resolved when you load all events. For now, you have to navigate
  // back to the all events page and click through to the event you want to check out.

  const eventDetail = this;

  eventDetail.thisEvent = AllEventFactory.getSingleEvent(parseInt($routeParams.event));

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
