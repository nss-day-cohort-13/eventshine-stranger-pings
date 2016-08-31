app.filter('descFormat', () => {
  return (description) => {
    if (description.length > 140) {
      sliced_string = description.slice(0, 140);
      new_desc = sliced_string + '...';
      return new_desc;
    } else {
      return description;
    }
  }
})
