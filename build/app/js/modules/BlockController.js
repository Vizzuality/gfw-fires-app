define(["dojo/dom-construct","dojo/dom-class","dojo/dom"],function(o,d,c){var n={},e={"class":"blocker"},t={};return n.show=function(d){t[d]=o.create("div",e,c.byId(d))},n.hide=function(d){o.destroy(t[d])},n});