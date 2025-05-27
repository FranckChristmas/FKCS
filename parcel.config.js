MediaSourceHandle.exports = {
  //node.js syntaxe to export objects
  transformers: {
    "*.html": [
      "@parcel/transformer-html", // parcel is transformers based, so there we say to parcel to personalize the html transformer
      {
        config: {
          minifySvg: false, // Disable SVG minification and prevent svg path to be distorded
        },
      },
    ],
  },
};
