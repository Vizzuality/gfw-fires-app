define(["dojo/dom","dojo/_base/array","dijit/registry","dojo/Deferred","dijit/layout/AccordionContainer","dijit/layout/ContentPane","dijit/form/HorizontalSlider"],function(i,o,r,n,e,t,d){return{buildFromJSON:function(i){var r;switch(i.type){case"accordion":r=new e(i.props,i.id),i.hasOwnProperty("children")&&o.forEach(i.children,function(i){r.addChild(new t(i.props,i.id))}),r.startup(),r.resize();break;case"contentpane":r=new t(i.props,i.id);break;case"horizontal-slider":r=new d(i.props,i.id)}},buildDijits:function(i){var r=this;o.forEach(i,function(i){r.buildFromJSON(i)})}}});