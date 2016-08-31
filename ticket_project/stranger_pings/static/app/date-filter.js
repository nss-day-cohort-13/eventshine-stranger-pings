app.filter('dateFormat', () => {
  return (date) => {
    // tz_date = date.replace(/Z/i, '+12:00')
    return moment(date).format('MMM Do YYYY, h:mm a');
  }
})
