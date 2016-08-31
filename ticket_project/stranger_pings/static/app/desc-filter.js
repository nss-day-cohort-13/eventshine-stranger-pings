app.filter('descFormat', () => {
  return (description) => {
    if (description.length > 150) {
      sliced_string = description.slice(0, 150);
      new_desc = sliced_string + '...';
      return new_desc;
    } else {
      return description;
    }
  }
})
