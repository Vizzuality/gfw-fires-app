define(["dojo/topic"],function(e){var o={};o.events={startModeAnim:"startModeAnim",stopModeAnmin:"stopModeAnmin",modeSelect:"modeSelect",createUI:"createUI",toggleDataNavList:"toggleDataNavList",toggleAboutNavList:"toggleAboutNavList",clickNavLink:"clickNavLink",switchToView:"switchToView",footerSelect:"footerSelect",goToBlog:"goToBlog",goToMap:"goToMap",goToTweet:"goToTweet"};for(var t in o.events)o[t]=function(o){return function(t){e.publish(o,t)}}(t);return e.subscribe("clickNavLink",function(e){console.log(e),require(["views/header/HeaderController"],function(o){o.clickNavLink(e)})}),e.subscribe("switchToView",function(e){console.log(e),require(["views/header/HeaderController"],function(o){o.switchToView(e)})}),e.subscribe("startModeAnim",function(){require(["views/home/HomeController"],function(e){e.startModeAnim()})}),e.subscribe("stopModeAnmin",function(){require(["views/home/HomeController"],function(e){e.stopModeAnmin()})}),e.subscribe("modeSelect",function(e){require(["views/home/HomeController"],function(o){o.modeSelect(e)})}),e.subscribe("footerSelect",function(e){require(["views/footer/FooterController"],function(o){o.footerSelect(e)})}),e.subscribe("goToBlog",function(){require(["views/header/HeaderController"],function(e){e.switchToView({viewName:"blogView"}),e.clickNavLink({viewId:"blog"})})}),e.subscribe("goToMap",function(){require(["views/header/HeaderController"],function(e){e.switchToView({viewName:"mapView"}),e.clickNavLink({viewId:"map"})})}),e.subscribe("goToTweet",function(e){require(["views/footer/FooterController"],function(o){o.goToTweet(e)})}),e.subscribe("toggleDataNavList",function(e){require(["views/data/DataController"],function(o){o.toggleDataNavList(e)})}),e.subscribe("toggleAboutNavList",function(e){require(["views/about/AboutController"],function(o){o.toggleAboutNavList(e)})}),o});