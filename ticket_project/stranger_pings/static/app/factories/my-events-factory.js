app.factory('MyEventsFactory', function($http) {

    return {

        fetchMyEvents: () => {
            return $http.get('http://localhost:8000/events/user')
        },

        setMyEvents: (data) => {
            myEvents = data;
        }

    }

});
