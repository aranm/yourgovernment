/*globals require, define, Modernizr*/
require.config({
   //baseUrl: "scripts/v1.0",
   paths: {
      //3rd Party libraries
      'knockout': '//cdnjs.cloudflare.com/ajax/libs/knockout/2.2.0/knockout-min',
      'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min',
      'address': 'jquery.address-1.4.min',
      'bootstrap': '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.2.1/bootstrap.min',
      "ArrayExtension": "Utilities/ArrayExtension",
      "StringExtension": "Utilities/StringExtension",

      //Framework
      'Core': 'Framework/Core',
      "Core.DataBinding": "Framework/Core.DataBinding",
      "Core.Communication": 'Framework/Core.Communication',
      "Core.Controls": 'Framework/Core.Controls',
      "Core.ModuleGrouping": 'Framework/Core.ModuleGrouping',
      "Core.Address": 'Framework/Core.Address',
      'Core.Ajax': "Framework/Core.Ajax",
      'Core.DomManipulation': "Framework/Core.DomManipulation",
      'Core.Error': "Framework/Core.Error",
      'Core.Navigation': "Framework/Core.Navigation",
      'Core.Observable': "Framework/Core.Observable",
      'Core.PageData': "Framework/Core.PageData",
      'Core.Singleton': "Framework/Core.Singleton",
      'Sandbox': 'Framework/Sandbox',

      //Configuration
      "AjaxConfiguration": "Configuration/AjaxConfiguration",
      "RoutingConfiguration": "Configuration/RoutingConfiguration"
   },
   shim: {
      'bootstrap': {
         deps: ['jquery']
      },
      'address': {
         deps: ['jquery'],
         exports: 'address'
      },
      'jquery': {
         exports: ['jQuery', '$']
      }
   },
   loadKoTemplate: {
      templatePath: "templates/",
      extension: ".js"
   }
});


define("CoreScripts", [
         "Core",
         "jquery",
         "knockout",
         "bootstrap",
         "address",
         "ArrayExtension",
         "StringExtension",
   
         "Core.DataBinding",
         "Core.Address",
         "Core.Ajax",
         "Core.Communication",
         "Core.Controls",
         "Core.ModuleGrouping",
         "Core.DomManipulation",
         "Core.Error",
         "Core.ModuleGrouping",
         "Core.Navigation",
         "Core.Observable",
         "Core.PageData",
         "Core.Singleton",
         "Sandbox"], function (core, jquery) {
            return {
               core: core,
               jquery: jquery
            };
         });

require(["CoreScripts", "AjaxConfiguration", "RoutingConfiguration"], function (coreScripts, ajaxConfiguration, routingConfiguration) {
   var core = coreScripts.core;

   if (Modernizr.history === true) {
      coreScripts.jquery("body").delegate("a", "click", function (e) {
         if (e.currentTarget.className.indexOf("accelerusBtn") === -1 && e.currentTarget.target !== "_blank" && core.Address.navigateToUrl(e.currentTarget.href) === true) {
            e.stopImmediatePropagation();
            e.preventDefault();
         }
      });
   }

   core.Address.useHashAddressScheme(Modernizr.history === false);
   //call loads the module based on the current address
   core.PageData.setPageData(window.pageSpecificData);
   core.Ajax.UrlMapper.setBaseUrl(window.pageSpecificData.baseUrl);

   //Configuration
   ajaxConfiguration.configure();
   routingConfiguration.configure();

   //Common Modules
   core.DomManipulation.addMapping("OkCancelModule", "#okCancelModal");
   core.DataBinding.addMapping("OkCancelModule", "okCancelModal");

   //start the address manager managing
   core.Address.setRootUrl(window.pageSpecificData.rootUrl);
   core.Address.enable();
});