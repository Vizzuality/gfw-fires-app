define(["dojo/dom","dojo/dom-construct","views/map/MapConfig"],function(e,r){return{showLoader:function(t,i){if(e.byId(i)&&r.destroy(i),e.byId(t)){{var a=r.create("div",{id:i,"class":"loadingWheelContainer"},t,"first");r.create("img",{"class":"loadingWheel",src:"app/images/loader.gif"},a,"first")}return!0}return!1},hideLoader:function(t){return e.byId(t)?(r.destroy(t),!0):!1},nextAvailableGraphicId:function(e,r){var t,i=e.graphics,a=i.length,n=0,o=0;for(n;a>n;n+=1)"point"!==i[n].geometry.type&&i[n].attributes&&(t=parseInt(i[n].attributes[r]),isNaN(t)||(o=t>o?t:o));return o+1}}});