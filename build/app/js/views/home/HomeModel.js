/*! Global-Forest-Watch-Fires Fri Dec 05 2014 09:10:06 */
define(["knockout","main/Config","dojo/dom","modules/HashController","modules/EventsController"],function(a,b,c,d,e){var f={};f.vm={};var g=f.vm;return g.appState=a.observable({}),g.homeModeOptions=a.observableArray(b.homeModeOptions),g.modeSelect=function(a){e.modeSelect(a)},f.applyBindings=function(b){a.applyBindings(g,c.byId(b))},f});