app.controller("Create", function($scope, $http, $location, VenueFactory) {
  const create = this;

  // Constants.
  create.title = "create an event page.";
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
    $http({
      url: "http//localhost:8000/stranger_pings/events/create/", 
      method: "POST", 
      headers: {"Content-Type": "application/x-www-form-urlencoded"}, 
      data: {"name": create.name, "description": create.description, "startTime": create.startTime, "endTime": create.endTime, "capacity": create.capacity, "address": create.address, "venue": create.venue}
    })
    .success(() => {
      console.log("Yay");
      create.goToMyEvents();
    });
    // TODO: also sign the user up for the event after the event is created.
    // I need to reload the json.
  };

  create.goToMyEvents = () => {
    console.log("completing creation and redirecting to event detail.");
    $location.path(`/myevents`);
  };



});
