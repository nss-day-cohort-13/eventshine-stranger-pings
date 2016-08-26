app.controller("Create", function($scope, $http, $location) {
  const create = this;

  // Temporary Constants.
  create.title = "create an event or venue page.";
  create.user_id = 1;
  create.event_id = 1;

  function complete_creation () {
    console.log("completing creation and redirecting to event detail.");
    $location.path(`/events/${create.user_id}/${create.event_id}`);
  }

});
