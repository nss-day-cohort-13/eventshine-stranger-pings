app.controller("Create", function($scope, $http, $location) {
  const create = this;

  // Temporary Constants.
  create.title = "create an event or venue page.";
  create.event_id = 1;

  create.completeCreation = () => {
    console.log("completing creation and redirecting to event detail.");
    $location.path(`/myevents`);
  };

});
