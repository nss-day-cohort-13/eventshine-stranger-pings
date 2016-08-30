app.factory('EventDetailFactory', function($http) {

  return {

    fetchSingleEvent: (event_key) => {
      return $http.get(`http://localhost:8000/events/${event_key}`);
    },

    fetchUserEvent: (event_key) => {
      return $http.get(`http://localhost:8000/events/user/${event_key}`)
    },

    eventRegister: (event_key) => {
      return $http.get(`http://localhost:8000/events/register/${event_key}`)
    }

  }

});
