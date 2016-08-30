app.controller("Create", function($scope, $http, $location, VenueFactory) {
  const create = this;

  // Constants.
  create.title = "Create An Event.";
  create.venues = VenueFactory.getAllVenues();

  // Form data.
  create.name = "";
  create.description = "";
  create.startTime = null;
  create.endTime = null;
  create.capacity = 0;
  create.address = "";
  create.venue = null;

  create.completeCreation = () => {
    // Sends a 'POST' of the form data to views.py database, through the urls.py. See app.py for the headers config for the 'content-type'.
    $http({
      url: "/events/create/", 
      method: "POST", 
      headers: {"Content-Type": "application/json"}, 
      data: {"name": create.name, "description": create.description, "startTime": create.startTime, "endTime": create.endTime, "capacity": create.capacity, "address": create.address, "venue": create.venue}
    })
    .success(() => {
    // TODO: sign the user up for the event after the event is created.
      create.goToMyEvents();
    });
  };

  create.goToMyEvents = () => {
    // Just a path redirect.
    $location.path(`/myevents`);
  };



});
