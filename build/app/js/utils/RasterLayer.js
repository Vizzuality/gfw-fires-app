/*! Global-Forest-Watch-Fires Mon Dec 15 2014 10:23:58 */
define(["dojo/_base/declare","dojo/_base/connect","dojo/_base/array","dojo/dom-construct","dojo/dom-style","dojo/number","esri/lang","esri/domUtils","esri/SpatialReference","esri/geometry/Point","esri/layers/layer"],function(a,b,c,d,e,f,g,h,i,j,k){var l=a([k],{"-chains-":{constructor:"manual"},constructor:function(a,b){this.inherited(arguments,["http://some.server.com/path",b]),this.data=a,this.loaded=!0,this.onLoad(this)},_setMap:function(a,c){this._map=a;var f=this._element=d.create("canvas",{id:"canvas",width:a.width+"px",height:a.height+"px",style:"position: absolute; left: 0px; top: 0px;"},c);return g.isDefined(this.opacity)&&e.set(f,"opacity",this.opacity),this._context=f.getContext("2d"),this._context||console.error("This browser does not support <canvas> elements."),this._mapWidth=a.width,this._mapHeight=a.height,this._connects=[],this._connects.push(b.connect(a,"onPan",this,this._panHandler)),this._connects.push(b.connect(a,"onExtentChange",this,this._extentChangeHandler)),this._connects.push(b.connect(a,"onZoomStart",this,this.clear)),this._connects.push(b.connect(this,"onVisibilityChange",this,this._visibilityChangeHandler)),f},_unsetMap:function(a,d){c.forEach(this._connects,b.disconnect,this),this._element&&d.removeChild(this._element),this._map=this._element=this._context=this.data=this._connects=null},refresh:function(){!this._canDraw()},clear:function(){this._canDraw()&&this._context.clearRect(0,0,this._mapWidth,this._mapHeight)},_canDraw:function(){return this._map&&this._element&&this._context?!0:!1},_panHandler:function(a,b){e.set(this._element,{left:b.x+"px",top:b.y+"px"})},_extentChangeHandler:function(a,b,c){c||(e.set(this._element,{left:"0px",top:"0px"}),this.clear())},_visibilityChangeHandler:function(a){a?h.show(this._element):h.hide(this._element)}});return l});