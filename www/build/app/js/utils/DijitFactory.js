define(["dojo/dom","dojo/_base/array","dijit/registry","dojo/Deferred","dijit/layout/AccordionContainer","dijit/layout/ContentPane","dijit/form/HorizontalSlider","dijit/form/CheckBox","dijit/form/RadioButton"],function(i,o,r,e,n,d,t,a,c){return{buildFromJSON:function(i){var r;switch(i.type){case"accordion":r=new n(i.props,i.id),i.hasOwnProperty("children")&&o.forEach(i.children,function(i){r.addChild(new d(i.props,i.id))}),r.startup(),r.resize();break;case"contentpane":r=new d(i.props,i.id);break;case"horizontal-slider":r=new t(i.props,i.id);break;case"radio":r=new c(i.props,i.id);break;case"checkbox":r=new a(i.props,i.id)}},buildDijits:function(i){var r=this;o.forEach(i,function(i){r.buildFromJSON(i)})}}});