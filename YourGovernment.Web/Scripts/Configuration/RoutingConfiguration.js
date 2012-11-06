define("RoutingConfiguration", ["Core.Address", "Core.Navigation"], function (address, navigation) {
   return {
      configure: function () {
         //Landing Screen
         address.addRoute({ name: "LandingScreen", route: [], event: "OpenLandingScreen" });
         navigation.addLoadAndNavigate({ name: "LandingScreen", listensTo: "OpenLandingScreen", startsModuleGroup: "LandingScreen" });
      }
   };
});