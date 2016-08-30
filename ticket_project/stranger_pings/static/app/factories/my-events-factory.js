app.factory('MyEventsFactory', function($http) {

    myEvents = {};

    return {

        fetchMyEvents: () => {
            return $http.get('http://localhost:8000/events/user');
        },

        getMyEvents: () => {
            return myEvents;
        },

        setMyEvents: (data) => {
            myEvents = data;
        }

    }

});
