/*! Global-Forest-Watch-Fires Mon Dec 01 2014 10:54:58 */
define(["esri/request","dojo/io/script","dojo/request/xhr","dojo/Deferred"],function(a,b,c,d){var e={};return e.init=function(){},e.load_feed=function(){var b=new d,c="http://gis-potico.wri.org/blogs/fireblog.txt",f=a({url:c,handleAs:"text"},{useProxy:!0,usePost:!0});return f.then(function(a){e.response=a,b.resolve(a)}),b.promise},e});