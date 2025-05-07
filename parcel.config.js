MediaSourceHandle.exports = {
  transformers: {
    "*.html": [
      "@parcel/transformer-html",
      {
        config: {
          minifySvg: false,
        },
      },
    ],
  },
};
