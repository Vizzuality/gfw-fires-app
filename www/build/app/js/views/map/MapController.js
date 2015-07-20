define(["dojo/on","dojo/dom","dojo/query","dojo/dom-construct","dojo/number","dojo/dom-class","dojo/_base/array","dojo/_base/fx","dojo/promise/all","dojo/Deferred","dojo/dom-style","dojo/dom-geometry","dojo/date","esri/map","esri/config","esri/dijit/HomeButton","esri/geometry/Point","esri/dijit/BasemapGallery","esri/dijit/Basemap","esri/dijit/BasemapLayer","esri/dijit/LocateButton","esri/dijit/Geocoder","esri/dijit/Legend","esri/dijit/Scalebar","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/TiledMapServiceLayer","esri/layers/ImageParameters","esri/layers/FeatureLayer","esri/geometry/webMercatorUtils","esri/geometry/Extent","esri/geometry/Polygon","esri/InfoTemplate","esri/dijit/PopupTemplate","esri/graphic","esri/urlUtils","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/renderers/SimpleRenderer","esri/renderers/ClassBreaksRenderer","esri/renderers/smartMapping","esri/Color","dijit/registry","views/map/MapConfig","views/map/MapModel","views/map/LayerController","views/map/WindyController","views/map/clusterfeaturelayer","views/map/Finder","views/report/ReportOptionsController","utils/DijitFactory","modules/EventsController","esri/request","esri/tasks/query","esri/tasks/QueryTask","esri/tasks/RelationshipQuery","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","views/map/DigitalGlobeTiledLayer","views/map/DigitalGlobeServiceLayer","views/map/BurnScarTiledLayer","views/map/Uploader","views/map/DrawTool","modules/HashController","esri/layers/GraphicsLayer","esri/layers/ImageServiceParameters","dijit/Dialog","utils/Helper","dojo/aspect","utils/Analytics"],function(e,a,t,r,i,o,n,s,l,d,c,p,u,m,y,g,h,f,b,v,w,L,I,D,k,S,C,A,x,T,E,O,_,F,P,H,N,M,G,R,B,Y,j,V,W,U,z,Q,q,J,Z,X,K,ea,aa,ta,ra,ia,oa,na,sa,la,da,ca,pa,ua,ma,ya,ha,fa,ba,va){var wa={},La=!1,Ia={viewId:"mapView",viewName:"map"},Da=[],ka=new M(M.STYLE_SOLID,new G(G.STYLE_SOLID,new j("yellow"),5),new j([255,255,0,0]));return wa.mapExtentPausable,wa.init=function(){var e=this;return La?(wa.map.resize(),K.switchToView(Ia),wa.fromStories(),wa.checkBubble(),va.sendPageview("/"+window.location.href.split("#")[1],"map"),void 0):(La=!0,require(["dojo/text!views/map/map.html","dojo/ready"],function(t,r){a.byId(Ia.viewId).innerHTML=t,fa.showLoader("map","map-blocker"),K.switchToView(Ia),r(function(){U.applyBindings("map-view"),addthis.init(),e.addConfigurations(),$("#footerView").hide(),e.createMap(),setTimeout(function(){e.checkBubble(),e.fromStories(),fa.showLoader("clusterCircle","cluster-blocker")},1e3)})}),va.sendPageview("/"+window.location.href.split("#")[1],"map"),void 0)},wa.centerChange=function(){if(wa.map){var a=T.webMercatorToGeographic(wa.map.extent),t=i.round(a.getCenter().x,2),r=i.round(a.getCenter().y,2),o=wa.map.getLevel(),n=ua.newState,s=parseFloat(n.x)!=t||parseFloat(n.y)!=r||parseInt(n.l)!=o;if(s){wa.mapExtentPausable.pause(),e.once(wa.map,"extent-change",function(){wa.mapExtentPausable.resume()});var l=T.geographicToWebMercator(new h(parseFloat(n.x),parseFloat(n.y)));wa.map.centerAndZoom(l,parseInt(n.l))}}},wa.addConfigurations=function(){var e=W.proxies,a=document.location.href,t="/proxy/proxy.php";for(var r in e)0===a.indexOf(r)&&(t=e[r],y.defaults.io.proxyUrl=e[r]);H.addProxyRule({urlPrefix:"https://services.digitalglobe.com/",proxyUrl:t}),H.addProxyRule({urlPrefix:W.landsat8.prefix,proxyUrl:t}),y.defaults.io.corsEnabledServers.push(W.windData.domain)},wa.createMap=function(){var a=this;X.buildDijits(W.reportOptionsDijits),X.buildDijits(W.accordionDijits);var t=ua.newState.x,r=ua.newState.y,o=ua.newState.l,n=W.basemapReverseLookup[ua.newState.b];wa.map=new m("map",{center:[t,r],zoom:o||W.mapOptions.initalZoom,basemap:n||W.mapOptions.basemap,minZoom:W.mapOptions.minZoom,maxZoom:W.mapOptions.maxZoom,sliderPosition:W.mapOptions.sliderPosition,force3DTransforms:!0,navigationMode:"css-transforms"}),window.map=wa.map,wa.map.on("load",function(){$("#firesDateTo").datepicker("option","minDate","+0m -7d"),$("#noaaDateFrom").datepicker("setDate","10/22/2014"),$("#indoDateFrom").datepicker("setDate","1/1/2013"),wa.map.graphics.clear(),U.vm.windPicker(),V.byId("fires-map-accordion").resize(),Q.setMap(wa.map),z.setMap(wa.map),J.setMap(wa.map),ca.setMap(wa.map),pa.init(map),a.addWidgets(),a.bindEvents(),a.addLayers(),J.setupInfowindowListeners(),e.once(wa.map,"update-end",function(){wa.map.centerAt(new h(t,r)).then(function(){setTimeout(function(){wa.mapExtentPausable.resume()},1e3)})}),wa.map.resize()}),wa.mapExtentPausable=e.pausable(wa.map,"extent-change",function(e){var a=(e.delta,T.webMercatorToGeographic(e.extent)),t=(e.levelChange,e.lod),r=(e.target,i.round(a.getCenter().x,2)),o=i.round(a.getCenter().y,2);ua.updateHash({x:r,y:o,l:t.level}),"on"==dijit.byId("digital-globe-checkbox").getValue()&&wa.updateImageryList()}),wa.mapExtentPausable.pause()},wa.checkBubble=function(){console.log("checking bubble"),W.digitalGlobe.navigationBool&&(V.byId("digital-globe-checkbox").setValue(!0),V.byId("fires-map-accordion").selectChild(V.byId("imagery-panel")),W.digitalGlobe.navigationBool=!1)},wa.fromStories=function(){console.log("Checking out user stories"),W.storiesBool&&(V.byId("fire-stories-checkbox").setValue(!0),V.byId("fires-map-accordion").selectChild(V.byId("social-media-panel")),W.storiesBool=!1)},wa.updateImageryList=function(){U.vm.digitalGlobeInView.removeAll();var e=wa.map.extent,a=wa.map.getLayer("Digital_Globe_Bounding_Boxes");Da=[];for(var t,r=dijit.byId("timeSliderDG").thumbIndexes,i=dijit.byId("timeSliderDG").timeStops,o=moment(i[r[0]]).tz("Asia/Jakarta"),s=moment(i[r[1]]).tz("Asia/Jakarta"),l=0;l<a.graphics.length;l++)e.intersects(a.graphics[l].geometry)&&Da.push(a.graphics[l]);n.forEach(Da,function(e){var a=moment(e.attributes.AcquisitionDate).tz("Asia/Jakarta");if(a>=o&&s>=a){var a=moment(e.attributes.AcquisitionDate).tz("Asia/Jakarta");e.attributes.AcquisitionDate=a.format("YYYY/MM/DD");var r="<a class='popup-link' data-bucket='"+e.attributes.SensorName+"_id_"+e.attributes.OBJECTID+"'>"+a.format("YYYY/MM/DD")+"</a>",i="<a class='popup-link' data-bucket='"+e.attributes.SensorName+"_id_"+e.attributes.OBJECTID+"'>"+e.attributes.SensorName+"</a>";e.attributes.formattedDatePrefix1=r,e.attributes.formattedDatePrefix2=i,t=fa.getDigitalGlobeUniqueId(e),U.vm.digitalGlobeInView.push({feature:e,selected:t===U.vm.selectedImageryID()})}}),U.vm.digitalGlobeInView.sort(function(e,a){return e.feature.attributes.AcquisitionDate==a.feature.attributes.AcquisitionDate?0:e.feature.attributes.AcquisitionDate>a.feature.attributes.AcquisitionDate?-1:1})},wa.showDigitalGlobe=function(e){var a=U.vm.digitalGlobeInView();U.vm.digitalGlobeInView([]),n.forEach(a,function(a){a.selected=a==e?!0:!1,U.vm.digitalGlobeInView.push(a)});var t=fa.getDigitalGlobeUniqueId(e.feature);U.vm.selectedImageryID(t),z.showDigitalGlobeImagery(e)},wa.imageryZoom=function(e){var a=wa.map.getLayer("Digital_Globe_Bounding_Boxes_Highlight");a.clear(),wa.map.setExtent(e.feature.geometry.getExtent())},wa.handleImageryOver=function(e){var a=new P(e.feature.geometry),t=wa.map.getLayer("Digital_Globe_Bounding_Boxes_Highlight");t.add(a)},wa.handleImageryOut=function(){var e=wa.map.getLayer("Digital_Globe_Bounding_Boxes_Highlight");e.clear()},wa.removeLoaderFromClusters=function(){$("#clusterCircle").addClass("hoverSmart"),fa.hideLoader("cluster-blocker")},wa.blockClusters=function(){$("#clusterCircle").removeClass("hoverSmart"),$("#clusterCircle").css("pointer-events","none"),fa.createBlocker("clusterCircle","cluster-denier")},wa.getClassJenks=function(e,a){for(var t=a.sort(function(e,a){return e-a}),r=[],i=0,o=t.length+1;o>i;i++){for(var n=[],s=0,l=e+1;l>s;s++)n.push(0);r.push(n)}for(var d=[],c=0,p=t.length+1;p>c;c++){for(var u=[],m=0,y=e+1;y>m;m++)u.push(0);d.push(u)}for(var g=1,h=e+1;h>g;g++){r[0][g]=1,d[0][g]=0;for(var f=1,b=t.length+1;b>f;f++)d[f][g]=1/0;var v=0}for(var w=2,L=t.length+1;L>w;w++){for(var I=0,D=0,k=0,S=1,C=w+1;C>S;S++){var A=w-S+1,x=parseFloat(t[A-1]);D+=x*x,I+=x,k+=1,v=D-I*I/k;var T=A-1;if(0!=T)for(var E=2,O=e+1;O>E;E++)d[w][E]>=v+d[T][E-1]&&(r[w][E]=A,d[w][E]=v+d[T][E-1])}r[w][1]=1,d[w][1]=v}var _=t.length,F=[];for(c=0;e>=c;c++)F.push(0);F[e]=parseFloat(t[t.length-1]),F[0]=parseFloat(t[0]);for(var P=e;P>=2;){var H=parseInt(r[_][P]-2);F[P-1]=t[H],_=parseInt(r[_][P]-1),P-=1}return F[0]==F[1]&&(F[0]=0),F},wa.setSmartRenderer=function(e){switch(e){case"Heat map":var a,t;t=wa.map.getLayer("newFires"),t.show(),a=wa.map.getLayer("firesClusters"),a.hide();break;case"Proportional symbols":a=wa.map.getLayer("firesClusters"),a.show();var t,a;t=wa.map.getLayer("newFires"),t.hide()}},wa.resizeMapPanel=function(e){1==e?($("#control-panel").css("width","2px"),$(".map-container").css("left","2px"),$("#leftPaneToggle").html("+"),$("#latLongHUD").css("left","100px"),$("div.scalebar_bottom-left.esriScalebar").css("left","119px"),$("#map").css("left","2px"),$("#control-panel").css("background-color","#ecc53d"),wa.map.resize(),U.vm.toggleMapPane(!1)):($("#control-panel").css("width","320px"),$(".map-container").css("left","320px"),$("#leftPaneToggle").html("-"),$("#map").css("left","320px"),$("#latLongHUD").css("left","0px"),$("div.scalebar_bottom-left.esriScalebar").css("left","19px"),$("#control-panel").css("background-color","transparent"),wa.map.resize(),U.vm.toggleMapPane(!0)),$("#leftPaneToggle").hide(),$("#latLongHUD").hide(),$("div.scalebar_bottom-left.esriScalebar").hide(),$("#control-panel > div.report-link-container").hide(),setTimeout(function(){$("#latLongHUD").show(),$("#leftPaneToggle").show(),$("div.scalebar_bottom-left.esriScalebar").show(),$("#control-panel > div.report-link-container").show()},1e3)},wa.removeAnalysisFromHash=function(){z.updateLayersInHash("remove","Get_Fires_Analysis")},wa.addWidgets=function(){var t,i,o,n,s,l,d=[];t=new D({map:wa.map,scalebarUnit:"metric"}),r.create("div",{id:"home-button","class":"home-button"},document.querySelector(".esriSimpleSliderIncrementButton"),"after"),s=new g({map:wa.map},"home-button"),s.startup();var c=new b({layers:[new v({url:"http://a.tiles.mapbox.com/v4/devseed.3100ad78/{level}/{col}/{row}.png?access_token=pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q",type:"WebTiledLayer"}),new v({url:"http://a.tiles.mapbox.com/v4/devseed.841fc333/{level}/{col}/{row}.png?access_token=pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q",type:"WebTiledLayer"})],id:"newBM",title:"WRI",thumbnailUrl:"app/images/devSeed.png"});d.push(c),l=new f({map:wa.map,basemaps:d,showArcGISBasemaps:!0},"basemap-gallery"),l.startup(),o=new w({map:wa.map,highlightLocation:!1},"location-widget"),o.startup(),i=new L({map:wa.map},"esri-geocoder-widget"),i.startup(),n=new I({map:wa.map,layerInfos:[],autoUpdate:!0},"legend"),n.startup();var p=function(){U.get("showBasemapGallery")&&U.set("showBasemapGallery",!1),U.get("showShareContainer")&&U.set("showShareContainer",!1),U.get("showAlertContainer")&&U.set("showAlertContainer",!1),U.set("showLocatorWidgets",!U.get("showLocatorWidgets"))},u=function(){U.get("showLocatorWidgets")&&U.set("showLocatorWidgets",!1),U.get("showShareContainer")&&U.set("showShareContainer",!1),U.get("showAlertContainer")&&U.set("showAlertContainer",!1),U.set("showBasemapGallery",!U.get("showBasemapGallery"))},m=function(){U.get("showLocatorWidgets")&&U.set("showLocatorWidgets",!1),U.get("showBasemapGallery")&&U.set("showBasemapGallery",!1),U.set("showShareContainer",!U.get("showShareContainer"))},y=function(){U.get("showLocatorWidgets")&&U.set("showLocatorWidgets",!1),U.get("showBasemapGallery")&&U.set("showBasemapGallery",!1),U.get("showShareContainer")&&U.set("showShareContainer",!1),U.set("showAlertContainer",!U.get("showAlertContainer"))},h=function(){U.set("showDrawTools",!1),$("#drawFeatures").css("background-color","#444"),U.set("showUploadTools",!U.get("showUploadTools")),U.get("showUploadTools")?$("#uploadFeatures").css("background-color","#e7002f"):$("#uploadFeatures").css("background-color","#444"),pa.isActive()&&pa.deactivateToolbar()},k=function(){U.set("showUploadTools",!1),$("#uploadFeatures").css("background-color","#444"),U.set("showDrawTools",!U.get("showDrawTools")),U.get("showDrawTools")?$("#drawFeatures").css("background-color","#e7002f"):$("#drawFeatures").css("background-color","#444")},S=function(){ua.updateHash({b:l.getSelected().title})};e(a.byId("locator-widget-button"),"click",p),e(a.byId("basemap-gallery-button"),"click",u),e(a.byId("share-button"),"click",m),e(a.byId("alert-button"),"click",y),e(a.byId("uploadFeatures"),"click",h),e(a.byId("drawFeatures"),"click",k),e(a.byId("uploadForm"),"change",ca.beginUpload.bind(ca)),l.on("selection-change",S),this.initTransparency()},wa.initTransparency=function(){["forest-transparency-slider","conservation-transparency-slider","land-cover-transparency-slider"].map(function(e){dijit.byId(e).set("value",70)})},wa.bindEvents=function(){var i=this;e(a.byId("dms-search"),"change",function(e){var a=e.target?e.target.checked:e.srcElement.checked;a&&(U.set("showDMSInputs",!0),U.set("showLatLongInputs",!1))}),e(a.byId("lat-long-search"),"change",function(e){var a=e.target?e.target.checked:e.srcElement.checked;a&&(U.set("showLatLongInputs",!0),U.set("showDMSInputs",!1))}),e(wa.map,"mouse-move",function(e){U.set("currentLatitude",e.mapPoint.getLatitude().toFixed(4)),U.set("currentLongitude",e.mapPoint.getLongitude().toFixed(4))}),e(wa.map,"click",function(e){J.selectTomnodFeatures(e)}),e(wa.map.graphics,"click",function(e){console.log(e),e.graphic&&J.selectUploadOrDrawnGraphics(e)}),e(V.byId("confidence-fires-checkbox"),"change",function(e){z.updateFiresLayer(!0);var a=z.updateOtherFiresLayers();a&&wa.setSmartRenderer(U.vm.smartRendererName()),e&&i.reportAnalyticsHelper("layer","option","The user toggled the Active Fires only show high confidence fires option on.")}),e(V.byId("twitter-conversations-checkbox"),"change",function(){var e=V.byId("twitter-conversations-checkbox").checked;z.toggleLayerVisibility(W.tweetLayer.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Twitter Conversations layer on.")}),e(V.byId("fire-stories-checkbox"),"change",function(){var e=V.byId("fire-stories-checkbox").checked;z.toggleLayerVisibility(W.fireStories.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Fire Stories layer on.")}),e(V.byId("fires-checkbox"),"change",function(){var e=V.byId("fires-checkbox").checked;if(z.toggleLayerVisibility(W.firesLayer.id,e),U.vm.showActiveFiresButtons(e),e)i.reportAnalyticsHelper("layer","toggle","The user toggled the Active Fires layer on.");else{U.vm.smartRendererName("Choose one");var a=wa.map.getLayer("firesClusters");a.hide();var t=wa.map.getLayer("newFires");t.hide(),$("#heatCircle").css("box-shadow","0 0 0 3px #ddd"),$("#clusterCircle").css("box-shadow","0 0 0 3px #ddd"),$("#hexCircle").css("box-shadow","0 0 0 3px #ddd")}}),e(V.byId("air-quality-checkbox"),"change",function(e){return z.toggleLayerVisibility(W.airQualityLayer.id,e),e?($("#airDate").datepicker("setDate","+0m +0d"),wa.map.getLayer(W.airQualityLayer.id).setVisibleLayers([0]),i.reportAnalyticsHelper("layer","toggle","The user toggled the Air Quality layer on."),U.vm.showReportOptionsAIR(!0),void 0):(U.vm.showReportOptionsAIR(!1),void 0)}),e(V.byId("tomnod-checkbox"),"change",function(e){z.toggleLayerVisibility(W.tomnodLayer.id,e),z.toggleLayerVisibility(W.tomnodLayer.sel_id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Tomnod layer on.")}),e(V.byId("indonesia-fires"),"change",function(e){console.log(e),z.toggleMapServiceLayerVisibility(wa.map.getLayer(W.indonesiaLayers.id),W.indonesiaLayers.layerIds.indonesiaFires,e)}),e(V.byId("noaa-fires-18"),"change",function(e){z.toggleMapServiceLayerVisibility(wa.map.getLayer(W.indonesiaLayers.id),W.indonesiaLayers.layerIds.noaa18,e)}),e(V.byId("burned-scars-checkbox"),"change",function(e){z.toggleLayerVisibility(W.burnScarLayer.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Burn Scars layer on.")}),e(V.byId("landsat-image-checkbox"),"change",function(){var e=V.byId("landsat-image-checkbox").checked;z.toggleLayerVisibility(W.landsat8.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Latest Landsat 8 Imagery layer on.")}),V.byId("windy-layer-checkbox").on("change",function(e){Q.toggleWindLayer(e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Wind direction layer on.")}),V.byId("digital-globe-checkbox").on("change",function(e){z.toggleDigitalGlobeLayer(e),U.vm.showReportOptionsDigitalGlobe(e),e&&(setTimeout(function(){dijit.byId("digital-globe-footprints-checkbox").set("value","true",!1)},0),i.reportAnalyticsHelper("layer","toggle","The user toggled the Digital Globe - First Look layer on."))}),V.byId("digital-globe-footprints-checkbox").on("change",function(e){z.toggleDigitalGlobeLayer(e,"footprints"),wa.updateImageryList()}),V.byId("provinces-checkbox").on("change",function(e){z.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Provinces overlay layer on.")}),V.byId("districts-checkbox").on("change",function(e){z.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Districts overlay layer on.")}),V.byId("subdistricts-checkbox").on("change",function(e){z.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Subdistricts overlay layer on.")}),V.byId("villages-checkbox").on("change",function(e){z.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Villages overlay layer on.")}),e(a.byId("search-option-go-button"),"click",function(){J.searchAreaByCoordinates(),i.reportAnalyticsHelper("widget","search","The user searched for location by latitude/longitude or Degrees/Minutes/Seconds.")}),e(a.byId("print-button"),"click",function(){i.printMap(),i.reportAnalyticsHelper("widget","print","The user clicked the print widget to print the map.")}),e(a.byId("report-link"),"click",function(){U.vm.showReportOptions(!0),U.vm.reportAOIs().length<1&&Z.populate_select(),i.reportAnalyticsHelper("widget","report","The user clicked Get Fires Analysis to generate an report with the latest analysis."),console.log("In hash");var e=ua.getHash();-1===e.lyrs.indexOf("Get_Fires_Analysis")&&(console.log("Changing hash"),z.updateLayersInHash("add","lyrs","Get_Fires_Analysis"))}),e(a.byId("noaa-fires-18"),"click",function(){if("false"==this.getAttribute("aria-checked")){var e=a.byId("indonesia-fires");return"false"==e.getAttribute("aria-checked")&&(wa.map.getLayer("IndonesiaFires").visible=!1,console.log("Should disable pop-ups")),U.vm.showReportOptionsNOAA(!1),void 0}U.vm.showReportOptionsNOAA(!0),Z.populate_select()}),e(a.byId("indonesia-fires"),"click",function(){if("false"==this.getAttribute("aria-checked")){var e=a.byId("noaa-fires-18");return"false"==e.getAttribute("aria-checked")&&(wa.map.getLayer("IndonesiaFires").visible=!1,console.log("Should disable pop-ups")),U.vm.showReportOptionsINDO(!1),void 0}U.vm.showReportOptionsINDO(!0),Z.populate_select()}),e(a.byId("windy-layer-checkbox"),"click",function(){return"false"==this.getAttribute("aria-checked")?(U.vm.showReportOptionsWIND(!1),void 0):(U.vm.showReportOptionsWIND(!0),Z.populate_select(),void 0)}),e(a.byId("updateNOAA"),"click",function(){var e=U.vm.noaaObservFrom(),a=U.vm.noaaObservTo(),t=$("#noaaDateFrom").datepicker("getDate"),r=$("#noaaDateTo").datepicker("getDate");a=moment(r).add(1,"day"),e=moment(t).tz("Asia/Jakarta").format("M/D/YYYY"),a=moment(a._d).tz("Asia/Jakarta").format("M/D/YYYY");var i=e.replace(/\//g,"-"),o=a.replace(/\//g,"-"),n=z.getTimeDefinition("Date",i,o);z.updateDynamicMapServiceLayerDefinition(wa.map.getLayer(W.indonesiaLayers.id),W.indonesiaLayers.layerIds.noaa18,n)}),e(a.byId("updateINDO"),"click",function(){var e=U.vm.indoObservFrom(),a=U.vm.indoObservTo(),t=$("#indoDateFrom").datepicker("getDate"),r=$("#indoDateTo").datepicker("getDate");a=moment(r).add(1,"day"),e=moment(t).tz("Asia/Jakarta").format("M/D/YYYY"),a=moment(a._d).tz("Asia/Jakarta").format("M/D/YYYY");var i=e.replace(/\//g,"-"),o=(a.replace(/\//g,"-"),z.getTimeDefinition("ACQ_DATE",i,a));V.byId("confidence-archive-checkbox").checked&&(o=[o,W.firesLayer.highConfidence].join(" AND ")),z.updateDynamicMapServiceLayerDefinition(wa.map.getLayer(W.indonesiaLayers.id),W.indonesiaLayers.layerIds.indonesiaFires,o)}),e(V.byId("confidence-archive-checkbox"),"change",function(e){console.log("confidence",e);var a=e?W.firesLayer.highConfidence:"",t=wa.map.getLayer(W.indonesiaLayers.id),r=W.indonesiaLayers.layerIds.indonesiaFires,i=t.layerDefinitions,o=i[r];if(e)var n=void 0!=o?[o,a].join(" AND "):a;else var n=o.replace(" AND "+W.firesLayer.highConfidence,a).replace(W.firesLayer.highConfidence,a);z.updateDynamicMapServiceLayerDefinition(wa.map.getLayer(W.indonesiaLayers.id),W.indonesiaLayers.layerIds.indonesiaFires,n)}),t(".smartRelative").forEach(function(a){e(a,"click",function(){var e=wa.map.getLayer("Active_Fires");if($("#heatCircle").css("box-shadow","0 0 0 3px #ddd"),$("#clusterCircle").css("box-shadow","0 0 0 3px #ddd"),$("#hexCircle").css("box-shadow","0 0 0 3px #ddd"),"hexCircle"==this.id&&"Hex bin"==U.vm.smartRendererName()||"clusterCircle"==this.id&&"Proportional symbols"==U.vm.smartRendererName()||"heatCircle"==this.id&&"Heat map"==U.vm.smartRendererName()){var a=wa.map.getLayer("newFires");a.hide();var t=wa.map.getLayer("firesClusters");return t.hide(),e.show(),U.vm.smartRendererName("Choose one"),void 0}if("heatCircle"==this.id)wa.setSmartRenderer("Heat map"),U.vm.smartRendererName("Heat map");else if("clusterCircle"==this.id)wa.setSmartRenderer("Proportional symbols"),U.vm.smartRendererName("Proportional symbols");else{if("hexCircle"!=this.id)return;wa.setSmartRenderer("Hex bin"),U.vm.smartRendererName("Hex bin")}$(this).css("box-shadow","0 0 0 3px #e98300"),e.hide()})}),e(a.byId("updateWIND"),"click",function(){var e=(U.vm.windObserv(),$("#windDate").datepicker("getDate")),a=moment(e).tz("Asia/Jakarta").format("MM/DD/YYYY"),t=U.vm.timeOfDay(),r=a.split("/"),i=r[2].toString()+r[0].toString()+r[1].toString();console.log(i);var o="http://suitability-mapper.s3.amazonaws.com/wind/archive/wind-surface-level-gfs-"+i+t+".1-0.gz.json";Q.deactivateWindLayer(),Q.activateWindLayer(o)}),e(a.byId("updateAIR"),"click",function(){var e=$("#airDate").datepicker("getDate"),a=new Date;if(a.setHours(0,0,0,0),e.getTime()==a.getTime()){var t=wa.map.getLayer(W.airQualityLayer.id);return t.setVisibleLayers([0]),void 0}var r=moment(e).format("YYYY/MM/DD"),i=moment(e).add("days",1).format("YYYY/MM/DD"),o=z.getTimeDefinition("dateUpdated",r,i);z.updateDynamicMapServiceLayerDefinition(wa.map.getLayer(W.airQualityLayer.id),1,o)}),e(a.byId("embedShare"),"click",function(){i.showEmbedCode()}),e(a.byId("clear-search-pins"),"click",this.clearSearchPins),e(a.byId("legend-widget-title"),"click",this.toggleLegend),V.byId("forest-transparency-slider").on("change",function(e){z.setTransparency(W.forestUseLayers.id,e)}),V.byId("land-cover-transparency-slider").on("change",function(e){z.setTransparency(W.landCoverLayers.id,e)}),V.byId("conservation-transparency-slider").on("change",function(e){z.setTransparency(W.conservationLayers.id,e)}),t(".active-fires-options").forEach(function(a){e(a,"click",i.toggleFireOption.bind(i))}),t(".esriPopupWrapper").forEach(function(t){r.create("div",{id:"close-icon","class":"close-icon"},t),e(a.byId("close-icon"),"click",function(){wa.map.infoWindow.hide(),$("#uploadCustomGraphic").length>0&&$("#uploadCustomGraphic").remove()})}),e(wa.map.infoWindow,"hide",function(){wa.map.infoWindow.clearFeatures()}),t("#forest-use-panel div.checkbox-container div input").forEach(function(e){o.add(e,"forest-use-layers-option")}),t("#conservation-panel div.checkbox-container div input").forEach(function(e){o.add(e,"conservation-layers-option")}),t("#land-cover-panel div.checkbox-container div input").forEach(function(e){"land-cover-radios"===e.name&&o.add(e,"land-cover-layers-option")}),t("#forest-use-panel div.checkbox-container div input").forEach(function(a){e(a,"change",function(e){z.updateAdditionalVisibleLayers("forest-use-layers-option",W.forestUseLayers);var a=e.target?e.target:e.srcElement;a.checked})}),t(".conservation-layers-option").forEach(function(a){e(a,"change",function(e){z.updateAdditionalVisibleLayers("conservation-layers-option",W.conservationLayers);var a=e.target?e.target:e.srcElement;a.checked})}),t(".land-cover-layers-option").forEach(function(a){e(a,"change",function(e){z.updateLandCoverLayers(e);var a=e.target?e.target:e.srcElement;if(a.checked){var r=t("#land-cover-panel .dijitChecked")[0].parentNode.children[1];if(r.innerHTML.length>0){var o=r.innerHTML;-1===o.search("None")&&i.reportAnalyticsHelper("layer","toggle","The user toggled the "+o+" layer on")}}})}),t("#primary-forests-options input").forEach(function(a){e(a,"change",function(e){z.updatePrimaryForestsLayer(!0);var a=e.target?e.target:e.srcElement;if(a.checked&&a.labels.length>0){var t=a.labels[0].innerHTML;-1===t.search("Primary")&&(t="Primary Forests "+t),i.reportAnalyticsHelper("layer","toggle","The user toggled the "+t+" layer on")}})})},wa.addLayers=function(){var a,t,r,i,o,s,l,d,c,p,u,m,y,g,h,f,b,v,w=this;a=new A,a.format="png32",a.layerIds=W.conservationLayers.defaultLayers,a.layerOption=A.LAYER_OPTION_SHOW,t=new k(W.conservationLayers.url,{imageParameters:a,id:W.conservationLayers.id,visible:!1}),indonesiaParams=new A,indonesiaParams.format="png32",indonesiaParams.layerIds=W.indonesiaLayers.defaultLayers,indonesiaParams.layerOption=A.LAYER_OPTION_SHOW,indonesiaLayer=new k(W.indonesiaLayers.url,{imageParameters:indonesiaParams,id:W.indonesiaLayers.id,visible:!1}),s=new A,s.format="png32",s.layerIds=W.landCoverLayers.defaultLayers,s.layerOption=A.LAYER_OPTION_SHOW,l=new k(W.landCoverLayers.url,{imageParameters:s,id:W.landCoverLayers.id,visible:!1}),c=new A,c.format="png32",c.layerIds=W.forestUseLayers.defaultLayers,c.layerOption=A.LAYER_OPTION_SHOW,p=new k(W.forestUseLayers.url,{imageParameters:c,id:W.forestUseLayers.id,visible:!1}),u=new S(W.treeCoverLayer.url,{id:W.treeCoverLayer.id,visible:!1}),r=new A,r.format="png32",r.layerIds=W.primaryForestsLayer.defaultLayers,r.layerOption=A.LAYER_OPTION_SHOW,i=new k(W.primaryForestsLayer.url,{imageParameters:r,id:W.primaryForestsLayer.id,visible:!1}),h=new S(W.landsat8.url,{id:W.landsat8.id,visible:!1}),v=W.digitalGlobe,o=v.imageServices.map(function(e){return new S(e.url,{id:e.id,visible:!1})}),dglyrs=o,m=new k(W.overlaysLayer.url,{id:W.overlaysLayer.id,visible:!1}),d=new k(W.airQualityLayer.url,{id:W.airQualityLayer.id,visible:!1}),tomnodParams=new A,tomnodParams.layerIds=W.tomnodLayer.defaultLayers,tomnodParams.layerOption=A.LAYER_OPTION_SHOW,g=new k(W.tomnodLayer.url,{imageParameters:tomnodParams,id:W.tomnodLayer.id,visible:!1});var L=new _("${name}",J.getTomnodInfoWindow),I=new x(W.tomnodLayer.url+"/"+W.tomnodLayer.defaultLayers[0],{mode:x.MODE_SELECTION,infoTemplate:L,outFields:["*"],id:W.tomnodLayer.sel_id}),D=new x(W.firesLayer.smartURL,{mode:x.MODE_ONDEMAND,id:"newFires",visible:!1,outFields:"*"}),C=new N("circle",9,new G(G.STYLE_SOLID,new j([255,255,255,1]),1),new j([254,182,62,1])),T=(new N("circle",16,new G(G.STYLE_SOLID,new j([102,0,0,.85]),3),new j([255,255,255,1])),new q({url:W.firesLayer.smartURL,distance:95,id:"firesClusters",labelColor:"#fff",resolution:wa.map.extent.getWidth()/wa.map.width,singleSymbol:C,useDefaultSymbol:!1,zoomOnClick:!0,showSingles:!0,visible:!1,objectIdField:"FID",outFields:["ACQ_DATE","CONFIDENCE","BRIGHTNESS"]}));T.on("clusters-shown",function(){var e=new Date;if(!map.clusterDataOnce&&this._clusterData.length>0){var e=new Date,a=e.setDate(e.getDate()-3),t=e.setDate(e.getDate()-2),r=e.setDate(e.getDate()-1);map.clusterData={},map.clusterData.fullData=this._clusterData,map.clusterData.past72=this._clusterData.filter(function(e){return e.attributes.ACQ_DATE<a}),map.clusterData.past48=this._clusterData.filter(function(e){return e.attributes.ACQ_DATE<t}),map.clusterData.past24=this._clusterData.filter(function(e){return e.attributes.ACQ_DATE<r}),map.clusterData.highConfidence=this._clusterData.filter(function(e){return e.attributes.CONFIDENCE>=30&&e.attributes.BRIGHTNESS>=330}),map.clusterData.highConfidencepast72=this._clusterData.filter(function(e){return e.attributes.ACQ_DATE<a&&e.attributes.CONFIDENCE>=30&&e.attributes.BRIGHTNESS>=330}),map.clusterData.highConfidencepast48=this._clusterData.filter(function(e){return e.attributes.ACQ_DATE<t&&e.attributes.CONFIDENCE>=30&&e.attributes.BRIGHTNESS>=330}),map.clusterData.highConfidencepast24=this._clusterData.filter(function(e){return e.attributes.ACQ_DATE<r&&e.attributes.CONFIDENCE>=30&&e.attributes.BRIGHTNESS>=330}),map.clusterDataOnce=!0}});var E=new B(C,"clusterCount"),O=new N("circle",10,new G(G.STYLE_SOLID,new j([212,116,60,.5]),15),new j([212,116,60,.75])),P=new N("circle",25,new G(G.STYLE_SOLID,new j([178,70,37,.5]),15),new j([178,70,37,.75])),H=new N("circle",35,new G(G.STYLE_SOLID,new j([144,24,13,.5]),15),new j([144,24,13,.75])),M=new N("circle",55,new G(G.STYLE_SOLID,new j([102,0,0,.5]),15),new j([102,0,0,.75]));E.addBreak(2,50,O),E.addBreak(50,250,P),E.addBreak(250,1e3,H),E.addBreak(1e3,5e4,M),T.setRenderer(E),y=new da(W.burnScarLayer.url,W.burnScarLayer.id),f=new A,f.format="png32",f.layerIds=W.firesLayer.defaultLayers,f.layerOption=A.LAYER_OPTION_SHOW,b=new k(W.firesLayer.url,{imageParameters:f,id:W.firesLayer.id,visible:!1}),tweetLayer=new x(W.tweetLayer.url,{mode:x.MODE_ONDEMAND,id:W.tweetLayer.id,visible:!1,outFields:["*"]});new F({title:"{Title}",fieldInfos:[{fieldName:"Date",label:"Date",format:{dateFormat:"shortDate"},visible:!0},{fieldName:"Details",label:"Details",visible:!0},{fieldName:"Video",label:"Video",visible:!0},{fieldName:"Name",label:"Name",visible:!0}],showAttachments:!0});fireStories=new x(W.fireStories.url,{mode:x.MODE_ONDEMAND,id:W.fireStories.id,visible:!1,outFields:["*"],hasAttachments:!0,definitionExpression:"Publish = 'Y'"});var $={layerDefinition:{geometryType:"esriGeometryPolygon",fields:[]},featureSet:null},U=new x($,{id:W.digitalGlobe.graphicsLayerId,visible:!1}),Q=new ma($,{id:W.digitalGlobe.graphicsLayerHighlight,visible:!0}),Z=new R(ka);Q.setRenderer(Z),Y.createHeatmapRenderer({layer:D,blurRadius:5,basemap:wa.map.getBasemap()}).then(function(e){var a=wa.map.getLayer("newFires");a.setRenderer(e.renderer)}),dglyr=U;var X=[u,l,i,U,Q].concat(o).concat([t,y,g,p,m,tweetLayer,fireStories,d,I,D,T,indonesiaLayer,b]);e.once(wa.map,"layers-add-result",function(e){w.enableLayersFromHash();var a=n.map(e.layers,function(e){return{layer:e.layer}});a=n.filter(a,function(e){"firesClusters"===e.layer.id&&(e.title="Heat Map");var a=e.layer.url?e.layer.url.search("ImageServer")<0:!1,t=!(e.layer.id===I.id);return a&&t}),fa.hideLoader("map-blocker"),V.byId("legend").refresh(a)}),wa.map.addLayers(X),wa.map.addLayer(h),m.on("load",z.setOverlayLayerOrder),y.on("error",this.layerAddError),h.on("error",this.layerAddError),u.on("error",this.layerAddError),i.on("error",this.layerAddError),t.on("error",this.layerAddError),l.on("error",this.layerAddError),m.on("error",this.layerAddError),p.on("error",this.layerAddError),b.on("error",this.layerAddError),T.on("error",this.layerAddError),fireStories.on("error",this.layerAddError),d.on("error",this.layerAddError),h.on("load",function(){wa.map.reorderLayer(h,1)})},wa.layerAddError=function(e){require(["modules/ErrorController"],function(a){a.show(10,"Error adding Layer : <br> "+e.target.url)})},wa.removeCustomFeatures=function(){wa.map.graphics.clear(),U.vm.customFeaturesArray([]),U.vm.customFeaturesPresence(!1)},wa.toggleFireOption=function(e){var a=e.target?e.target:e.srcElement;t(".selected-fire-option").forEach(function(e){o.remove(e,"selected-fire-option")}),o.add(a,"selected-fire-option"),z.updateFiresLayer();var r=z.updateOtherFiresLayers();
r&&wa.setSmartRenderer(U.vm.smartRendererName())},wa.enableLayersFromHash=function(){function t(){V.byId("fires-checkbox").set("checked",!0),z.updateLayersInHash("add",W.firesLayer.id,W.firesLayer.id)}function r(t,r){if(void 0!==t&&""!==t)if(void 0===r)p[t]&&(o=p[t].id,V.byId(o)&&(V.byId(o).set("checked",!0),e.emit(a.byId(o),"change",{})));else{n=p[t],s=r.split(",");for(var i=0,l=s.length;l>i;i++)if(o=n[s[i]].id,"[object Array]"===Object.prototype.toString.call(o))for(var d=0,c=o.length;c>d;d++)V.byId(o[d])&&(V.byId(o[d]).set("checked",!0),e.emit(a.byId(o[d]),"change",{}));else V.byId(o)&&(V.byId(o).set("checked",!0),e.emit(a.byId(o),"change",{}))}}var i,o,n,s,l=ua.getHash(),d=l.lyrs,c=d.split(":"),p=W.layersCheckboxes;if(void 0===d)return t(),void 0;if(1===c.length&&""===c[0])return t(),void 0;for(var u=0,m=c.length;m>u;u++)i=c[u].split("/"),r(i[0],i[1]);var y=ua.getHash();y.lyrs.indexOf("Get_Fires_Analysis")>-1&&(console.log("Updating from hash"),$("#report-link").click())},wa.clearSearchPins=function(){wa.map.graphics.clear(),U.set("showClearPinsOption",!1)},wa.toggleLegend=function(){var e=a.byId("legend-widget-container"),t=e.offsetHeight-2===280?30:280;s.animateProperty({node:e,properties:{height:t},duration:500}).play(),30===t?o.add("legend-widget-title","legend-closed"):o.remove("legend-widget-title","legend-closed")},wa.printMap=function(){var a=document.getElementsByTagName("body")[0];o.add("print-button","loading"),o.add(a,"map-view-print"),V.byId("stackContainer").resize(),V.byId("mapView").resize(),wa.map.resize(),e.once(wa.map,"resize",function(){setTimeout(function(){window.print(),o.remove("print-button","loading"),o.remove(a,"map-view-print"),wa.map.resize(),setTimeout(function(){V.byId("stackContainer").resize()},1e3)},2e3)})},wa.reportAnalyticsHelper=function(e,a,t){ga("A.send","event",e,a,t),ga("B.send","event",e,a,t),ga("C.send","event",e,a,t)},wa.showEmbedCode=function(){V.byId("embedCodeShareDialog")&&V.byId("embedCodeShareDialog").destroy();var e,t="<iframe src='"+window.location+"' height='600' width='900'></iframe>",r=new ha({title:"Embed Code",style:"width: 350px",id:"embedCodeShareDialog",content:'Copy the code below to embed in your site. (Ctrl+C on PC and Cmd+C on Mac)<div class=\'dijitDialogPaneActionBar\'><input id="embedInput" type="text" value="'+t+'" autofocus /></div>'});e=function(){r.destroy()},r.show(),a.byId("embedInput").select(),r.on("cancel",function(){e()}),va.sendPageview("/"+window.location.href.split("#")[1],"map")},wa});