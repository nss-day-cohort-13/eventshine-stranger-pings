// This filter takes in descriptions from event objects and...
  // Checks to see if the strings are longer than 140 characters
  // a. If longer than 140, returns a string of 140 characters
     // with ellipses appended to the end
  // b. If 140 characters or shorter, returns the string

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
