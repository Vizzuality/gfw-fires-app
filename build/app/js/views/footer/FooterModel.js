/*! Global-Forest-Watch-Fires Fri Dec 05 2014 09:10:06 */
define(["knockout","main/Config","dojo/dom","modules/HashController","modules/EventsController"],function(a,b,c,d,e){var f={};f.vm={};var g=f.vm;return g.footerModeOptions=a.observableArray(b.footerModeOptions),g.provincesAvailableForAlerts=a.observableArray([]),g.districtsAvailableForAlerts=a.observableArray([]),g.subDistrictsAvailableForAlerts=a.observableArray([]),g.errorMessages=a.observableArray([]),g.showErrorMessages=a.observable(!1),g.showSubDistrictWarning=a.observable(!1),g.appState=a.observable({}),g.footerSelect=function(a){e.footerSelect(a)},f.applyBindings=function(b){a.applyBindings(g,c.byId(b))},f.get=function(a){return"model"===a?f.vm:f.vm[a]()},f});