app.controller("Venue", function($scope, $http, $location) {
  const venue = this;

  venue.title="Create A Venue";
  // Form fills out this variable.
  venue.name = "";

  venue.completeCreation = () => {
    // Sends a 'POST' of the form data to views.py database, through the urls.py. See app.py for the headers config for the 'content-type'.
    $http({
      url: "/events/venue/", 
      method: "POST", 
      headers: {"Content-Type": "application/json"}, 
      data: {"name": venue.name}
    })
    .success(() => {
      venue.goToMyEvents();
    });
  };

  venue.goToMyEvents = () => {
    // Just a path redirect.
    $location.path(`/myevents/`);
  };

});
