define(["dojo/dom","dijit/registry","modules/HashController","esri/urlUtils","views/map/MapConfig","modules/EventsController","views/blog/BlogModel","dojo/Deferred","dojo/_base/array"],function(i,o,r,t,e,n,s,l,a){var u={},h=!1,p="blogView",d={viewId:p,viewName:"blog"};return u.addConfigurations=function(){var i=e.proxies,o=document.location.href,r="/proxy/proxy.ashx";for(var t in i)0===o.indexOf(t)&&(r=i[t]);esri.config.defaults.io.proxyUrl=r,esri.config.defaults.io.corsEnabledServers.push("http://gis-potico.wri.org"),esri.config.defaults.io.corsEnabledServers.push("http://175.41.139.43")},u.init=function(){u.addConfigurations();return h?void n.switchToView(d):(h=!0,void require(["dojo/text!views/blog/blog.html"],function(o){var r=u.loadFeed(esri.config.defaults.io.proxyUrl);r.then(function(r){var t=JSON.parse(r);u.addPosts(t),i.byId(p).innerHTML=o,n.switchToView(d),s.applyBindings(p)},function(){console.log("There was an error in binding")})}))},u.loadFeed=function(i){var o=new l;return require(["views/blog/BlogLoader"],function(r){var t=r.load_feed(i);t.then(function(i){o.resolve(i)},function(){console.dir("error")})}),o.promise},u.addPosts=function(i){console.log(i),i.articles.forEach(function(i){i.getAuthors=function(){var i=this.author.split(","),o=[],r=!1;return i[i.length-2]=i[i.length-2]+i[i.length-1],i.pop(),a.forEach(i,function(t,e){try{if(!r)if(null!==t.match("by")&&null===t.match("-")){var n=t.split("by");o.push("by"),o.push(n[1].trim())}else if(null!==t.match("by")&&null!==t.match("-")){var s=t.split("-");o.push("by"),o.push(s[0].split("by")[1].trim()),o.push(s[1].trim()),r=!0}else if(null!==t.match("and")&&null!==t.match("-")){var l=t.split("and");a.forEach(l,function(i){if(null===i.match("-"))o.push(i.trim());else{var t=i.split("-");o.push("and"),o.push(t[0].trim()),o.push(t[1].trim()),r=!0}})}else if(null===t.match("and")&&null!==t.match("-")&&e===i.length-1){var u=i[i.length-2].split("and"),h=t.split("-");o.pop(),o.pop(),o.pop(),o.push(u[0].trim()),o.push("and"),o.push(u[1].trim()+", "+h[0].trim()),o.push(h[1].trim()),r=!0}else if(null!==t.match("and")){var l=t.split("and");o.push(l[0].trim()),o.push("and"),o.push(l[1].trim())}else if(null!==t.match("-")){var p=t.split("-");o.push(p[0].trim()),o.push(p[1].trim()),r=!0}else o.push(t.trim())}catch(d){console.log(d)}}),o}}),s.vm.blogPost.push(i)},u});