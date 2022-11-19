const STATUS = {
  DRAFT: 'draft'
}

module.exports = () => {
  return {
    eleventyComputed: {
      permalink: data => {
        if (process.env.ENV == 'production' && data.status == STATUS.DRAFT) return false 
        return data.permalink
      },
      eleventyExcludeFromCollections: data => {
        if (process.env.ENV == 'production' && data.status == STATUS.DRAFT) return true 
        return data.eleventyExcludeFromCollections
      },
    }
  }
};