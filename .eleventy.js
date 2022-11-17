module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("formatDate", function(date) {
    return new Intl.DateTimeFormat('en-US', {timeZone: "UTC"}).format(date)
  });  
  return {}
};