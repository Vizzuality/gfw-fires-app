define(["dojo/dom","dijit/registry","modules/HashController","modules/EventsController","views/footer/FooterModel","dojo/_base/array"],function(dom,registry,HashController,EventsController,FooterModel,arrayUtil){var o={},initialized=!1,viewName="app-footer";return o.init=function(){var e=this;initialized||(initialized=!0,require(["dojo/text!views/footer/footer.html","views/footer/FooterModel"],function(t,o){dom.byId(viewName).innerHTML=t,e.initShareButton(),o.applyBindings(viewName)}))},o.initShareButton=function(){!function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://apis.google.com/js/plusone.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(),function(e,t,o){var n,r=e.getElementsByTagName(t)[0];e.getElementById(o)||(n=e.createElement(t),n.id=o,n.src="//connect.facebook.net/en_US/all.js#xfbml=1&version=v2.0",r.parentNode.insertBefore(n,r))}(document,"script","facebook-jssdk"),!function(e,t,o){var n,r=e.getElementsByTagName(t)[0];e.getElementById(o)||(n=e.createElement(t),n.id=o,n.src="https://platform.twitter.com/widgets.js",r.parentNode.insertBefore(n,r))}(document,"script","twitter-wjs")},o.footerSelect=function(data){console.log(data);var selectedItem=data;console.log(EventsController),eval("EventsController."+selectedItem.eventName+"()")},o});