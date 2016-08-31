app.filter('dateFormat', () => {
  return (date) => {
    return moment(date).format('MMM Do YYYY, h:mm a');
  }
})
