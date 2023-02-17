const markdownIt = require("markdown-it");

const startTag = "@todo";
const endTag = "@endtodo";

const todoInline = (state, silent) => {
  var pos = state.pos;
  var ch = state.src.charCodeAt(pos);

  if (ch !== 0x40) return false;

  const indexOfCloseTag = state.src.indexOf("@endtodo");
  const substr = state.src.substring(pos + startTag.length, indexOfCloseTag);

  const match = substr.match(/\[.*\]/);
  if (!match) return false;
  const comment = match[0];

  const token = state.push("todo_inline", "@todo", 0);

  token.content = {
    text: substr.replace(/\[.*\]/, ""),
    comment: comment.replace(/\[|\]/g, ""),
  };

  state.pos = indexOfCloseTag + "@endtodo".length;
  return true;
};

const todoRenderer = (tokens, idx) => {
  const token = tokens[idx];
  console.log({ token });

  return `<span class="todo-tooltip-target">${token.content.text}<span class="todo-tooltip">${token.content.comment}</span></span>`;
};

const myPlugin = (md) => {
  md.inline.ruler.push("todo", todoInline);
  md.renderer.rules["todo_inline"] = todoRenderer;
  return true;
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addWatchTarget("css");

  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addWatchTarget("public");

  eleventyConfig.addFilter("formatDate", function (date) {
    return new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(date);
  });

  let options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  eleventyConfig.setLibrary("md", markdownIt(options).use(myPlugin));

  return {};
};
