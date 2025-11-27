module.exports = function (eleventyConfig) {
  // Passthrough copy for admin and images
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/images");

  // Limit filter for showing limited number of items
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  // Date filter for formatting dates
  eleventyConfig.addFilter("date", function (date, format) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  // Slugify filter for creating URL-friendly strings
  eleventyConfig.addFilter("slugify", function (str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  });

  // Recipe collection
  eleventyConfig.addCollection("recipes", function (collectionApi) {
    return [...collectionApi.getFilteredByGlob("src/recipes/*.md")];
  });

  // Featured recipes collection
  eleventyConfig.addCollection("featuredRecipes", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/recipes/*.md").filter(item => {
      return item.data.tags && item.data.tags.includes("featured");
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
