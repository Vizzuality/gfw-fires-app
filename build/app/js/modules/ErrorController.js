define(["dojo/dom-construct","dojo/dom-class","dojo/_base/window"],function(e,i,n){var o,d={},r="There was an error. Please try later",t={innerHTML:r,"class":"errorMsg dijitHidden"},s=!1;return d.init=function(){o=e.create("div",t,n.body()),console.log(o)},d.show=function(e,n){var d=this;i.remove(o,"dijitHidden"),s=!0;var t=1e3*e;o.innerHTML=n&&n.length>0?n:r,0!==e&&setTimeout(function(){d.hide()},t)},d.hide=function(){i.add(o,"dijitHidden")},d});