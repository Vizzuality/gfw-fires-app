/*! Global-Forest-Watch-Fires Fri Dec 05 2014 09:10:06 */
define(["knockout","main/Config","dojo/dom","modules/EventsController"],function(a,b,c,d){var e={};e.vm={};var f=e.vm;return f.headerTitle=a.observable(b.headerTitle),f.headerDesc=a.observable(b.headerDesc),f.navigationLinks=a.observableArray(b.navigationLinks),f.appState=a.observable({}),f.clickNavLink=function(a){d.clickNavLink(a)},e.applyBindings=function(b){a.applyBindings(f,c.byId(b))},e});