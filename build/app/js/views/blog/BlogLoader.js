/*! Global-Forest-Watch-Fires Tue Jul 22 2014 16:30:35 */
define(["esri/request","dojo/io/script","dojo/request/xhr","dojo/Deferred"],function(a,b,c,d){var e={};return e.init=function(){},e.load_feed=function(){var b=new d,c="http://gis-potico.wri.org/blogs/fireblog.txt",f=a({url:c,handleAs:"text"},{useProxy:!0});return f.then(function(a){e.response=a,b.resolve(a)}),b.promise},e});