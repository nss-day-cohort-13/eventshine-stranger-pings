// This filter takes in dates from event objects and returns
// a more human readable representation of the date

// Uses Moment.js to format the date

app.filter('dateFormat', () => {
  return (date) => {
    return moment(date).format('MMM Do YYYY, h:mm a');
  }
})
