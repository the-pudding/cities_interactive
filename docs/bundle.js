!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=13)}({0:function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},13:function(t,e,n){"use strict";n.r(e);var o=n(2),r=n.n(o),i={android:function(){return navigator.userAgent.match(/Android/i)},blackberry:function(){return navigator.userAgent.match(/BlackBerry/i)},ios:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},opera:function(){return navigator.userAgent.match(/Opera Mini/i)},windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return i.android()||i.blackberry()||i.ios()||i.opera()||i.windows()}},a=i;function c(t){var e,n,o,r=0,i=[{text:"<b>Take a tour.</b> Let's look at a wide-shot of the US</b>",location:{},button:"Fly to US"},{text:"shot of US",location:{center:[-92.541666,29.895985],zoom:4,bearing:-1.55,pitch:60,speed:.2,easing:function(t){return t}},button:""},{text:"shot of asia",location:{center:[120.887528,29.17437],zoom:4,bearing:-41.58,pitch:57,speed:.2,easing:function(t){return t}},button:""},{text:"shot of hk",location:{center:[113.892168,22.922493],zoom:8.01,bearing:24,pitch:58,speed:.8,easing:function(t){return t}},button:""},{text:"shot of africa",location:{center:[27.9,-1.89],zoom:3.97,bearing:-27.2,pitch:60,speed:.2,easing:function(t){return t}},button:""}],a=d3.select(".tour-container"),c=!0,u=d3.select(".start-screen"),l=u.select(".start-button"),s="full-layer copy",d=!1,f=d3.select(".before-map-container"),p="present",g=d3.select(".delta-map-container"),m=d3.select("#compare-map"),b=!1;function y(t){"delta-button"!=t&&"delta"==p&&d&&e.jumpTo({center:o.getCenter(),zoom:o.getZoom(),pitch:o.getPitch(),bearing:o.getBearing()}),"compare-button"==t?(e.resize(),f.classed("extended",!0),f.transition().duration(400).style("width","50%").on("end",function(t){p="compare",b?n.jumpTo({center:e.getCenter(),zoom:e.getZoom(),pitch:e.getPitch(),bearing:e.getBearing()}):(n=new mapboxgl.Map({container:"compare-map",style:"mapbox://styles/dock4242/cjngbd5r047lc2rqjsj0ajwt0?optimize=true",center:e.getCenter(),zoom:e.getZoom(),pitch:e.getPitch(),bearing:e.getBearing()})).on("load",function(t){new mapboxgl.Compare(e,n,{}),m.style("pointer-events","all")}),e.resize()})):"compare"==p&&(f.classed("extended",!1),f.transition().duration(400).style("width","0%").on("end",function(t){e.resize()})),"delta-button"==t?(p="delta",d?o.jumpTo({center:e.getCenter(),zoom:e.getZoom(),pitch:e.getPitch(),bearing:e.getBearing()}):(d=!0,o=new mapboxgl.Map({container:"delta-map",style:"mapbox://styles/dock4242/cjnfclc780ham2rufqmsufejy?optimize=true",center:e.getCenter(),zoom:e.getZoom(),pitch:e.getPitch(),bearing:e.getBearing()})),g.transition().duration(500).style("transform","translate(0px,0px)")):g.transition().duration(500).style("transform","translate(100%,0px)").on("end",function(t){}),"present-button"==t?(p="present",e.setLayoutProperty(s,"visibility","visible")):"compare-button"!=t&&e.setLayoutProperty(s,"visibility","none")}function h(t,n){"backward"==n?(console.log("moving backward"),r-=1,a.select(".tour-text").html(i[r].text),a.select(".tour-button").text(i[r].button),a.select(".tour-toggle-text-current").text(r+1),e.flyTo(i[r].location)):(console.log("moving forward"),r+=1,a.select(".tour-text").html(i[r].text),a.select(".tour-button").text(i[r].button),a.select(".tour-toggle-text-current").text(r+1),e.flyTo(i[r].location))}mapboxgl.accessToken="pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ",console.log(t),(e=new mapboxgl.Map({container:"main-map",style:"mapbox://styles/dock4242/cjnel8krq2ltq2spteciqe2x3?optimize=true",center:[t.lon,t.lat],zoom:8,pitch:60,bearing:0})).on("load",function(){l.classed("start-active",!0).select("p").text("Start").on("click",function(t){a.selectAll(".tour-toggle-arrow").on("click",function(t,e){h(i[r],0==e?"backward":"foward")}),a.select(".tour-toggle-text-amount").text("of "+i.length),a.select(".tour-text").html(i[r].text),a.select(".tour-button").text(i[r].button).on("click",function(t){h(i[r],"forward")}),a.select(".tour-hide").on("click",function(t){c?(c=!1,a.classed("tour-hidden",!1)):(c=!0,a.classed("tour-hidden",!0))}),u.transition().duration(500).style("opacity",0).on("end",function(t){d3.select(".top-header").transition().duration(500).delay(100).style("transform","translate(0px,0px)"),d3.select(".tour-container").transition().duration(0).delay(500).on("end",function(t){d3.select(this).classed("tour-hidden",!1).classed("tour-hidden-start",!1),c=!1}),u.remove()})})}),e.on("moveend",function(){console.log("moved"),function(){console.log("fetching population");var t=e.getBounds(),n={geodesic:!0,type:"Polygon",coordinates:[[[t.getSouthWest().lng,t.getSouthWest().lat],[t.getNorthWest().lng,t.getNorthWest().lat],[t.getNorthEast().lng,t.getNorthEast().lat],[t.getSouthEast().lng,t.getSouthEast().lat]]]};ee.data.setApiKey("AIzaSyADobnjzDCKXxK_K945fnA7bP85JXplQFE"),ee.initialize();var o=ee.Image("JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015"),r=(o=o.clip(n)).reduceRegion({reducer:ee.Reducer.sum(),geometry:n,scale:250,maxPixels:1e9}),i=d3.precisionPrefix(1e5,13e5),a=d3.formatPrefix(".".concat(i),13e5);r.evaluate(function(t){var e=t.population_count;d3.select(".population").select("p").text(a(e))})}()}),function(){var t=d3.select(".top-toggles");t.selectAll("div").on("click",function(e){y(d3.select(this).attr("id")),t.selectAll("div").select("p").classed("top-toggle-active",!1),d3.select(this).select("p").classed("top-toggle-active",!0)})}()}var u={init:function(){c({lon:"-122.4374",lat:"37.7599"})},resize:function(){}},l=d3.select("body"),s=0;function d(){var t=l.node().offsetWidth;s!==t&&(s=t,u.resize())}l.classed("is-mobile",a.any()),window.addEventListener("resize",r()(d,150)),u.init()},2:function(t,e,n){(function(e){var n="Expected a function",o=NaN,r="[object Symbol]",i=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,u=/^0o[0-7]+$/i,l=parseInt,s="object"==typeof e&&e&&e.Object===Object&&e,d="object"==typeof self&&self&&self.Object===Object&&self,f=s||d||Function("return this")(),p=Object.prototype.toString,g=Math.max,m=Math.min,b=function(){return f.Date.now()};function y(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function h(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&p.call(t)==r}(t))return o;if(y(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=y(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var n=c.test(t);return n||u.test(t)?l(t.slice(2),n?2:8):a.test(t)?o:+t}t.exports=function(t,e,o){var r,i,a,c,u,l,s=0,d=!1,f=!1,p=!0;if("function"!=typeof t)throw new TypeError(n);function v(e){var n=r,o=i;return r=i=void 0,s=e,c=t.apply(o,n)}function x(t){var n=t-l;return void 0===l||n>=e||n<0||f&&t-s>=a}function j(){var t=b();if(x(t))return w(t);u=setTimeout(j,function(t){var n=e-(t-l);return f?m(n,a-(t-s)):n}(t))}function w(t){return u=void 0,p&&r?v(t):(r=i=void 0,c)}function z(){var t=b(),n=x(t);if(r=arguments,i=this,l=t,n){if(void 0===u)return function(t){return s=t,u=setTimeout(j,e),d?v(t):c}(l);if(f)return u=setTimeout(j,e),v(l)}return void 0===u&&(u=setTimeout(j,e)),c}return e=h(e)||0,y(o)&&(d=!!o.leading,a=(f="maxWait"in o)?g(h(o.maxWait)||0,e):a,p="trailing"in o?!!o.trailing:p),z.cancel=function(){void 0!==u&&clearTimeout(u),s=0,r=l=i=u=void 0},z.flush=function(){return void 0===u?c:w(b())},z}}).call(this,n(0))}});