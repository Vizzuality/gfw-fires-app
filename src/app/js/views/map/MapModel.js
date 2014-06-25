/* global define */
define([
    "knockout",
    "main/Config",
    "views/map/MapConfig",
    "dojo/dom"
], function(ko, Config, MapConfig, dom) {

    var o = {};

    o.vm = {};

    var vm = o.vm;

    vm.appState = ko.observable({});

    // Simple Text Labels
    vm.locatorContainerHeader = ko.observable(MapConfig.text.locatorContainerHeader);
    vm.locatorSearchLabel = ko.observable(MapConfig.text.locatorSearchLabel);
    vm.dmsSearch = ko.observable(MapConfig.text.dmsSearch);
    vm.latLongSearch = ko.observable(MapConfig.text.latLongSearch);
    vm.degreesLabel = ko.observable(MapConfig.text.degreesLabel);
    vm.minutesLabel = ko.observable(MapConfig.text.minutesLabel);
    vm.secondsLabel = ko.observable(MapConfig.text.secondsLabel);
    vm.latitudeLabel = ko.observable(MapConfig.text.latitudeLabel);
    vm.longitudeLabel = ko.observable(MapConfig.text.longitudeLabel);
    vm.searchOptionGoButton = ko.observable(MapConfig.text.searchOptionGoButton);
    vm.clearSearchPins = ko.observable(MapConfig.text.clearSearchPins);
    vm.legend = ko.observable(MapConfig.text.legend);
    vm.firesCheckbox = ko.observable(MapConfig.text.firesCheckbox);
    vm.firesSubLabel = ko.observable(MapConfig.text.firesSubLabel);
    vm.confidenceFiresCheckbox = ko.observable(MapConfig.text.confidenceFiresCheckbox);
    vm.firesWeek = ko.observable(MapConfig.text.firesWeek);
    vm.fires72 = ko.observable(MapConfig.text.fires72);
    vm.fires48 = ko.observable(MapConfig.text.fires48);
    vm.fires24 = ko.observable(MapConfig.text.fires24);
    vm.none = ko.observable(MapConfig.text.none);
    vm.oilPalmCheckbox = ko.observable(MapConfig.text.oilPalmCheckbox);
    vm.woodFiberCheckbox = ko.observable(MapConfig.text.woodFiberCheckbox);
    vm.loggingCheckbox = ko.observable(MapConfig.text.loggingCheckbox);
    vm.protectedAreasCheckbox = ko.observable(MapConfig.text.protectedAreasCheckbox);
    vm.peatLandsRadio = ko.observable(MapConfig.text.peatLandsRadio);
    vm.treeCoverDensityRadio = ko.observable(MapConfig.text.treeCoverDensityRadio);
    vm.southeastLandCoverRadio = ko.observable(MapConfig.text.southeastLandCoverRadio);
    vm.peatLandsSubLabel = ko.observable(MapConfig.text.peatLandsSubLabel);
    vm.treeCoverDensitySubLabel = ko.observable(MapConfig.text.treeCoverDensitySubLabel);
    vm.southeastLandCoverSubLabel = ko.observable(MapConfig.text.southeastLandCoverSubLabel);
    vm.forestUseCheckboxSubLabelSelect = ko.observable(MapConfig.text.forestUseCheckboxSubLabelSelect);
    vm.conservationCheckboxSubLabelGlobal = ko.observable(MapConfig.text.conservationCheckboxSubLabelGlobal);
    vm.airQuality = ko.observable(MapConfig.text.airQuality);
    vm.windDirection = ko.observable(MapConfig.text.windDirection);
    vm.digitalGlobeCheckbox = ko.observable(MapConfig.text.digitalGlobeCheckbox);
    vm.landsatImageCheckbox = ko.observable(MapConfig.text.landsatImageCheckbox);
    vm.landsatImageSubLabel = ko.observable(MapConfig.text.landsatImageSubLabel);
    vm.twitterConversationsCheckbox = ko.observable(MapConfig.text.twitterConversationsCheckbox);
    vm.transparencySliderLabel = ko.observable(MapConfig.text.transparencySliderLabel);

    vm.showBasemapGallery = ko.observable(false);
    vm.showLocatorWidgets = ko.observable(false);
    vm.showLatLongInputs = ko.observable(false);
    vm.showDMSInputs = ko.observable(true);
    vm.showClearPinsOption = ko.observable(false);
    vm.currentLatitude = ko.observable(0);
    vm.currentLongitude = ko.observable(0);

    o.applyBindings = function(domId) {
        ko.applyBindings(vm, dom.byId(domId));
    };

    o.get = function(item) {
        return item === 'model' ? o.vm : o.vm[item]();
    };

    o.set = function(key, value) {
        o.vm[key](value);
    };

    return o;

});