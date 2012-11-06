// ReSharper disable WrongExpressionStatement
({
   //baseUrl: '../',
   paths: {
      //use the fake loadKoTemplate module for building
      //as it runs code that is dependent on window which
      //node does not have
      //'loadKoTemplate': 'loadKoTemplate.node',
      'knockout': 'knockout-2.2.0',
      'jquery': 'jquery-1.8.2.min',
      'bootstrap': 'bootstrap'
   },
   mainConfigFile: 'main.js',
   modules: [
        //Just specifying a module name means that module will be converted into
        //a built file that contains all of its dependencies. If that module or any
        //of its dependencies includes i18n bundles, they may not be included in the
        //built file unless the locale: section is set above.

        //Main
        {
           name: "main"//,
           //exclude: ["loadKoTemplate"]
        }
        //},
        //{
        //   name: "LandingScreen",
        //   exclude: ["knockout", "Core", "text", "loadKoTemplate"],
        //   out: 'LandingScreen-builtv2.js'
        //}
   ],
   //this setting is dealt with by the command line build included in the project build file
   dir: "../Built"
})
// ReSharper restore WrongExpressionStatement
