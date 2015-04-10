define(["knockout","main/Config","views/map/MapConfig","dojo/dom"],function(e,o,t,a){var r={};r.vm={};var b=r.vm;b.appState=e.observable({}),b.locatorContainerHeader=e.observable(t.text.locatorContainerHeader),b.alertToolboxHeader=e.observable(t.text.alertToolboxHeader),b.locatorSearchLabel=e.observable(t.text.locatorSearchLabel),b.dmsSearch=e.observable(t.text.dmsSearch),b.latLongSearch=e.observable(t.text.latLongSearch),b.degreesLabel=e.observable(t.text.degreesLabel),b.minutesLabel=e.observable(t.text.minutesLabel),b.secondsLabel=e.observable(t.text.secondsLabel),b.latitudeLabel=e.observable(t.text.latitudeLabel),b.longitudeLabel=e.observable(t.text.longitudeLabel),b.searchOptionGoButton=e.observable(t.text.searchOptionGoButton),b.clearSearchPins=e.observable(t.text.clearSearchPins),b.legend=e.observable(t.text.legend),b.firesCheckbox=e.observable(t.text.firesCheckbox),b.noaaFiresCheckbox=e.observable(t.text.noaaFiresCheckbox),b.noaaSubLabel=e.observable(t.text.noaaSubLabel),b.indonesiaFiresCheckbox=e.observable(t.text.indonesiaFiresCheckbox),b.indonesiaSubLabel=e.observable(t.text.indonesiaSubLabel),b.firesSubLabel=e.observable(t.text.firesSubLabel),b.confidenceFiresCheckbox=e.observable(t.text.confidenceFiresCheckbox),b.firesWeek=e.observable(t.text.firesWeek),b.fires72=e.observable(t.text.fires72),b.fires48=e.observable(t.text.fires48),b.fires24=e.observable(t.text.fires24),b.none=e.observable(t.text.none),b.oilPalmCheckbox=e.observable(t.text.oilPalmCheckbox),b.rspoOilPalmCheckbox=e.observable(t.text.rspoOilPalmCheckbox),b.woodFiberCheckbox=e.observable(t.text.woodFiberCheckbox),b.loggingCheckbox=e.observable(t.text.loggingCheckbox),b.protectedAreasCheckbox=e.observable(t.text.protectedAreasCheckbox),b.indicativeMoratoriumCheckbox=e.observable(t.text.indicativeMoratoriumCheckbox),b.burnedScarsCheckbox=e.observable(t.text.burnedScarsCheckbox),b.tomnodCheckbox=e.observable(t.text.tomnodCheckbox),b.peatLandsRadio=e.observable(t.text.peatLandsRadio),b.treeCoverDensityRadio=e.observable(t.text.treeCoverDensityRadio),b.primaryForestsRadio=e.observable(t.text.primaryForestsRadio),b.southeastLandCoverRadio=e.observable(t.text.southeastLandCoverRadio),b.peatLandsSubLabel=e.observable(t.text.peatLandsSubLabel),b.treeCoverDensitySubLabel=e.observable(t.text.treeCoverDensitySubLabel),b.southeastLandCoverSubLabel=e.observable(t.text.southeastLandCoverSubLabel),b.forestUseCheckboxSubLabelSelect=e.observable(t.text.forestUseCheckboxSubLabelSelect),b.rspoOilPalmCheckboxSubLabel=e.observable(t.text.rspoOilPalmCheckboxSubLabel),b.primaryForestsSubLabel=e.observable(t.text.primaryForestsSubLabel),b.conservationCheckboxSubLabelGlobal=e.observable(t.text.conservationCheckboxSubLabelGlobal),b.indicativeMoratoriumCheckboxSubLabel=e.observable(t.text.indicativeMoratoriumCheckboxSubLabel),b.indicativeMoratoriumCheckboxSubLabel2=e.observable(t.text.indicativeMoratoriumCheckboxSubLabel2),b.airQuality=e.observable(t.text.airQuality),b.digitalGlobeCheckbox=e.observable(t.text.digitalGlobeCheckbox),b.digitalGlobeFootprintsCheckbox=e.observable(t.text.digitalGlobeFootprintsCheckbox),b.landsatImageCheckbox=e.observable(t.text.landsatImageCheckbox),b.landsatImageSubLabel=e.observable(t.text.landsatImageSubLabel),b.twitterConversationsCheckbox=e.observable(t.text.twitterConversationsCheckbox),b.fireStoriesCheckbox=e.observable(t.text.fireStoriesCheckbox),b.transparencySliderLabel=e.observable(t.text.transparencySliderLabel),b.alertErrorMessages=e.observableArray([]),b.showAlertErrorMessages=e.observable(!1),b.customFeatureName=e.observable("Drawn/Uploaded Feature"),b.customFeaturesArray=e.observableArray([]),b.getReportLink=e.observable(t.text.getReportLink),b.getDates=e.observable(t.text.getDates),b.windyLayerCheckbox=e.observable(t.text.windyLayerCheckbox),b.windySubLabelAdvice=e.observable(t.text.windySubLabelAdvice),b.windySubLabel=e.observable(t.text.windySubLabel),b.provincesCheckbox=e.observable(t.text.provincesCheckbox),b.districtsCheckbox=e.observable(t.text.districtsCheckbox),b.subDistrictsCheckbox=e.observable(t.text.subDistrictsCheckbox),b.digitalGlobeSubLabel=e.observable(t.text.digitalGlobeSubLabel),b.digitalGlobeFootprintsSubLabel=e.observable(t.text.digitalGlobeFootprintsSubLabel),b.villagesCheckbox=e.observable(t.text.villagesCheckbox),b.pf2000Radio=e.observable(t.text.pf2000Radio),b.pf2005Radio=e.observable(t.text.pf2005Radio),b.pf2010Radio=e.observable(t.text.pf2010Radio),b.pf2012Radio=e.observable(t.text.pf2012Radio),b.imageIconPath=e.observable(t.text.imageSourcePath),b.timeOfDay=e.observable("00"),b.wind00Radio=e.observable("00"),b.wind06Radio=e.observable("06"),b.wind12Radio=e.observable("12"),b.wind18Radio=e.observable("18"),b.wind00Enable=e.observable(),b.wind06Enable=e.observable(),b.wind12Enable=e.observable(),b.wind18Enable=e.observable(),b.windDisabledDates=["2015-01-15"],b.customFeaturesPresence=e.observable(!1),b.clearCustomFeatures=function(){require(["views/map/MapController"],function(e){e.removeCustomFeatures()})},b.wind00Disable=function(){var e=new Date,o=(new Date,e.getHours(),moment(e));if(e=o.tz("Atlantic/Cape_Verde").format("ha z"),-1!=e.indexOf("am")){var t=e.split("am");t=t[0]}else{var t=e.split("pm");t=t[0],t=parseInt(t)+12}return 0>t?(b.wind00Enable(!1),$("#wind00 > label").css("color","grey"),!0):(b.wind00Enable(!0),!1)},b.wind06Disable=function(){var e=new Date,o=(new Date,e.getHours(),moment(e));if(e=o.tz("Atlantic/Cape_Verde").format("ha z"),-1!=e.indexOf("am")){var t=e.split("am");t=t[0]}else{var t=e.split("pm");t=t[0],t=parseInt(t)+12}return 6>t?(b.wind06Enable(!1),$("#wind06 > label").css("color","grey"),!0):(b.wind06Enable(!0),!1)},b.wind12Disable=function(){var e=new Date,o=moment(e);if(e=o.tz("Atlantic/Cape_Verde").format("ha z"),-1!=e.indexOf("am")){var t=e.split("am");t=t[0]}else{var t=e.split("pm");t=t[0],t=parseInt(t)+12}return 12>t?(b.wind12Enable(!1),$("#wind12 > label").css("color","grey"),!0):(b.wind12Enable(!0),!1)},b.wind18Disable=function(){var e=new Date,o=moment(e);if(e=o.tz("Atlantic/Cape_Verde").format("ha z"),-1!=e.indexOf("am")){var t=e.split("am");t=t[0]}else{var t=e.split("pm");t=t[0],t=parseInt(t)+12}return 18>t?(b.wind18Enable(!1),$("#wind18 > label").css("color","grey"),!0):(b.wind18Enable(!0),!1)},b.months=[0,31,28,31,30,31,30,31,31,30,31,30,31],b.reportAOIs=e.observableArray([]),b.selectedAOIs=e.observableArray([]),b.reportText=e.observable(t.text.reportOptions),b.reportTextImagery=e.observable(t.text.digitalGlobeWindowText);var n=new Date,i=n.getDate(),s=n.getMonth()+1,l=n.getFullYear(),c=s+"/"+i+"/"+l,v=new Date((new Date).setDate((new Date).getDate()-7)),d=v.getDate(),u=v.getMonth()+1,p=v.getFullYear(),x=u+"/"+d+"/"+p;return b.firesPickerFrom=function(){var e=(jQuery("#firesDateFrom").datepicker({minDate:new Date(2013,0,1),maxDate:"+0M +0D",onSelect:function(e){return console.log(e),b.firesObservFrom(e),$("#firesDateTo").datepicker("option","minDate",e),e}}),new Date((new Date).setDate((new Date).getDate()-7))),o=e.getDate(),t=e.getMonth()+1,a=e.getFullYear(),r=t+"/"+o+"/"+a;return r},b.firesPickerTo=function(){var e=(jQuery("#firesDateTo").datepicker({minDate:new Date(2013,0,1),maxDate:"+0M +0D",onSelect:function(e){return b.firesObservTo(e),$("#firesDateFrom").datepicker("option","maxDate",e),e}}),new Date),o=e.getDate(),t=e.getMonth()+1,a=e.getFullYear(),r=t+"/"+o+"/"+a;return r},b.windPicker=function(){var e=(jQuery("#windDate").datepicker({minDate:new Date(2014,9,19),maxDate:"+0M +0D",beforeShowDay:function(e){var o=jQuery.datepicker.formatDate("yy-mm-dd",e);return[-1==b.windDisabledDates.indexOf(o)]},onSelect:function(e){$("#wind06 > label").css("color","black"),$("#wind12 > label").css("color","black"),$("#wind18 > label").css("color","black");var o=Date.parse(e),t=new Date;return t.setHours(0,0,0,0),t.getTime()>o?(b.wind00Enable(!0),b.wind06Enable(!0),b.wind12Enable(!0),b.wind18Enable(!0)):(b.timeOfDay("00"),b.wind06Disable(),b.wind12Disable(),b.wind18Disable()),"01/14/2015"==e&&(b.timeOfDay("00"),b.wind18Enable(!1)),"01/16/2015"==e&&(b.timeOfDay("18"),b.wind00Enable(!1),b.wind06Enable(!1),b.wind12Enable(!1)),b.windObserv(e),e}}),new Date),o=e.getDate(),t=e.getMonth()+1,a=e.getFullYear(),r=t+"/"+o+"/"+a;return r},b.airPicker=function(){var e=(jQuery("#airDate").datepicker({minDate:new Date(2014,11,16),maxDate:"+0M +0D",onSelect:function(e){return b.airObserv(e),e}}),new Date),o=e.getDate(),t=e.getMonth()+1,a=e.getFullYear(),r=t+"/"+o+"/"+a;return r},b.noaaPickerFrom=function(){jQuery("#noaaDateFrom").datepicker({date:new Date(2014,9,22),minDate:new Date(2014,9,22),maxDate:"+0M +0D",onSelect:function(e){return b.noaaObservFrom(e),$("#noaaDateTo").datepicker("option","minDate",e),e}})},b.noaaPickerTo=function(){var e=(jQuery("#noaaDateTo").datepicker({minDate:new Date(2014,9,22),maxDate:"+0M +0D",onSelect:function(e){return b.noaaObservTo(e),$("#noaaDateFrom").datepicker("option","maxDate",e),e}}),new Date),o=e.getDate(),t=e.getMonth()+1,a=e.getFullYear(),r=t+"/"+o+"/"+a;return r},b.indoPickerFrom=function(){jQuery("#indoDateFrom").datepicker({minDate:new Date(2013,0,1),maxDate:"+0M -7D",onSelect:function(e){return b.indoObservFrom(e),$("#indoDateTo").datepicker("option","minDate",e),e}})},b.indoPickerTo=function(){var e=(jQuery("#indoDateTo").datepicker({minDate:new Date(2013,0,1),maxDate:"+0M -7D",onSelect:function(e){return b.indoObservTo(e),$("#indoDateFrom").datepicker("option","maxDate",e),e}}),new Date((new Date).setDate((new Date).getDate()-7))),o=e.getDate(),t=e.getMonth()+1,a=e.getFullYear(),r=t+"/"+o+"/"+a;return r},b.firesObservFrom=e.observable(x),b.firesObservTo=e.observable(c),b.windObserv=e.observable(c),b.airObserv=e.observable(c),b.noaaObservFrom=e.observable("10/12/2014"),b.noaaObservTo=e.observable(c),b.indoObservFrom=e.observable("1/1/2013"),b.indoObservTo=e.observable(x),b.islands=e.observableArray([]),b.provinces=e.observableArray([]),b.uploadInstructions=e.observableArray(t.uploadOptions.instructions),b.drawInstructions=e.observableArray(t.text.drawInstructions),b.showBasemapGallery=e.observable(!1),b.showShareContainer=e.observable(!1),b.showReportOptions=e.observable(!1),b.showAlertContainer=e.observable(!1),b.showReportOptionsNOAA=e.observable(!1),b.showActiveFiresButtons=e.observable(!1),b.showReportOptionsINDO=e.observable(!1),b.showReportOptionsWIND=e.observable(!1),b.showReportOptionsAIR=e.observable(!1),b.showUploadTools=e.observable(!1),b.showDrawTools=e.observable(!1),b.showReportOptionsDigitalGlobe=e.observable(!1),b.showReportOptionsDigitalGlobeFootprints=e.observable(!0),b.digitalGlobeInView=e.observableArray(),b.sortedImageryArray=[],b.showLocatorWidgets=e.observable(!1),b.toggleMapPane=e.observable(!0),b.showPrimaryForestOptions=e.observable(!1),b.showWindLayerOptions=e.observable(!0),b.showWindLegend=e.observable(!1),b.showLatLongInputs=e.observable(!1),b.showDMSInputs=e.observable(!0),b.showClearPinsOption=e.observable(!1),b.currentLatitude=e.observable(0),b.currentLongitude=e.observable(0),b.DigitalGlobeExtents=e.observable([]),b.dgMoments=e.observable([]),b.valuenodes=e.observable(),b.selectedImageryID=e.observable(),b.closeReportOptions=function(){b.showReportOptions(!1),require(["views/map/MapController"],function(e){e.removeAnalysisFromHash()})},b.closeAlertsOptions=function(){b.showAlertContainer(!1)},b.closeReportOptionsNOAA=function(){b.showReportOptionsNOAA(!1)},b.closeReportOptionsINDO=function(){b.showReportOptionsINDO(!1)},b.closeReportOptionsWIND=function(){b.showReportOptionsWIND(!1)},b.closeReportOptionsAIR=function(){b.showReportOptionsAIR(!1)},b.closeReportOptionsDigitalGlobe=function(){b.showReportOptionsDigitalGlobe(!1)},b.closeOptionsNASA=function(){b.showActiveFiresButtons(!1)},b.imageryMouseOver=function(e,o){console.log("MOUSE OVER"),require(["views/map/MapController"],function(t){t.handleImageryOver(e,o)})},b.imageryMouseOut=function(e,o){console.log("MOUSE OUT"),require(["views/map/MapController"],function(t){t.handleImageryOut(e,o)})},b.imageryZoomTo=function(e,o){require(["views/map/MapController"],function(t){t.imageryZoom(e,o)})},b.digitalGlobeToggle=function(e,o){console.log("CLICK"),require(["views/map/MapController"],function(t){t.showDigitalGlobe(e,o)})},b.slidePanel=function(){var e=b.toggleMapPane();require(["views/map/MapController"],function(o){o.resizeMapPanel(e)})},b.selectImageryMinimize=function(){"table"==$("#imageryWindow > table").css("display")?($("#imageryWindow > table").css("display","none"),$("#report-optionsDigitalGlobe").css("border-bottom","none")):($("#imageryWindow > table").css("display","table"),$("#report-optionsDigitalGlobe").css("border-bottom","2px solid black"))},r.applyBindings=function(o){e.applyBindings(b,a.byId(o))},r.get=function(e){return"model"===e?r.vm:r.vm[e]()},r.set=function(e,o){r.vm[e](o)},r});