/*! Global-Forest-Watch-Fires Tue Jul 22 2014 16:30:35 */
define(["knockout","main/Config","views/map/MapConfig","dojo/dom"],function(a,b,c,d){var e={};e.vm={};var f=e.vm;return f.appState=a.observable({}),f.locatorContainerHeader=a.observable(c.text.locatorContainerHeader),f.locatorSearchLabel=a.observable(c.text.locatorSearchLabel),f.dmsSearch=a.observable(c.text.dmsSearch),f.latLongSearch=a.observable(c.text.latLongSearch),f.degreesLabel=a.observable(c.text.degreesLabel),f.minutesLabel=a.observable(c.text.minutesLabel),f.secondsLabel=a.observable(c.text.secondsLabel),f.latitudeLabel=a.observable(c.text.latitudeLabel),f.longitudeLabel=a.observable(c.text.longitudeLabel),f.searchOptionGoButton=a.observable(c.text.searchOptionGoButton),f.clearSearchPins=a.observable(c.text.clearSearchPins),f.legend=a.observable(c.text.legend),f.firesCheckbox=a.observable(c.text.firesCheckbox),f.noaaFiresCheckbox=a.observable(c.text.noaaFiresCheckbox),f.firesSubLabel=a.observable(c.text.firesSubLabel),f.confidenceFiresCheckbox=a.observable(c.text.confidenceFiresCheckbox),f.firesWeek=a.observable(c.text.firesWeek),f.fires72=a.observable(c.text.fires72),f.fires48=a.observable(c.text.fires48),f.fires24=a.observable(c.text.fires24),f.none=a.observable(c.text.none),f.oilPalmCheckbox=a.observable(c.text.oilPalmCheckbox),f.rspoOilPalmCheckbox=a.observable(c.text.rspoOilPalmCheckbox),f.woodFiberCheckbox=a.observable(c.text.woodFiberCheckbox),f.loggingCheckbox=a.observable(c.text.loggingCheckbox),f.protectedAreasCheckbox=a.observable(c.text.protectedAreasCheckbox),f.burnedScarsCheckbox=a.observable(c.text.burnedScarsCheckbox),f.peatLandsRadio=a.observable(c.text.peatLandsRadio),f.treeCoverDensityRadio=a.observable(c.text.treeCoverDensityRadio),f.primaryForestsRadio=a.observable(c.text.primaryForestsRadio),f.southeastLandCoverRadio=a.observable(c.text.southeastLandCoverRadio),f.peatLandsSubLabel=a.observable(c.text.peatLandsSubLabel),f.treeCoverDensitySubLabel=a.observable(c.text.treeCoverDensitySubLabel),f.southeastLandCoverSubLabel=a.observable(c.text.southeastLandCoverSubLabel),f.forestUseCheckboxSubLabelSelect=a.observable(c.text.forestUseCheckboxSubLabelSelect),f.rspoOilPalmCheckboxSubLabel=a.observable(c.text.rspoOilPalmCheckboxSubLabel),f.primaryForestsSubLabel=a.observable(c.text.primaryForestsSubLabel),f.conservationCheckboxSubLabelGlobal=a.observable(c.text.conservationCheckboxSubLabelGlobal),f.airQuality=a.observable(c.text.airQuality),f.digitalGlobeCheckbox=a.observable(c.text.digitalGlobeCheckbox),f.landsatImageCheckbox=a.observable(c.text.landsatImageCheckbox),f.landsatImageSubLabel=a.observable(c.text.landsatImageSubLabel),f.twitterConversationsCheckbox=a.observable(c.text.twitterConversationsCheckbox),f.transparencySliderLabel=a.observable(c.text.transparencySliderLabel),f.getReportLink=a.observable(c.text.getReportLink),f.windyLayerCheckbox=a.observable(c.text.windyLayerCheckbox),f.windySubLabelAdvice=a.observable(c.text.windySubLabelAdvice),f.windySubLabel=a.observable(c.text.windySubLabel),f.provincesCheckbox=a.observable(c.text.provincesCheckbox),f.districtsCheckbox=a.observable(c.text.districtsCheckbox),f.subDistrictsCheckbox=a.observable(c.text.subDistrictsCheckbox),f.villagesCheckbox=a.observable(c.text.villagesCheckbox),f.pf2000Radio=a.observable(c.text.pf2000Radio),f.pf2005Radio=a.observable(c.text.pf2005Radio),f.pf2010Radio=a.observable(c.text.pf2010Radio),f.pf2012Radio=a.observable(c.text.pf2012Radio),f.showBasemapGallery=a.observable(!1),f.showShareContainer=a.observable(!1),f.showLocatorWidgets=a.observable(!1),f.showPrimaryForestOptions=a.observable(!1),f.showWindLegend=a.observable(!1),f.showLatLongInputs=a.observable(!1),f.showDMSInputs=a.observable(!0),f.showClearPinsOption=a.observable(!1),f.currentLatitude=a.observable(0),f.currentLongitude=a.observable(0),e.applyBindings=function(b){a.applyBindings(f,d.byId(b))},e.get=function(a){return"model"===a?e.vm:e.vm[a]()},e.set=function(a,b){e.vm[a](b)},e});