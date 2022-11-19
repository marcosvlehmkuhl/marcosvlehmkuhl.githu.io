module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addWatchTarget("css");

  eleventyConfig.addFilter("formatDate", function(date) {
    return new Intl.DateTimeFormat('en-US', {timeZone: "UTC"}).format(date)
  });  
  return {}
};