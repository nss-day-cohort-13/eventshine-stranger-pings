app.filter('dateFormat', () => {
  return (date) => {
    tz_date = date.replace(/Z/i, '-5:00')
    return moment(tz_date).calendar();
  }
})
