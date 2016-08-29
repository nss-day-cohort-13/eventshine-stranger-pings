app.factory('VenueFactory', function($http) {

  let venues;

  return {

    fetchAllVenues: () => {
      return $http.get('http://localhost:8000/venues/all/')
    },

    setAllVenues: (data) => {
      venues = data;
    },

    getAllVenues: () => {
      return venues;
    }

  };

});
