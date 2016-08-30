app.factory('EventDetailFactory', function($http) {

  return {

    fetchSingleEvent: (event_key) => {
      return $http.get(`http://localhost:8000/events/${event_key}`);
    }

  }

});
