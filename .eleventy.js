const markdownIt = require("markdown-it");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const todoPlugin = require("./plugins/todo");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addWatchTarget("css");

  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addWatchTarget("public");

  eleventyConfig.addFilter("formatDate", function (date) {
    return new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(date);
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.setLibrary("md", markdownIt(options).use(todoPlugin));

  return {};
};
