/*! Global-Forest-Watch-Fires Tue Jul 22 2014 16:30:35 */
define(["dojo/dom","dojo/ready","dojo/Deferred","dojo/dom-style","dojo/dom-class","dijit/registry","dojo/promise/all","dojo/_base/array","esri/map","esri/Color","esri/config","esri/layers/ImageParameters","esri/layers/ArcGISDynamicMapServiceLayer","esri/symbols/SimpleFillSymbol","esri/tasks/AlgorithmicColorRamp","esri/tasks/ClassBreaksDefinition","esri/tasks/GenerateRendererParameters","esri/layers/LayerDrawingOptions","esri/tasks/GenerateRendererTask","esri/tasks/query","esri/tasks/QueryTask","views/map/MapConfig","esri/request","libs/highcharts"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){var x={zoom:5,basemap:"gray",slider:!1,mapcenter:[100,-1.2],adminBoundary:{url:"http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer",id:"district-bounds",defaultLayers:[2],layerId:2,where:"fire_count > 0",classBreaksField:"fire_count",classBreaksMethod:"natural-breaks",breakCount:5,fromHex:"#fcddd1",toHex:"#930016"},queryUrl:"http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer",companyConcessionsId:1,confidenceFireId:0,dailyFiresId:5};return w.setRequestPreCallback(function(a){return console.log(a.url,a.content),a.content&&a.content.dynamicLayers,a}),{init:function(){var a=this,c=v.proxies,d=document.location.href,e="/proxy/proxy.ashx";for(var f in c)0==d.indexOf(f)&&(e=c[f]);k.defaults.io.proxyUrl=e,Highcharts.setOptions({chart:{style:{fontFamily:"Arial MT Condensed Light"}}}),b(function(){g([a.buildFiresMap(),a.buildDistrictFiresMap(),a.queryDistrictsForFires(),a.queryCompanyConcessions(),a.queryForPeatFires(),a.queryForSumatraFires(),a.queryForDailyFireData()]).then(function(){a.printReport()})})},buildFiresMap:function(){var a,b,d,e=new c;return d=new i("simple-fires-map",{basemap:x.basemap,zoom:x.zoom,center:x.mapcenter,slider:x.slider}),a=new l,a.format="png32",a.layerIds=v.firesLayer.defaultLayers,a.layerOption=l.LAYER_OPTION_SHOW,b=new m(v.firesLayer.url,{imageParameters:a,id:v.firesLayer.id,visible:!0}),d.addLayer(b),d.on("load",function(){d.disableMapNavigation()}),b.on("load",function(){e.resolve(!0)}),e.promise},buildDistrictFiresMap:function(){function b(b){var c="<table>";h.forEach(b,function(a){c+="<tr><td class='legend-swatch' style='background-color: rgb("+a.symbol.color.r+","+a.symbol.color.g+","+a.symbol.color.b+");'></td>",c+="<td class='legend-label'>"+a.minValue+" - "+a.maxValue+"</td></tr>"}),c+="</table>",a.byId("legend").innerHTML=c}function d(){u=new s(z.url+"/"+z.layerId),u.execute(g,function(a){b(a.infos),v=new r,v.renderer=a,A[z.layerId]=v,f.setLayerDrawingOptions(A),f.on("update-end",function(){y.resolve(!0)})},function(){y.resolve(!1)})}var e,f,g,k,t,u,v,w,y=new c,z=x.adminBoundary,A=[];return w=new i("district-fires-map",{basemap:x.basemap,zoom:x.zoom,center:x.mapcenter,slider:x.slider}),e=new l,e.format="png32",e.layerIds=z.defaultLayers,e.layerOption=l.LAYER_OPTION_SHOW,f=new m(z.url,{imageParameters:e,id:z.id,visible:!0}),t=new p,t.classificationField=z.classBreaksField,t.classificationMethod=z.classBreaksMethod,t.breakCount=z.breakCount,t.baseSymbol=new n,k=new o,k.fromColor=j.fromHex(z.fromHex),k.toColor=j.fromHex(z.toHex),k.algorithm="cie-lab",t.colorRamp=k,g=new q,g.classificationDefinition=t,g.where=z.where,f.on("load",d),w.addLayer(f),w.on("load",function(){w.disableMapNavigation()}),y.promise},queryDistrictsForFires:function(){function b(a){var b="<table class='fires-table'><tr><th>DISTRICT</th><th>PROVINCE</th><th>NUMBER OF FIRE ALERTS</th></tr>";return b+=h.generateTableRows(a,e),b+="</table>"}var d=new u(x.adminBoundary.url+"/"+x.adminBoundary.layerId),e=["NAME_2","NAME_1","fire_count"],f=new c,g=new t,h=this;return g.where="1 = 1",g.returnGeometry=!1,g.outFields=e,g.orderByFields=["fire_count DESC"],d.execute(g,function(c){c.features.length>0&&(a.byId("district-fires-table").innerHTML=b(c.features.slice(0,10)),f.resolve(!0))},function(){f.resolve(!1)}),f.promise},queryCompanyConcessions:function(){function b(b,c,d){var e="<table class='fires-table'><tr><th>NAME</th><th>NUMBER OF FIRE ALERTS</th></tr>",g=e+n.generateTableRows(b,f.slice(0,2))+"</table>",h=e+n.generateTableRows(c,f.slice(0,2))+"</table>",i=e+n.generateTableRows(d,f.slice(0,2))+"</table>",j="There are no fire alerts in pulpwood concessions in the last 7 days.",k="There are no fire alerts in palm oil concessions in the last 7 days.",l="There are no fire alerts in logging concessions in the last 7 days.";a.byId("pulpwood-fires-table").innerHTML=b.length>0?g:'<div class="noFiresTable">'+j+"</div>",a.byId("palmoil-fires-table").innerHTML=c.length>0?h:'<div class="noFiresTable">'+k+"</div>",a.byId("logging-fires-table").innerHTML=d.length>0?i:'<div class="noFiresTable">'+l+"</div>"}var d,e=new u(x.queryUrl+"/"+x.companyConcessionsId),f=["Name","fire_count","TYPE"],g=new c,i=new t,j=new Date,k=[],l=[],m=[],n=this;return j=new Date(j.getFullYear(),j.getMonth(),j.getDate()-7),dateString=j.getFullYear()+"-"+(j.getMonth()+1)+"-"+(j.getDate()-7)+" "+j.getHours()+":"+j.getMinutes()+":"+j.getSeconds(),i.where="fire_count IS NOT NULL",i.returnGeometry=!1,i.outFields=f,i.orderByFields=["fire_count DESC"],e.execute(i,function(a){h.every(a.features,function(a){return d=a.attributes.TYPE,"Oil palm concession"===d&&m.length<10?m.push(a):"Wood fiber plantation"===d&&k.length<10?k.push(a):"Logging concession"===d&&l.length<10&&l.push(a),!(m.length>9&&k.length>9&&l.length>9)}),m=h.filter(m,function(a){return 0!==a.attributes.fire_count}),k=h.filter(k,function(a){return 0!==a.attributes.fire_count}),l=h.filter(l,function(a){return 0!==a.attributes.fire_count}),b(k,m,l),g.resolve(!0)},function(){g.resolve(!1)}),g.promise},queryForPeatFires:function(){var a,b,d,e=new c,f=[],g=this,i=function(c){b=c.features.length,a=0,d=0,h.forEach(c.features,function(b){1===b.attributes.peat?d++:a++}),f.push({color:"rgba(184,0,18,1)",name:"Peat",visible:!0,y:d}),f.push({color:"rgba(17,139,187,1)",name:"Non-peat",visible:!0,y:a}),g.buildPieChart("peat-fires-chart",{data:f,name:"Peat Fires",labelDistance:-25,total:b}),e.resolve(!0)},j=function(){e.resolve(!1)};return g.queryFireData({outFields:["peat"]},i,j),e.promise},queryForSumatraFires:function(){var a,b,d,e,f,g,i,j,k=new c,l=[],m=[],n=this;return g=function(c){j=c.features.length,a=0,b=0,d=0,e=0,f=0,h.forEach(c.features,function(c){1===c.attributes.wdpa?a++:b++,1===c.attributes.logging&&f++,1===c.attributes.palm_oil&&e++,1===c.attributes.pulpwood&&d++}),l.push({color:"rgba(184,0,18,1)",name:"In Protected Areas",visible:!0,y:a}),l.push({color:"rgba(17,139,187,1)",name:"Outside Protected Areas",visible:!0,y:b}),n.buildPieChart("protected-areas-fires-chart",{data:l,name:"Protected Area Fires",labelDistance:-30,total:j}),m.push({color:"rgba(17,139,187,1)",name:"Pulpwood Plantations",visible:!0,y:d}),m.push({color:"rgba(184,0,18,1)",name:"Palm Oil Concessions",visible:!0,y:e}),m.push({color:"rgba(106,0,78,1)",name:"Logging Concessions",visible:!0,y:f}),m.push({color:"rgba(233,153,39,1)",name:"Outside Concessions",visible:!0,y:j-(f+e+d)}),n.buildPieChart("land-use-fires-chart",{data:m,name:"Fires in Concessions",labelDistance:30,total:j}),k.resolve(!0)},i=function(){k.resolve(!1)},n.queryFireData({outFields:["wdpa","pulpwood","palm_oil","logging"],where:"sumatra = 1"},g,i),k.promise},queryForDailyFireData:function(){var a,b,d=new u(x.queryUrl+"/"+x.dailyFiresId),e=new c,f=new t,g=[],i=[];return f.returnGeometry=!1,f.where="1 = 1",f.outFields=["Count, Date"],a=function(a){h.forEach(a.features,function(a){g.push(a.attributes.Date),i.push(a.attributes.Count)}),$("#fire-line-chart").highcharts({chart:{zoomType:"x"},title:{text:null},subtitle:{text:void 0===document.ontouchstart?"Click and drag in the plot area to zoom in":"Pinch the chart to zoom in"},plotOptions:{line:{marker:{enabled:!1}}},xAxis:{categories:g,minTickInterval:20,minRange:30,labels:{rotation:-45}},yAxis:{title:{text:null},plotLines:[{value:0,width:1,color:"#a90016"}]},tooltip:{valueSuffix:""},credits:{enabled:!1},legend:{enabled:!1},series:[{name:"Daily Fires",data:i,color:"#f49f2d"}]})},b=function(a){console.dir(a)},d.execute(f,a,b),e.resolve(!0),e.promise},queryFireData:function(a,b,d){var e,f=new u(x.queryUrl+"/"+x.confidenceFireId),g=(new c,new t),h=new Date;h=new Date(h.getFullYear(),h.getMonth(),h.getDate()-7),e=h.getFullYear()+"-"+(h.getMonth()+1)+"-"+h.getDate()+" "+h.getHours()+":"+h.getMinutes()+":"+h.getSeconds(),g.where=void 0===a.where?"ACQ_DATE > date '"+e+"'":"ACQ_DATE > date '"+e+"' AND "+a.where,g.returnGeometry=a.returnGeometry||!1,g.outFields=a.outFields||["*"],f.execute(g,b,d)},buildPieChart:function(a,b){$("#"+a).highcharts({chart:{type:"pie"},title:{text:null},yAxis:{title:{text:null}},plotOptions:{pie:{shadow:!1,center:["50%","50%"],showInLegend:!0,dataLabels:{fontSize:"22px"}}},tooltip:{formatter:function(){return Math.round(this.y/b.total*100)+"% ("+this.y+" fires)"}},credits:{enabled:!1},legend:{layout:"vertical"},series:[{name:b.name,data:b.data,size:"80%",innerSize:"50%",dataLabels:{distance:b.labelDistance,color:"black",formatter:function(){return Math.round(this.y/b.total*100)+"%"}}}]})},generateTableRows:function(a,b){function c(a){return null!==a&&void 0!==a}var d="";return h.forEach(a,function(a){d+="<tr>",h.forEach(b,function(b){d+="<td>"+(c(a.attributes[b])?a.attributes[b]:" - ")+"</td>"}),d+="</tr>"}),d},printReport:function(){}}});