﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using YourGovernment.Web.Controllers;

namespace YourGovernment.Web {
   // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
   // visit http://go.microsoft.com/?LinkId=9394801

   public class WebApiApplication : System.Web.HttpApplication {
      protected void Application_Start() {
         AreaRegistration.RegisterAllAreas();

         WebApiConfig.Register(GlobalConfiguration.Configuration);
         FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
         RouteConfig.RegisterRoutes(RouteTable.Routes);
         BundleConfig.RegisterBundles(BundleTable.Bundles);


         var builder = new ContainerBuilder();
         builder.RegisterControllers(typeof(HomeController).Assembly);
         builder.RegisterApiControllers(typeof(ValuesController).Assembly);

         //Registrations
         //builder.RegisterType<DateTimeProvider>().As<IDateTimeProvider>();

         var container = builder.Build();

         DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
         GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
      }
   }
}