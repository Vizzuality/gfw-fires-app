define(["dojo/on","dojo/dom","dojo/query","dojo/dom-construct","dojo/number","dojo/dom-class","dojo/_base/array","dojo/_base/fx","dojo/promise/all","dojo/Deferred","dojo/dom-style","dojo/dom-geometry","dojo/date","esri/map","esri/config","esri/dijit/HomeButton","esri/geometry/Point","esri/dijit/BasemapGallery","esri/dijit/Basemap","esri/dijit/BasemapLayer","esri/dijit/LocateButton","esri/dijit/Geocoder","esri/dijit/Legend","esri/dijit/Scalebar","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/ImageParameters","esri/layers/FeatureLayer","esri/geometry/webMercatorUtils","esri/geometry/Extent","esri/InfoTemplate","esri/dijit/PopupTemplate","esri/graphic","esri/urlUtils","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/renderers/SimpleRenderer","esri/Color","dijit/registry","views/map/MapConfig","views/map/MapModel","views/map/LayerController","views/map/WindyController","views/map/Finder","views/report/ReportOptionsController","utils/DijitFactory","modules/EventsController","esri/request","esri/tasks/query","esri/tasks/QueryTask","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","views/map/DigitalGlobeTiledLayer","views/map/DigitalGlobeServiceLayer","views/map/BurnScarTiledLayer","views/map/Uploader","views/map/DrawTool","modules/HashController","esri/layers/GraphicsLayer","esri/layers/ImageServiceParameters","dijit/Dialog","utils/Helper","dojo/aspect"],function(e,a,t,r,i,o,n,s,l,d,c,y,p,g,m,u,h,f,b,v,w,L,I,k,D,A,x,T,S,O,C,E,P,F,_,H,G,M,j,Y,B,N,V,W,U,R,z,q,J,Q,Z,K,X,ea,aa,ta,ra,ia,oa,na,sa,la,da){var ca={},ya=!1,pa={viewId:"mapView",viewName:"map"},ma=[],ua=new _(_.STYLE_SOLID,new H(H.STYLE_SOLID,new M("yellow"),5),new M([255,255,0,0]));return ca.mapExtentPausable,ca.init=function(){var e=this;return ya?(ca.map.resize(),z.switchToView(pa),ca.fromStories(),void ca.checkBubble()):(ya=!0,void require(["dojo/text!views/map/map.html","dojo/ready"],function(t,r){a.byId(pa.viewId).innerHTML=t,da.showLoader("map","map-blocker"),z.switchToView(pa),r(function(){B.applyBindings("map-view"),addthis.init(),e.addConfigurations(),$("#footerView").hide(),e.createMap(),setTimeout(function(){e.checkBubble(),e.fromStories()},1e3)})}))},ca.centerChange=function(){if(ca.map){var a=S.webMercatorToGeographic(ca.map.extent),t=i.round(a.getCenter().x,2),r=i.round(a.getCenter().y,2),o=ca.map.getLevel(),n=oa.newState,s=parseFloat(n.x)!=t||parseFloat(n.y)!=r||parseInt(n.l)!=o;if(s){ca.mapExtentPausable.pause(),e.once(ca.map,"extent-change",function(){ca.mapExtentPausable.resume()});var l=S.geographicToWebMercator(new h(parseFloat(n.x),parseFloat(n.y)));ca.map.centerAndZoom(l,parseInt(n.l))}}},ca.addConfigurations=function(){var e=Y.proxies,a=document.location.href,t="/proxy/proxy.ashx";for(var r in e)0===a.indexOf(r)&&(t=e[r],m.defaults.io.proxyUrl=e[r]);F.addProxyRule({urlPrefix:"https://services.digitalglobe.com/",proxyUrl:t}),F.addProxyRule({urlPrefix:Y.landsat8.prefix,proxyUrl:t}),m.defaults.io.corsEnabledServers.push(Y.windData.domain)},ca.createMap=function(){var a=this;R.buildDijits(Y.reportOptionsDijits),R.buildDijits(Y.accordionDijits);var t=oa.newState.x,r=oa.newState.y,o=oa.newState.l;ca.map=new g("map",{center:[t,r],zoom:o,basemap:Y.mapOptions.basemap,minZoom:Y.mapOptions.minZoom,maxZoom:Y.mapOptions.maxZoom,sliderPosition:Y.mapOptions.sliderPosition,force3DTransforms:!0,navigationMode:"css-transforms"}),window.map=ca.map,ca.map.on("load",function(){$("#firesDateTo").datepicker("option","minDate","+0m -7d"),$("#noaaDateFrom").datepicker("setDate","10/22/2014"),$("#indoDateFrom").datepicker("setDate","1/1/2013"),ca.map.graphics.clear(),B.vm.windPicker(),j.byId("fires-map-accordion").resize(),V.setMap(ca.map),N.setMap(ca.map),W.setMap(ca.map),ra.setMap(ca.map),ia.init(map),a.addWidgets(),a.bindEvents(),a.addLayers(),W.setupInfowindowListeners(),e.once(ca.map,"update-end",function(){ca.map.centerAt(new h(t,r)).then(function(){setTimeout(function(){ca.mapExtentPausable.resume()},1e3)})}),ca.map.resize()}),ca.mapExtentPausable=e.pausable(ca.map,"extent-change",function(e){var a=(e.delta,S.webMercatorToGeographic(e.extent)),t=(e.levelChange,e.lod),r=(e.target,i.round(a.getCenter().x,2)),o=i.round(a.getCenter().y,2);oa.updateHash({x:r,y:o,l:t.level}),"on"==dijit.byId("digital-globe-checkbox").getValue()&&ca.updateImageryList()}),ca.mapExtentPausable.pause()},ca.checkBubble=function(){console.log("checking bubble"),Y.digitalGlobe.navigationBool&&(j.byId("digital-globe-checkbox").setValue(!0),j.byId("fires-map-accordion").selectChild(j.byId("imagery-panel")),Y.digitalGlobe.navigationBool=!1)},ca.fromStories=function(){console.log("Checking out user stories"),Y.storiesBool&&(j.byId("fire-stories-checkbox").setValue(!0),j.byId("fires-map-accordion").selectChild(j.byId("social-media-panel")),Y.storiesBool=!1)},ca.updateImageryList=function(){B.vm.digitalGlobeInView.removeAll();var e=ca.map.extent,a=ca.map.getLayer("Digital_Globe_Bounding_Boxes");ma=[];for(var t=dijit.byId("timeSliderDG").thumbIndexes,r=dijit.byId("timeSliderDG").timeStops,i=moment(r[t[0]]).tz("Asia/Jakarta"),o=moment(r[t[1]]).tz("Asia/Jakarta"),s=0;s<a.graphics.length;s++)e.intersects(a.graphics[s].geometry)&&ma.push(a.graphics[s]);n.forEach(ma,function(e){var a=moment(e.attributes.AcquisitionDate).tz("Asia/Jakarta");if(a>=i&&o>=a){var a=moment(e.attributes.AcquisitionDate).tz("Asia/Jakarta");e.attributes.AcquisitionDate=a.format("YYYY/MM/DD");var t="<a class='popup-link' data-bucket='"+e.attributes.SensorName+"_id_"+e.attributes.OBJECTID+"'>"+a.format("YYYY/MM/DD")+"</a>",r="<a class='popup-link' data-bucket='"+e.attributes.SensorName+"_id_"+e.attributes.OBJECTID+"'>"+e.attributes.SensorName+"</a>";e.attributes.formattedDatePrefix1=t,e.attributes.formattedDatePrefix2=r,B.vm.digitalGlobeInView.push({feature:e,selected:e.attributes.OBJECTID==B.vm.selectedImageryID()})}}),B.vm.digitalGlobeInView.sort(function(e,a){return e.feature.attributes.AcquisitionDate==a.feature.attributes.AcquisitionDate?0:e.feature.attributes.AcquisitionDate>a.feature.attributes.AcquisitionDate?-1:1})},ca.showDigitalGlobe=function(e){var a=B.vm.digitalGlobeInView();B.vm.digitalGlobeInView([]),n.forEach(a,function(a){a.selected=a==e?!0:!1,B.vm.digitalGlobeInView.push(a)}),B.vm.selectedImageryID(e.feature.attributes.OBJECTID),N.showDigitalGlobeImagery(e)},ca.imageryZoom=function(e){var a=ca.map.getLayer("Digital_Globe_Bounding_Boxes_Highlight");a.clear(),ca.map.setExtent(e.feature.geometry.getExtent())},ca.handleImageryOver=function(e){var a=new P(e.feature.geometry),t=ca.map.getLayer("Digital_Globe_Bounding_Boxes_Highlight");t.add(a)},ca.handleImageryOut=function(){var e=ca.map.getLayer("Digital_Globe_Bounding_Boxes_Highlight");e.clear()},ca.resizeMapPanel=function(e){1==e?($("#control-panel").css("width","2px"),$(".map-container").css("left","2px"),$("#leftPaneToggle").html("+"),$("#latLongHUD").css("left","100px"),$("div.scalebar_bottom-left.esriScalebar").css("left","119px"),$("#map").css("left","2px"),$("#control-panel").css("background-color","#ecc53d"),ca.map.resize(),B.vm.toggleMapPane(!1)):($("#control-panel").css("width","320px"),$(".map-container").css("left","320px"),$("#leftPaneToggle").html("-"),$("#map").css("left","320px"),$("#latLongHUD").css("left","0px"),$("div.scalebar_bottom-left.esriScalebar").css("left","19px"),$("#control-panel").css("background-color","transparent"),ca.map.resize(),B.vm.toggleMapPane(!0)),$("#leftPaneToggle").hide(),$("#latLongHUD").hide(),$("div.scalebar_bottom-left.esriScalebar").hide(),$("#control-panel > div.report-link-container").hide(),setTimeout(function(){$("#latLongHUD").show(),$("#leftPaneToggle").show(),$("div.scalebar_bottom-left.esriScalebar").show(),$("#control-panel > div.report-link-container").show()},1e3)},ca.removeAnalysisFromHash=function(){N.updateLayersInHash("remove","Get_Fires_Analysis")},ca.addWidgets=function(){var t,i,o,n,s,l,d,c=[];t=new k({map:ca.map,scalebarUnit:"metric"}),r.create("div",{id:"home-button","class":"home-button"},document.querySelector(".esriSimpleSliderIncrementButton"),"after"),l=new u({map:ca.map},"home-button"),l.startup(),i=new b({layers:[new v({url:Y.mapOptions.darkGrayCanvas})],id:"darkgray",title:"Dark Gray Canvas",thumbnailUrl:"app/images/darkGreyThumb.jpg"}),d=new f({map:ca.map,basemaps:c,showArcGISBasemaps:!0},"basemap-gallery"),d.startup(),n=new w({map:ca.map,highlightLocation:!1},"location-widget"),n.startup(),o=new L({map:ca.map},"esri-geocoder-widget"),o.startup(),s=new I({map:ca.map,layerInfos:[],autoUpdate:!0},"legend"),s.startup();var y=function(){B.get("showBasemapGallery")&&B.set("showBasemapGallery",!1),B.get("showShareContainer")&&B.set("showShareContainer",!1),B.get("showAlertContainer")&&B.set("showAlertContainer",!1),B.set("showLocatorWidgets",!B.get("showLocatorWidgets"))},p=function(){B.get("showLocatorWidgets")&&B.set("showLocatorWidgets",!1),B.get("showShareContainer")&&B.set("showShareContainer",!1),B.get("showAlertContainer")&&B.set("showAlertContainer",!1),B.set("showBasemapGallery",!B.get("showBasemapGallery"))},g=function(){B.get("showLocatorWidgets")&&B.set("showLocatorWidgets",!1),B.get("showBasemapGallery")&&B.set("showBasemapGallery",!1),B.set("showShareContainer",!B.get("showShareContainer"))},m=function(){B.get("showLocatorWidgets")&&B.set("showLocatorWidgets",!1),B.get("showBasemapGallery")&&B.set("showBasemapGallery",!1),B.get("showShareContainer")&&B.set("showShareContainer",!1),B.set("showAlertContainer",!B.get("showAlertContainer"))},h=function(){B.set("showDrawTools",!1),$("#drawFeatures").css("background-color","#444"),B.set("showUploadTools",!B.get("showUploadTools")),B.get("showUploadTools")?$("#uploadFeatures").css("background-color","#e7002f"):$("#uploadFeatures").css("background-color","#444"),ia.isActive()&&ia.deactivateToolbar()},D=function(){B.set("showUploadTools",!1),$("#uploadFeatures").css("background-color","#444"),B.set("showDrawTools",!B.get("showDrawTools")),B.get("showDrawTools")?$("#drawFeatures").css("background-color","#e7002f"):$("#drawFeatures").css("background-color","#444")};e(a.byId("locator-widget-button"),"click",y),e(a.byId("basemap-gallery-button"),"click",p),e(a.byId("share-button"),"click",g),e(a.byId("alert-button"),"click",m),e(a.byId("uploadFeatures"),"click",h),e(a.byId("drawFeatures"),"click",D),e(a.byId("uploadForm"),"change",ra.beginUpload.bind(ra)),this.initTransparency()},ca.initTransparency=function(){["forest-transparency-slider","conservation-transparency-slider","land-cover-transparency-slider"].map(function(e){dijit.byId(e).set("value",70)})},ca.bindEvents=function(){var i=this;e(a.byId("dms-search"),"change",function(e){var a=e.target?e.target.checked:e.srcElement.checked;a&&(B.set("showDMSInputs",!0),B.set("showLatLongInputs",!1))}),e(a.byId("lat-long-search"),"change",function(e){var a=e.target?e.target.checked:e.srcElement.checked;a&&(B.set("showLatLongInputs",!0),B.set("showDMSInputs",!1))}),e(ca.map,"mouse-move",function(e){B.set("currentLatitude",e.mapPoint.getLatitude().toFixed(4)),B.set("currentLongitude",e.mapPoint.getLongitude().toFixed(4))}),e(ca.map,"click",function(e){W.selectTomnodFeatures(e)}),e(ca.map.graphics,"click",function(e){e.graphic&&W.selectUploadOrDrawnGraphics(e)}),e(j.byId("confidence-fires-checkbox"),"change",function(e){N.updateFiresLayer(!0),e&&i.reportAnalyticsHelper("layer","option","The user toggled the Active Fires only show high confidence fires option on.")}),e(j.byId("twitter-conversations-checkbox"),"change",function(){var e=j.byId("twitter-conversations-checkbox").checked;N.toggleLayerVisibility(Y.tweetLayer.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Twitter Conversations layer on.")}),e(j.byId("fire-stories-checkbox"),"change",function(){var e=j.byId("fire-stories-checkbox").checked;N.toggleLayerVisibility(Y.fireStories.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Fire Stories layer on.")}),e(j.byId("fires-checkbox"),"change",function(){var e=j.byId("fires-checkbox").checked;N.toggleLayerVisibility(Y.firesLayer.id,e),B.vm.showActiveFiresButtons(e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Active Fires layer on.")}),e(j.byId("air-quality-checkbox"),"change",function(e){return N.toggleLayerVisibility(Y.airQualityLayer.id,e),e?($("#airDate").datepicker("setDate","+0m +0d"),ca.map.getLayer(Y.airQualityLayer.id).setVisibleLayers([0]),i.reportAnalyticsHelper("layer","toggle","The user toggled the Air Quality layer on."),B.vm.showReportOptionsAIR(!0),void 0):void B.vm.showReportOptionsAIR(!1)}),e(j.byId("tomnod-checkbox"),"change",function(e){N.toggleLayerVisibility(Y.tomnodLayer.id,e),N.toggleLayerVisibility(Y.tomnodLayer.sel_id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Tomnod layer on.")}),e(j.byId("indonesia-fires"),"change",function(e){console.log(e),1==e?$(".confidence-fires-container").css("margin-left","38px"):$(".confidence-fires-container").css("margin-left","46px"),N.toggleMapServiceLayerVisibility(ca.map.getLayer(Y.indonesiaLayers.id),Y.indonesiaLayers.layerIds.indonesiaFires,e)}),e(j.byId("noaa-fires-18"),"change",function(e){N.toggleMapServiceLayerVisibility(ca.map.getLayer(Y.indonesiaLayers.id),Y.indonesiaLayers.layerIds.noaa18,e)}),e(j.byId("burned-scars-checkbox"),"change",function(e){N.toggleLayerVisibility(Y.burnScarLayer.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Burn Scars layer on.")}),e(j.byId("landsat-image-checkbox"),"change",function(){var e=j.byId("landsat-image-checkbox").checked;N.toggleLayerVisibility(Y.landsat8.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Latest Landsat 8 Imagery layer on.")}),j.byId("windy-layer-checkbox").on("change",function(e){V.toggleWindLayer(e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Wind direction layer on.")}),j.byId("digital-globe-checkbox").on("change",function(e){N.toggleDigitalGlobeLayer(e),B.vm.showReportOptionsDigitalGlobe(e),e&&(setTimeout(function(){dijit.byId("digital-globe-footprints-checkbox").set("value","true",!1)},0),i.reportAnalyticsHelper("layer","toggle","The user toggled the Digital Globe - First Look layer on."))}),j.byId("digital-globe-footprints-checkbox").on("change",function(e){N.toggleDigitalGlobeLayer(e,"footprints"),ca.updateImageryList()}),j.byId("provinces-checkbox").on("change",function(e){N.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Provinces overlay layer on.")}),j.byId("districts-checkbox").on("change",function(e){N.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Districts overlay layer on.")}),j.byId("subdistricts-checkbox").on("change",function(e){N.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Subdistricts overlay layer on.")}),j.byId("villages-checkbox").on("change",function(e){N.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Villages overlay layer on.")}),e(a.byId("search-option-go-button"),"click",function(){W.searchAreaByCoordinates(),i.reportAnalyticsHelper("widget","search","The user searched for location by latitude/longitude or Degrees/Minutes/Seconds.")}),e(a.byId("print-button"),"click",function(){i.printMap(),i.reportAnalyticsHelper("widget","print","The user clicked the print widget to print the map.")}),e(a.byId("report-link"),"click",function(){B.vm.showReportOptions(!0),B.vm.reportAOIs().length<1&&U.populate_select(),i.reportAnalyticsHelper("widget","report","The user clicked Get Fires Analysis to generate an report with the latest analysis."),console.log("In hash");var e=oa.getHash();-1===e.lyrs.indexOf("Get_Fires_Analysis")&&(console.log("Changing hash"),N.updateLayersInHash("add","lyrs","Get_Fires_Analysis"))}),e(a.byId("noaa-fires-18"),"click",function(){if("false"==this.getAttribute("aria-checked")){var e=a.byId("indonesia-fires");return"false"==e.getAttribute("aria-checked")&&(ca.map.getLayer("IndonesiaFires").visible=!1,console.log("Should disable pop-ups")),void B.vm.showReportOptionsNOAA(!1)}B.vm.showReportOptionsNOAA(!0),U.populate_select()}),e(a.byId("indonesia-fires"),"click",function(){if("false"==this.getAttribute("aria-checked")){var e=a.byId("noaa-fires-18");return"false"==e.getAttribute("aria-checked")&&(ca.map.getLayer("IndonesiaFires").visible=!1,console.log("Should disable pop-ups")),void B.vm.showReportOptionsINDO(!1)}B.vm.showReportOptionsINDO(!0),U.populate_select()}),e(a.byId("windy-layer-checkbox"),"click",function(){return"false"==this.getAttribute("aria-checked")?void B.vm.showReportOptionsWIND(!1):(B.vm.showReportOptionsWIND(!0),void U.populate_select())}),e(a.byId("updateNOAA"),"click",function(){var e=B.vm.noaaObservFrom(),a=B.vm.noaaObservTo(),t=$("#noaaDateFrom").datepicker("getDate"),r=$("#noaaDateTo").datepicker("getDate");a=moment(r).add(1,"day"),e=moment(t).tz("Asia/Jakarta").format("M/D/YYYY"),a=moment(a._d).tz("Asia/Jakarta").format("M/D/YYYY");var i=e.replace(/\//g,"-"),o=a.replace(/\//g,"-"),n=N.getTimeDefinition("Date",i,o);N.updateDynamicMapServiceLayerDefinition(ca.map.getLayer(Y.indonesiaLayers.id),Y.indonesiaLayers.layerIds.noaa18,n)}),e(a.byId("updateINDO"),"click",function(){var e=B.vm.indoObservFrom(),a=B.vm.indoObservTo(),t=$("#indoDateFrom").datepicker("getDate"),r=$("#indoDateTo").datepicker("getDate");a=moment(r).add(1,"day"),e=moment(t).tz("Asia/Jakarta").format("M/D/YYYY"),a=moment(a._d).tz("Asia/Jakarta").format("M/D/YYYY");var i=e.replace(/\//g,"-"),o=(a.replace(/\//g,"-"),N.getTimeDefinition("ACQ_DATE",i,a));j.byId("confidence-archive-checkbox").checked&&(o=[o,Y.firesLayer.highConfidence].join(" AND ")),N.updateDynamicMapServiceLayerDefinition(ca.map.getLayer(Y.indonesiaLayers.id),Y.indonesiaLayers.layerIds.indonesiaFires,o)}),e(j.byId("confidence-archive-checkbox"),"change",function(e){console.log("confidence",e);var a=e?Y.firesLayer.highConfidence:"",t=ca.map.getLayer(Y.indonesiaLayers.id),r=Y.indonesiaLayers.layerIds.indonesiaFires,i=t.layerDefinitions,o=i[r];if(e)var n=void 0!=o?[o,a].join(" AND "):a;else var n=o.replace(" AND "+Y.firesLayer.highConfidence,a).replace(Y.firesLayer.highConfidence,a);N.updateDynamicMapServiceLayerDefinition(ca.map.getLayer(Y.indonesiaLayers.id),Y.indonesiaLayers.layerIds.indonesiaFires,n)}),e(a.byId("updateWIND"),"click",function(){var e=(B.vm.windObserv(),$("#windDate").datepicker("getDate")),a=moment(e).tz("Asia/Jakarta").format("MM/DD/YYYY"),t=B.vm.timeOfDay(),r=a.split("/"),i=r[2].toString()+r[0].toString()+r[1].toString();console.log(i);var o="http://suitability-mapper.s3.amazonaws.com/wind/archive/wind-surface-level-gfs-"+i+t+".1-0.gz.json";V.deactivateWindLayer(),V.activateWindLayer(o)}),e(a.byId("updateAIR"),"click",function(){var e=$("#airDate").datepicker("getDate"),a=new Date;if(a.setHours(0,0,0,0),e.getTime()==a.getTime()){var t=ca.map.getLayer(Y.airQualityLayer.id);return void t.setVisibleLayers([0])}var r=moment(e).format("YYYY/MM/DD"),i=moment(e).add("days",1).format("YYYY/MM/DD"),o=N.getTimeDefinition("dateUpdated",r,i);N.updateDynamicMapServiceLayerDefinition(ca.map.getLayer(Y.airQualityLayer.id),1,o)}),e(a.byId("embedShare"),"click",function(){i.showEmbedCode()}),e(a.byId("clear-search-pins"),"click",this.clearSearchPins),e(a.byId("legend-widget-title"),"click",this.toggleLegend),j.byId("forest-transparency-slider").on("change",function(e){N.setTransparency(Y.forestUseLayers.id,e)}),j.byId("land-cover-transparency-slider").on("change",function(e){N.setTransparency(Y.landCoverLayers.id,e)}),j.byId("conservation-transparency-slider").on("change",function(e){N.setTransparency(Y.conservationLayers.id,e)}),t(".active-fires-options").forEach(function(a){e(a,"click",i.toggleFireOption.bind(i))}),t(".esriPopupWrapper").forEach(function(t){r.create("div",{id:"close-icon","class":"close-icon"},t),e(a.byId("close-icon"),"click",function(){ca.map.infoWindow.hide(),$("#uploadCustomGraphic").length>0&&$("#uploadCustomGraphic").remove()})}),t("#forest-use-panel div.checkbox-container div input").forEach(function(e){o.add(e,"forest-use-layers-option")}),t("#conservation-panel div.checkbox-container div input").forEach(function(e){o.add(e,"conservation-layers-option")}),t("#land-cover-panel div.checkbox-container div input").forEach(function(e){"land-cover-radios"===e.name&&o.add(e,"land-cover-layers-option")}),t("#forest-use-panel div.checkbox-container div input").forEach(function(a){e(a,"change",function(e){N.updateAdditionalVisibleLayers("forest-use-layers-option",Y.forestUseLayers);var a=e.target?e.target:e.srcElement;a.checked})}),t(".conservation-layers-option").forEach(function(a){e(a,"change",function(e){N.updateAdditionalVisibleLayers("conservation-layers-option",Y.conservationLayers);var a=e.target?e.target:e.srcElement;a.checked})}),t(".land-cover-layers-option").forEach(function(a){e(a,"change",function(e){N.updateLandCoverLayers(e);var a=e.target?e.target:e.srcElement;if(a.checked){var r=t("#land-cover-panel .dijitChecked")[0].parentNode.children[1];if(r.innerHTML.length>0){var o=r.innerHTML;-1===o.search("None")&&i.reportAnalyticsHelper("layer","toggle","The user toggled the "+o+" layer on")}}})}),t("#primary-forests-options input").forEach(function(a){e(a,"change",function(e){N.updatePrimaryForestsLayer(!0);var a=e.target?e.target:e.srcElement;if(a.checked&&a.labels.length>0){var t=a.labels[0].innerHTML;-1===t.search("Primary")&&(t="Primary Forests "+t),i.reportAnalyticsHelper("layer","toggle","The user toggled the "+t+" layer on")}})})},ca.addLayers=function(){var a,t,r,i,o,s,l,d,c,y,p,g,m,u,h,f,b,v,w=this;a=new x,a.format="png32",a.layerIds=Y.conservationLayers.defaultLayers,a.layerOption=x.LAYER_OPTION_SHOW,t=new D(Y.conservationLayers.url,{imageParameters:a,id:Y.conservationLayers.id,visible:!1}),indonesiaParams=new x,indonesiaParams.format="png32",indonesiaParams.layerIds=Y.indonesiaLayers.defaultLayers,indonesiaParams.layerOption=x.LAYER_OPTION_SHOW,indonesiaLayer=new D(Y.indonesiaLayers.url,{imageParameters:indonesiaParams,id:Y.indonesiaLayers.id,visible:!1}),s=new x,s.format="png32",s.layerIds=Y.landCoverLayers.defaultLayers,s.layerOption=x.LAYER_OPTION_SHOW,l=new D(Y.landCoverLayers.url,{imageParameters:s,id:Y.landCoverLayers.id,visible:!1}),c=new x,c.format="png32",c.layerIds=Y.forestUseLayers.defaultLayers,c.layerOption=x.LAYER_OPTION_SHOW,y=new D(Y.forestUseLayers.url,{imageParameters:c,id:Y.forestUseLayers.id,visible:!1}),p=new A(Y.treeCoverLayer.url,{id:Y.treeCoverLayer.id,visible:!1}),r=new x,r.format="png32",r.layerIds=Y.primaryForestsLayer.defaultLayers,r.layerOption=x.LAYER_OPTION_SHOW,i=new D(Y.primaryForestsLayer.url,{imageParameters:r,id:Y.primaryForestsLayer.id,visible:!1}),h=new A(Y.landsat8.url,{id:Y.landsat8.id,visible:!1}),v=Y.digitalGlobe,o=v.mosaics.map(function(e){return new A(v.imagedir+e+"/ImageServer",{id:e,visible:!1})}),dglyrs=o,g=new D(Y.overlaysLayer.url,{id:Y.overlaysLayer.id,visible:!1}),d=new D(Y.airQualityLayer.url,{id:Y.airQualityLayer.id,visible:!1}),tomnodParams=new x,tomnodParams.layerIds=Y.tomnodLayer.defaultLayers,tomnodParams.layerOption=x.LAYER_OPTION_SHOW,u=new D(Y.tomnodLayer.url,{imageParameters:tomnodParams,id:Y.tomnodLayer.id,visible:!1});var L=new C("${name}",W.getTomnodInfoWindow),I=new T(Y.tomnodLayer.url+"/"+Y.tomnodLayer.defaultLayers[0],{mode:T.MODE_SELECTION,infoTemplate:L,outFields:["*"],id:Y.tomnodLayer.sel_id});m=new ta(Y.burnScarLayer.url,Y.burnScarLayer.id),f=new x,f.format="png32",f.layerIds=Y.firesLayer.defaultLayers,f.layerOption=x.LAYER_OPTION_SHOW,b=new D(Y.firesLayer.url,{imageParameters:f,id:Y.firesLayer.id,visible:!1}),tweetLayer=new T(Y.tweetLayer.url,{mode:T.MODE_ONDEMAND,id:Y.tweetLayer.id,visible:!1,outFields:["*"]});new E({title:"{Title}",fieldInfos:[{fieldName:"Date",label:"Date",format:{dateFormat:"shortDate"},visible:!0},{fieldName:"Details",label:"Details",visible:!0},{fieldName:"Video",label:"Video",visible:!0},{fieldName:"Name",label:"Name",visible:!0}],showAttachments:!0});fireStories=new T(Y.fireStories.url,{mode:T.MODE_ONDEMAND,id:Y.fireStories.id,visible:!1,outFields:["*"],hasAttachments:!0,definitionExpression:"Publish = 'Y'"});var k={layerDefinition:{geometryType:"esriGeometryPolygon",fields:[]},featureSet:null},S=new T(k,{id:Y.digitalGlobe.graphicsLayerId,visible:!1}),O=new na(k,{id:Y.digitalGlobe.graphicsLayerHighlight,visible:!0}),P=new G(ua);O.setRenderer(P),dglyr=S;var F=[p,l,i,S,O].concat(o).concat([t,m,u,y,g,tweetLayer,fireStories,d,I,indonesiaLayer,b]);e.once(ca.map,"layers-add-result",function(e){w.enableLayersFromHash();var a=n.map(e.layers,function(e){return{layer:e.layer}});a=n.filter(a,function(e){var a=e.layer.url?e.layer.url.search("ImageServer")<0:!1,t=!(e.layer.id===I.id);return a&&t}),da.hideLoader("map-blocker"),j.byId("legend").refresh(a)}),ca.map.addLayers(F),ca.map.addLayer(h),g.on("load",N.setOverlayLayerOrder),m.on("error",this.layerAddError),h.on("error",this.layerAddError),p.on("error",this.layerAddError),i.on("error",this.layerAddError),t.on("error",this.layerAddError),l.on("error",this.layerAddError),g.on("error",this.layerAddError),y.on("error",this.layerAddError),b.on("error",this.layerAddError),fireStories.on("error",this.layerAddError),d.on("error",this.layerAddError),h.on("load",function(){ca.map.reorderLayer(h,1)})},ca.layerAddError=function(e){require(["modules/ErrorController"],function(a){a.show(10,"Error adding Layer : <br> "+e.target.url)})},ca.removeCustomFeatures=function(){ca.map.graphics.clear(),B.vm.customFeaturesArray([]),B.vm.customFeaturesPresence(!1)},ca.toggleFireOption=function(e){var a=e.target?e.target:e.srcElement;t(".selected-fire-option").forEach(function(e){o.remove(e,"selected-fire-option")}),o.add(a,"selected-fire-option"),N.updateFiresLayer()},ca.enableLayersFromHash=function(){function t(){j.byId("fires-checkbox").set("checked",!0),N.updateLayersInHash("add",Y.firesLayer.id,Y.firesLayer.id)}function r(t,r){if(void 0!==t&&""!==t)if(void 0===r)y[t]&&(o=y[t].id,j.byId(o)&&(j.byId(o).set("checked",!0),e.emit(a.byId(o),"change",{})));else{n=y[t],s=r.split(",");for(var i=0,l=s.length;l>i;i++)if(o=n[s[i]].id,"[object Array]"===Object.prototype.toString.call(o))for(var d=0,c=o.length;c>d;d++)j.byId(o[d])&&(j.byId(o[d]).set("checked",!0),e.emit(a.byId(o[d]),"change",{}));else j.byId(o)&&(j.byId(o).set("checked",!0),e.emit(a.byId(o),"change",{}))}}var i,o,n,s,l=oa.getHash(),d=l.lyrs,c=d.split(":"),y=Y.layersCheckboxes;if(void 0===d)return void t();if(1===c.length&&""===c[0])return void t();for(var p=0,g=c.length;g>p;p++)i=c[p].split("/"),r(i[0],i[1]);var m=oa.getHash();m.lyrs.indexOf("Get_Fires_Analysis")>-1&&(console.log("Updating from hash"),$("#report-link").click())},ca.clearSearchPins=function(){ca.map.graphics.clear(),B.set("showClearPinsOption",!1)},ca.toggleLegend=function(){var e=a.byId("legend-widget-container"),t=e.offsetHeight-2===280?30:280;s.animateProperty({node:e,properties:{height:t},duration:500}).play(),30===t?o.add("legend-widget-title","legend-closed"):o.remove("legend-widget-title","legend-closed")},ca.printMap=function(){var a=document.getElementsByTagName("body")[0];o.add("print-button","loading"),o.add(a,"map-view-print"),j.byId("stackContainer").resize(),j.byId("mapView").resize(),ca.map.resize(),e.once(ca.map,"resize",function(){setTimeout(function(){window.print(),o.remove("print-button","loading"),o.remove(a,"map-view-print"),j.byId("stackContainer").resize(),ca.map.resize()},2e3)})},ca.reportAnalyticsHelper=function(e,a,t){ga("A.send","event",e,a,t),ga("B.send","event",e,a,t),ga("C.send","event",e,a,t)},ca.showEmbedCode=function(){j.byId("embedCodeShareDialog")&&j.byId("embedCodeShareDialog").destroy();var e,t="<iframe src='"+window.location+"' height='600' width='900'></iframe>",r=new la({title:"Embed Code",style:"width: 350px",id:"embedCodeShareDialog",content:'Copy the code below to embed in your site. (Ctrl+C on PC and Cmd+C on Mac)<div class=\'dijitDialogPaneActionBar\'><input id="embedInput" type="text" value="'+t+'" autofocus /></div>'});e=function(){r.destroy()},r.show(),a.byId("embedInput").select(),r.on("cancel",function(){e()})},ca});