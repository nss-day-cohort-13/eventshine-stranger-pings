app.factory('AllEventFactory', function($http) {

  let allEvents;

  return {

    fetchAllEvents: () => {
      return $http.get('http://localhost:8000/events/all/')
    },

    setAllEvents: (data) => {
      events = data;
    },

    getAllEvents: () => {
      return events;
    }

  };

});
