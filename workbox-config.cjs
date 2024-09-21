console.log('ddd')

module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,gif,text/html}"],
  swDest: "dist/service-worker.js",
  runtimeCaching: [
    {
      urlPattern: ({ url }) => true,
      handler: "NetworkFirst",
      options: {
        cacheName: "mainmenu",
        expiration: {
          maxEntries: 50,
        },
      },
    },
  ],
};

