﻿/*globals Core, $*/
(function() {

   var coreDomManipulation = function($, document) {

      var elementMappings = { };

      var domManipulation = {
         setCssLeftOnElement: function(element, value) {
            $(element).css({ left: value + 'px' });
         },
         setCssRightOnElement: function(element, value) {
            $(element).css({ right: value + 'px' });
         },
         setVisible: function(element, isVisible) {
            if (isVisible) {
               $(element).show();
            } else {
               $(element).hide();
            }
         },
         animatedHide: function(element, completedCallback) {
            $(element).hide('slow', 'swing', completedCallback);
         },
         animatedShow: function(element, completedCallback) {
            $(element).show('slow', 'swing', completedCallback);
         },
         animatedShowRightToLeft: function(element, completedCallback) {
            $(element).show('slide', { direction: 'right' }, 500, completedCallback);
         },
         animatedHideLeftToRight: function(element, completedCallback) {
            $(element).hide('slide', { direction: 'right' }, 500, completedCallback);
         },
         fadeIn: function(element, completedCallback) {
            $(element).fadeIn('fast', 'swing', completedCallback);
         },
         fadeOut: function(element, completedCallback) {
            $(element).fadeOut('fast', 'swing', completedCallback);
         }
      };

      return {
         addMapping: function(name, domElement) {
            elementMappings[name] = domElement;
         },
         removeMapping: function(name) {
            delete elementMappings[name];
         },
         getDom: function() {
            return domManipulation;
         },
         openDialog: function(name, closedCallback) {
            var closedFunction,
               element = $(elementMappings[name]);

            closedFunction = function () {
               //unbind the 'hide' event
               element.unbind('hidden', closedFunction);

               if (closedCallback !== undefined && typeof closedCallback === "function") {
                  closedCallback();
               }
            };

            //show the dialog
            element.modal('show');

            //attach an event to the "hide"
            element.bind('hidden', closedFunction);
         },
         closeDialog: function(name) {
            var element = $(elementMappings[name]);
            element.modal('hide');
         },
         setDocumentTitle: function(newTitle) {
            document.title = newTitle;
         }
      };
   };
   
   //manage require module loading scenario
   if (typeof define === "function" && define.amd) {
      define("Core.DomManipulation", ["Core", "jquery"], function (core, jQuery) {
         core.DomManipulation = coreDomManipulation(jQuery, document);
         return core.DomManipulation;
      });
   }
   else {
      Core.DomManipulation = coreDomManipulation($, document);
   }

})();