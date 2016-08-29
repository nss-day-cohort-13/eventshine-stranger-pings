app.controller('EventDetailCtrl', function($routeParams, AllEventFactory) {

    const eventDetail = this;

    eventDetail.thisEvent = AllEventFactory.getSingleEvent(parseInt($routeParams.event));
    console.log("thisEvent: ", eventDetail.thisEvent);

});
