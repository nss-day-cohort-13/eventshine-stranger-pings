app.controller("Venue", function($scope, $http, $location, VenueFactory) {
  const venue = this;

  venue.title="Create An Event";
  // Form fills out this variable.
  venue.name = "";

  venue.completeCreation = () => {
    // Sends a 'POST' of the form data to views.py database, through the urls.py. See app.py for the headers config for the 'content-type'.
    $http({
      url: "http//localhost:8000/stranger_pings/events/venue/", 
      method: "POST", 
      headers: {"Content-Type": "application/x-www-form-urlencoded"}, 
      data: {"name": venue.name}
    })
    .success(() => {
    // TODO: sign the user up for the event after the event is created.
      venue.goToMyEvents();
    });
  };

  venue.goToMyEvents = () => {
    // Just a path redirect.
    $location.path(`/myevents`);
  };

});
