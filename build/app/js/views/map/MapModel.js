/*! Global-Forest-Watch-Fires Thu Dec 11 2014 15:29:32 */
define(["knockout","main/Config","views/map/MapConfig","dojo/dom","libs/moment","libs/timezone"],function(a,b,c,d){var e={};e.vm={};var f=e.vm;f.appState=a.observable({}),f.locatorContainerHeader=a.observable(c.text.locatorContainerHeader),f.locatorSearchLabel=a.observable(c.text.locatorSearchLabel),f.dmsSearch=a.observable(c.text.dmsSearch),f.latLongSearch=a.observable(c.text.latLongSearch),f.degreesLabel=a.observable(c.text.degreesLabel),f.minutesLabel=a.observable(c.text.minutesLabel),f.secondsLabel=a.observable(c.text.secondsLabel),f.latitudeLabel=a.observable(c.text.latitudeLabel),f.longitudeLabel=a.observable(c.text.longitudeLabel),f.searchOptionGoButton=a.observable(c.text.searchOptionGoButton),f.clearSearchPins=a.observable(c.text.clearSearchPins),f.legend=a.observable(c.text.legend),f.firesCheckbox=a.observable(c.text.firesCheckbox),f.noaaFiresCheckbox=a.observable(c.text.noaaFiresCheckbox),f.noaaSubLabel=a.observable(c.text.noaaSubLabel),f.indonesiaFiresCheckbox=a.observable(c.text.indonesiaFiresCheckbox),f.indonesiaSubLabel=a.observable(c.text.indonesiaSubLabel),f.firesSubLabel=a.observable(c.text.firesSubLabel),f.confidenceFiresCheckbox=a.observable(c.text.confidenceFiresCheckbox),f.firesWeek=a.observable(c.text.firesWeek),f.fires72=a.observable(c.text.fires72),f.fires48=a.observable(c.text.fires48),f.fires24=a.observable(c.text.fires24),f.none=a.observable(c.text.none),f.oilPalmCheckbox=a.observable(c.text.oilPalmCheckbox),f.rspoOilPalmCheckbox=a.observable(c.text.rspoOilPalmCheckbox),f.woodFiberCheckbox=a.observable(c.text.woodFiberCheckbox),f.loggingCheckbox=a.observable(c.text.loggingCheckbox),f.protectedAreasCheckbox=a.observable(c.text.protectedAreasCheckbox),f.burnedScarsCheckbox=a.observable(c.text.burnedScarsCheckbox),f.tomnodCheckbox=a.observable(c.text.tomnodCheckbox),f.peatLandsRadio=a.observable(c.text.peatLandsRadio),f.treeCoverDensityRadio=a.observable(c.text.treeCoverDensityRadio),f.primaryForestsRadio=a.observable(c.text.primaryForestsRadio),f.southeastLandCoverRadio=a.observable(c.text.southeastLandCoverRadio),f.peatLandsSubLabel=a.observable(c.text.peatLandsSubLabel),f.treeCoverDensitySubLabel=a.observable(c.text.treeCoverDensitySubLabel),f.southeastLandCoverSubLabel=a.observable(c.text.southeastLandCoverSubLabel),f.forestUseCheckboxSubLabelSelect=a.observable(c.text.forestUseCheckboxSubLabelSelect),f.rspoOilPalmCheckboxSubLabel=a.observable(c.text.rspoOilPalmCheckboxSubLabel),f.primaryForestsSubLabel=a.observable(c.text.primaryForestsSubLabel),f.conservationCheckboxSubLabelGlobal=a.observable(c.text.conservationCheckboxSubLabelGlobal),f.airQuality=a.observable(c.text.airQuality),f.digitalGlobeCheckbox=a.observable(c.text.digitalGlobeCheckbox),f.digitalGlobeFootprintsCheckbox=a.observable(c.text.digitalGlobeFootprintsCheckbox),f.landsatImageCheckbox=a.observable(c.text.landsatImageCheckbox),f.landsatImageSubLabel=a.observable(c.text.landsatImageSubLabel),f.twitterConversationsCheckbox=a.observable(c.text.twitterConversationsCheckbox),f.transparencySliderLabel=a.observable(c.text.transparencySliderLabel),f.getReportLink=a.observable(c.text.getReportLink),f.getDates=a.observable(c.text.getDates),f.windyLayerCheckbox=a.observable(c.text.windyLayerCheckbox),f.windySubLabelAdvice=a.observable(c.text.windySubLabelAdvice),f.windySubLabel=a.observable(c.text.windySubLabel),f.provincesCheckbox=a.observable(c.text.provincesCheckbox),f.districtsCheckbox=a.observable(c.text.districtsCheckbox),f.subDistrictsCheckbox=a.observable(c.text.subDistrictsCheckbox),f.digitalGlobeSubLabel=a.observable(c.text.digitalGlobeSubLabel),f.digitalGlobeFootprintsSubLabel=a.observable(c.text.digitalGlobeFootprintsSubLabel),f.villagesCheckbox=a.observable(c.text.villagesCheckbox),f.pf2000Radio=a.observable(c.text.pf2000Radio),f.pf2005Radio=a.observable(c.text.pf2005Radio),f.pf2010Radio=a.observable(c.text.pf2010Radio),f.pf2012Radio=a.observable(c.text.pf2012Radio),f.imageIconPath=a.observable(c.text.imageSourcePath),f.timeOfDay=a.observable("00"),f.wind00Radio=a.observable("00"),f.wind06Radio=a.observable("06"),f.wind12Radio=a.observable("12"),f.wind18Radio=a.observable("18"),f.wind06Enable=a.observable(),f.wind12Enable=a.observable(),f.wind18Enable=a.observable(),f.wind06Disable=function(){var a=new Date,b=(new Date,a.getHours(),moment(a));if(a=b.tz("Atlantic/Cape_Verde").format("ha z"),-1!=a.indexOf("am")){var c=a.split("am");c=c[0]}else{var c=a.split("pm");c=c[0],c=parseInt(c)+12}return 6>c?(f.wind06Enable(!1),$("#wind06 > label").css("color","grey"),!0):(f.wind06Enable(!0),!1)},f.wind12Disable=function(){var a=new Date,b=moment(a);if(a=b.tz("Atlantic/Cape_Verde").format("ha z"),-1!=a.indexOf("am")){var c=a.split("am");c=c[0]}else{var c=a.split("pm");c=c[0],c=parseInt(c)+12}return 12>c?(f.wind12Enable(!1),$("#wind12 > label").css("color","grey"),!0):(f.wind12Enable(!0),!1)},f.wind18Disable=function(){var a=new Date,b=moment(a);if(a=b.tz("Atlantic/Cape_Verde").format("ha z"),-1!=a.indexOf("am")){var c=a.split("am");c=c[0]}else{var c=a.split("pm");c=c[0],c=parseInt(c)+12}return 18>c?(f.wind18Enable(!1),$("#wind18 > label").css("color","grey"),!0):(f.wind18Enable(!0),!1)},f.months=[0,31,28,31,30,31,30,31,31,30,31,30,31],f.reportAOIs=a.observableArray([]),f.selectedAOIs=a.observableArray([]),f.reportText=a.observable(c.text.reportOptions),f.reportTextImagery=a.observable(c.text.digitalGlobeWindowText);var g=new Date,h=g.getDate(),i=g.getMonth()+1,j=g.getFullYear(),k=i+"/"+h+"/"+j,l=new Date((new Date).setDate((new Date).getDate()-7)),m=l.getDate(),n=l.getMonth()+1,o=l.getFullYear(),p=n+"/"+m+"/"+o;return f.firesPickerFrom=function(){var a=(jQuery("#firesDateFrom").datepicker({minDate:new Date(2013,0,1),maxDate:"+0M +0D",onSelect:function(a){return console.log(a),f.firesObservFrom(a),$("#firesDateTo").datepicker("option","minDate",a),a}}),new Date((new Date).setDate((new Date).getDate()-7))),b=a.getDate(),c=a.getMonth()+1,d=a.getFullYear(),e=c+"/"+b+"/"+d;return e},f.firesPickerTo=function(){var a=(jQuery("#firesDateTo").datepicker({minDate:new Date(2013,0,1),maxDate:"+0M +0D",onSelect:function(a){return f.firesObservTo(a),$("#firesDateFrom").datepicker("option","maxDate",a),a}}),new Date),b=a.getDate(),c=a.getMonth()+1,d=a.getFullYear(),e=c+"/"+b+"/"+d;return e},f.windPicker=function(){var a=(jQuery("#windDate").datepicker({minDate:new Date(2014,9,19),maxDate:"+0M +0D",onSelect:function(a){$("#wind06 > label").css("color","black"),$("#wind12 > label").css("color","black"),$("#wind18 > label").css("color","black");var b=Date.parse(a),c=new Date;return c.setHours(0,0,0,0),c.getTime()>b?(f.wind06Enable(!0),f.wind12Enable(!0),f.wind18Enable(!0)):(f.timeOfDay("00"),f.wind06Disable(),f.wind12Disable(),f.wind18Disable()),f.windObserv(a),a}}),new Date),b=a.getDate(),c=a.getMonth()+1,d=a.getFullYear(),e=c+"/"+b+"/"+d;return e},f.noaaPickerFrom=function(){jQuery("#noaaDateFrom").datepicker({date:new Date(2014,9,22),minDate:new Date(2014,9,22),maxDate:"+0M +0D",onSelect:function(a){return f.noaaObservFrom(a),$("#noaaDateTo").datepicker("option","minDate",a),a}})},f.noaaPickerTo=function(){var a=(jQuery("#noaaDateTo").datepicker({minDate:new Date(2014,9,22),maxDate:"+0M +0D",onSelect:function(a){return f.noaaObservTo(a),$("#noaaDateFrom").datepicker("option","maxDate",a),a}}),new Date),b=a.getDate(),c=a.getMonth()+1,d=a.getFullYear(),e=c+"/"+b+"/"+d;return e},f.indoPickerFrom=function(){jQuery("#indoDateFrom").datepicker({minDate:new Date(2013,0,1),maxDate:"+0M -7D",onSelect:function(a){return f.indoObservFrom(a),$("#indoDateTo").datepicker("option","minDate",a),a}})},f.indoPickerTo=function(){var a=(jQuery("#indoDateTo").datepicker({minDate:new Date(2013,0,1),maxDate:"+0M -7D",onSelect:function(a){return f.indoObservTo(a),$("#indoDateFrom").datepicker("option","maxDate",a),a}}),new Date((new Date).setDate((new Date).getDate()-7))),b=a.getDate(),c=a.getMonth()+1,d=a.getFullYear(),e=c+"/"+b+"/"+d;return e},f.firesObservFrom=a.observable("06/01/2014"),f.firesObservTo=a.observable(k),f.windObserv=a.observable(k),f.noaaObservFrom=a.observable("10/12/2014"),f.noaaObservTo=a.observable(k),f.indoObservFrom=a.observable("1/1/2013"),f.indoObservTo=a.observable(p),f.islands=a.observableArray([]),f.provinces=a.observableArray([]),f.showBasemapGallery=a.observable(!1),f.showShareContainer=a.observable(!1),f.showReportOptions=a.observable(!1),f.showReportOptionsNOAA=a.observable(!1),f.showReportOptionsINDO=a.observable(!1),f.showReportOptionsWIND=a.observable(!1),f.showReportOptionsDigitalGlobe=a.observable(!1),f.showReportOptionsDigitalGlobeFootprints=a.observable(!0),f.digitalGlobeInView=a.observableArray(),f.sortedImageryArray=[],f.showLocatorWidgets=a.observable(!1),f.toggleMapPane=a.observable(!0),f.showPrimaryForestOptions=a.observable(!1),f.showWindLayerOptions=a.observable(!0),f.showWindLegend=a.observable(!1),f.showLatLongInputs=a.observable(!1),f.showDMSInputs=a.observable(!0),f.showClearPinsOption=a.observable(!1),f.currentLatitude=a.observable(0),f.currentLongitude=a.observable(0),f.DigitalGlobeExtents=a.observable([]),f.dgMoments=a.observable([]),f.valuenodes=a.observable(),f.closeReportOptions=function(){f.showReportOptions(!1)},f.closeReportOptionsNOAA=function(){f.showReportOptionsNOAA(!1)},f.closeReportOptionsINDO=function(){f.showReportOptionsINDO(!1)},f.closeReportOptionsWIND=function(){f.showReportOptionsWIND(!1)},f.closeReportOptionsDigitalGlobe=function(){f.showReportOptionsDigitalGlobe(!1)},f.imageryMouseOver=function(a,b){require(["views/map/MapController"],function(c){c.handleImageryOver(a,b)})},f.imageryMouseOut=function(a,b){require(["views/map/MapController"],function(c){c.handleImageryOut(a,b)})},f.slidePanel=function(a){require(["views/map/MapController"],function(b){b.resizeMapPanel(a)})},f.selectImageryMinimize=function(){"table"==$("#imageryWindow > table").css("display")?($("#imageryWindow > table").css("display","none"),$("#report-optionsDigitalGlobe").css("border-bottom","none")):($("#imageryWindow > table").css("display","table"),$("#report-optionsDigitalGlobe").css("border-bottom","2px solid black"))},e.applyBindings=function(b){a.applyBindings(f,d.byId(b))},e.get=function(a){return"model"===a?e.vm:e.vm[a]()},e.set=function(a,b){e.vm[a](b)},e});