app.factory('AllEventFactory', function($http) {

  let allEvents;

  return {

    fetchAllEvents: () => {
      return $http.get('http://localhost:8000/events/all/')
    },

    setAllEvents: (data) => {
      allEvents = data;
    },

    getAllEvents: () => {
      return allEvents;
    },

    getSingleEvent: (event_key) => {
      events_filter = allEvents.filter((event) => {
        return event.pk === event_key;
      });
      return events_filter[0];
    }

  };

});
