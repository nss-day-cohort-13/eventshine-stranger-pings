app.controller("Create", function($scope, $http, $location, VenueFactory) {
  const create = this;

  // Temporary Constants.
  create.title = "create an event page.";
  create.venues = VenueFactory.getAllVenues;

  // form data.
  create.name = "";
  create.description = "";
  create.startTime = null;
  create.endTime = null;
  create.capacity = 0;
  create.address = "";
  create.venue = null;
  // TODO: add venue options from select.

  create.completeCreation = () => {
    return $http.post('http//localhost:8000/events/create', {"name": create.name, "description": create.description, "startTime": create.startTime, "endTime": create.endTime, "capacity": create.capacity, "address": create.address, "venue": create.venue});
    // TODO: also sign the user up for the event after the event is created.
    // I need to reload the json.
    create.goToMyEvents();
  };

  create.goToMyEvents = () => {
    console.log("completing creation and redirecting to event detail.");
    $location.path(`/myevents`);
  };



});
