!function(e){var t={};function o(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=13)}({0:function(e,t){var o;o=function(){return this}();try{o=o||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(o=window)}e.exports=o},13:function(e,t,o){"use strict";o.r(t);var n=o(2),i=o.n(n),r={android:function(){return navigator.userAgent.match(/Android/i)},blackberry:function(){return navigator.userAgent.match(/BlackBerry/i)},ios:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},opera:function(){return navigator.userAgent.match(/Opera Mini/i)},windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return r.android()||r.blackberry()||r.ios()||r.opera()||r.windows()}},a=r;var c=Math.max(document.documentElement.clientWidth,window.innerWidth||0);function l(e){console.log("setting up map");var t=d3.selectAll(".before-historic-toggle").on("click",function(e){d3.select(this).classed("before-toggle-active")||(t.classed("before-toggle-active",!1),d3.select(this).classed("before-toggle-active",!0),1975==+d3.select(this).text?(l=1975,n.remove(),j()):(l=1990,n.remove(),j()))});d3.select(".about").select("p").on("click",function(){d3.select(".about-screen").classed("about-screen-visible")?d3.select(".about-screen").classed("about-screen-visible",!1):d3.select(".about-screen").classed("about-screen-visible",!0)}),d3.select(".close-button").on("click",function(){d3.select(".about-screen").classed("about-screen-visible")?d3.select(".about-screen").classed("about-screen-visible",!1):d3.select(".about-screen").classed("about-screen-visible",!0)}),c<720&&(d3.select("#present-button").select("p").html("Population<br>in 2015"),d3.select("#compare-button").select("p").html("Compare<br>to 1990"),d3.select("#delta-button").select("p").html(function(){return'Show Change &rsquo;90-&rsquo;15 <span class="legend-change"><span style="color:#bf4d2b;">Decline</span>vs.<span style="color:#357662;">Growth</span></span>'}));var o,n,i,r=0,a=[{text:"<b>Take a tour.</b> Each block represents 250 to 5,000 sq. meters. Taller blocks represent more people.",location:{},button:"Fly to US"},{text:"The US is home to about 320 million people. Ten cities top 1 million. Now let's gander at China.",location:{center:[-92.541666,29.895985],zoom:4,bearing:-1.55,pitch:60,speed:.2,easing:function(e){return e}},button:"Fly to China"},{text:"China has 100 cities with over 1 million people. The cluster around Hong Kong is roughly three NYCs.",location:{center:[120.887528,29.17437],zoom:4,bearing:-41.58,pitch:57,speed:.2,easing:function(e){return e}},button:"Fly to Hong Kong"},{text:"China’s Pearl River Delta is becoming a megalopolis where three 10 million+ cities are merging.",location:{center:[113.892168,22.922493],zoom:8.01,bearing:24,pitch:58,speed:.8,easing:function(e){return e}},button:"Fly to Africa"},{text:"Like Asia, Africa is expected to see similar growth. Today 1 in 6 people live on the continent.",location:{center:[27.9,-1.89],zoom:3.97,bearing:-27.2,pitch:60,speed:.2,easing:function(e){return e}},button:"Fly to Lagos"},{text:"By 2100, it will be 1 in 3. This is the coastal city of Lagos, home to 13 million people.",location:{center:[3.33508,6.426115],zoom:6.86,bearing:-112.8,pitch:21.5,speed:.8,easing:function(e){return e}},button:"Fly to Kinshasa"},{text:"And this is another one Africa's megacities: Kinshasa, with over 12 million people.",location:{center:[15.500771,-4.345327],zoom:7.63,bearing:-30.4,pitch:60,speed:.8,easing:function(e){return e}},button:"Shrinking Cities"},{text:"Shown in red are cities that declined in population from 1990 to 2015, such as Detroit and Cleveland.",location:{center:[-83.539628,40.565428],zoom:7.58,bearing:-19.2,pitch:57.5,speed:.6,easing:function(e){return e}},button:""}],l=1990,s=d3.select(".tour-container"),u=!0,d=d3.select(".start-screen"),p=d.select(".start-button"),g=!1,f=d3.select(".before-map-container"),m=d3.select("#main-map"),b="present",h=d3.select(".delta-map-container"),v=d3.select("#compare-map"),y=!1;function x(e){var t="width";if(c<720&&(t="height"),"delta-button"!=e&&"delta"==b&&g&&o.jumpTo({center:i.getCenter(),zoom:i.getZoom(),pitch:i.getPitch(),bearing:i.getBearing()}),"compare-button"==e?(o.resize(),f.classed("extended",!0),m.transition().duration(400).style(t,"50%"),f.transition().duration(400).style(t,"50%").on("end",function(e){b="compare",y?n.jumpTo({center:o.getCenter(),zoom:o.getZoom(),pitch:o.getPitch(),bearing:o.getBearing()}):j(),o.resize()})):"compare"==b&&(f.classed("extended",!1),m.transition().duration(400).style(t,"100%"),f.transition().duration(400).style(t,"0%").on("end",function(e){n.remove(),o.resize()})),"delta-button"==e?(b="delta",g?i.jumpTo({center:o.getCenter(),zoom:o.getZoom(),pitch:o.getPitch(),bearing:o.getBearing()}):z(!1),h.transition().duration(500).style("transform","translate(0px,0px)")):h.transition().duration(500).style("transform","translate(100%,0px)").on("end",function(e){}),"present-button"==e){b="present";if(d3.select(".population").select("p").text("Fetching Population Count..."),c>500)setTimeout(function(){k()},1e3)}else d3.select(".population").select("p").text("")}function w(e,t){"present"!=b&&(x("present-button"),d3.select(".top-toggles").selectAll("div").select("p").classed("top-toggle-active",!1),d3.select("#present-button").select("p").classed("top-toggle-active",!0));if("backward"==t){if(r==a.length-1)x("present-button"),d3.select(".top-toggles").selectAll("div").select("p").classed("top-toggle-active",!1),d3.select("#present-button").select("p").classed("top-toggle-active",!0),s.select(".tour-button").style("opacity",null).style("pointer-events",null);r-=1,r=Math.max(r,0),s.select(".tour-text").html(a[r].text),s.select(".tour-button").text(a[r].button),s.select(".tour-toggle-text-current").text(r+1),0!=r&&o.flyTo(a[r].location)}else if(r!=a.length-1){if(r+=1,(r=Math.min(r,a.length-1))==a.length-1)x("delta-button"),g?i.flyTo(a[r].location):z(!0),d3.select(".top-toggles").selectAll("div").select("p").classed("top-toggle-active",!1),d3.select("#delta-button").select("p").classed("top-toggle-active",!0),s.select(".tour-button").style("opacity",0).style("pointer-events","none");s.select(".tour-text").html(a[r].text),s.select(".tour-button").text(a[r].button),s.select(".tour-toggle-text-current").text(r+1),0!=r&&o.flyTo(a[r].location)}}function j(){var e="mapbox://styles/dock4242/cjnl0k08b88ai2slsjxzk0jii?optimize=true";1975==l&&(e="mapbox://styles/dock4242/cjnn7622h02ph2smpyw7dhq4y?optimize=true");var t=12;c<500&&(t=6.99),(n=new mapboxgl.Map({container:"compare-map",style:e,center:o.getCenter(),zoom:o.getZoom(),pitch:o.getPitch(),bearing:o.getBearing(),maxZoom:t,minZoom:2,maxTileCacheSize:1})).on("load",function(e){new mapboxgl.Compare(o,n,{}),v.style("pointer-events","all")})}function z(e){console.log(e),g=!0;var t=o.getCenter(),n=o.getZoom(),r=o.getPitch(),l=o.getBearing();if(e){var s=a[a.length-1].location;console.log(s),t=s.center,n=s.zoom,r=s.pitch,l=s.bearing}var u=12;c<500&&(u=6.99),i=new mapboxgl.Map({container:"delta-map",style:"mapbox://styles/dock4242/cjnl4y42g1apa2ro2r6zjpuqz?optimize=true",center:t,zoom:n,pitch:r,bearing:l,maxZoom:u,minZoom:2}),c<500&&i.addControl(new mapboxgl.NavigationControl,"bottom-right")}function k(){var e=o.getBounds(),t={geodesic:!0,type:"Polygon",coordinates:[[[e.getSouthWest().lng,e.getSouthWest().lat],[e.getNorthWest().lng,e.getNorthWest().lat],[e.getNorthEast().lng,e.getNorthEast().lat],[e.getSouthEast().lng,e.getSouthEast().lat]]]};ee.data.setApiKey("AIzaSyADobnjzDCKXxK_K945fnA7bP85JXplQFE"),ee.initialize();var n=ee.Image("JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015"),i=(n=n.clip(t)).reduceRegion({reducer:ee.Reducer.sum(),geometry:t,scale:250,maxPixels:1e9}),r=d3.precisionPrefix(1e5,13e5),a=d3.formatPrefix(".".concat(r),13e5);i.evaluate(function(e){if(console.log(e),e){var t=e.population_count;d3.select(".population").select("p").text(a(t)+" people reside on screen")}else d3.select(".population").select("p").text("")})}mapboxgl.accessToken="pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ";var P=7;c<500&&(P=6.5);var T,C=12;c<500&&(C=6.99),o=new mapboxgl.Map({container:"main-map",style:"mapbox://styles/dock4242/cjnel8krq2ltq2spteciqe2x3?optimize=true",center:[e.lon,e.lat],zoom:P,pitch:60,bearing:0,maxZoom:C,minZoom:2}),c>500&&o.addControl(new mapboxgl.NavigationControl,"bottom-right"),o.on("load",function(){p.classed("start-active",!0).select("p").text("View Population").on("click",function(e){s.selectAll(".tour-toggle-arrow").on("click",function(e,t){w(a[r],0==t?"backward":"foward")}),s.select(".tour-toggle-text-amount").text("of "+a.length),s.select(".tour-text").html(a[r].text),s.select(".tour-button").text(a[r].button).on("click",function(e){w(a[r],"forward")}),s.select(".tour-hide").on("click",function(e){u?(u=!1,s.classed("tour-hidden",!1)):(u=!0,s.classed("tour-hidden",!0))}),d.transition().duration(500).style("opacity",0).on("end",function(e){d3.select(".top-header").transition().duration(500).delay(100).style("transform","translate(0px,0px)"),d3.select(".tour-container").transition().duration(0).delay(500).on("end",function(e){d3.select(this).classed("tour-hidden",!1).classed("tour-hidden-start",!1),u=!1}),d.remove()})}),c>500&&k()});var A=!1;c>500&&(console.log("making moveend stuff"),o.on("moveend",function(){var e="Fetching Population Count...";"present"!=b&&(e=""),d3.select(".population").select("p").text(e),A?clearTimeout(T):A=!0,"present"==b&&(T=setTimeout(function(){k()},1e3))})),function(){var e=d3.select(".top-toggles");e.selectAll("div").select("p").on("click",function(t){x(d3.select(this.parentNode).attr("id")),e.selectAll("div").select("p").classed("top-toggle-active",!1),d3.select(this).classed("top-toggle-active",!0)})}()}var s={init:function(){l({lon:"-0.118092",lat:"51.509865"})},resize:function(){}},u=d3.select("body"),d=0;function p(){var e=u.node().offsetWidth;d!==e&&(d=e,s.resize())}u.classed("is-mobile",a.any()),window.addEventListener("resize",i()(p,150)),s.init()},2:function(e,t,o){(function(t){var o="Expected a function",n=NaN,i="[object Symbol]",r=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,l=/^0o[0-7]+$/i,s=parseInt,u="object"==typeof t&&t&&t.Object===Object&&t,d="object"==typeof self&&self&&self.Object===Object&&self,p=u||d||Function("return this")(),g=Object.prototype.toString,f=Math.max,m=Math.min,b=function(){return p.Date.now()};function h(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function v(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&g.call(e)==i}(e))return n;if(h(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=h(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(r,"");var o=c.test(e);return o||l.test(e)?s(e.slice(2),o?2:8):a.test(e)?n:+e}e.exports=function(e,t,n){var i,r,a,c,l,s,u=0,d=!1,p=!1,g=!0;if("function"!=typeof e)throw new TypeError(o);function y(t){var o=i,n=r;return i=r=void 0,u=t,c=e.apply(n,o)}function x(e){var o=e-s;return void 0===s||o>=t||o<0||p&&e-u>=a}function w(){var e=b();if(x(e))return j(e);l=setTimeout(w,function(e){var o=t-(e-s);return p?m(o,a-(e-u)):o}(e))}function j(e){return l=void 0,g&&i?y(e):(i=r=void 0,c)}function z(){var e=b(),o=x(e);if(i=arguments,r=this,s=e,o){if(void 0===l)return function(e){return u=e,l=setTimeout(w,t),d?y(e):c}(s);if(p)return l=setTimeout(w,t),y(s)}return void 0===l&&(l=setTimeout(w,t)),c}return t=v(t)||0,h(n)&&(d=!!n.leading,a=(p="maxWait"in n)?f(v(n.maxWait)||0,t):a,g="trailing"in n?!!n.trailing:g),z.cancel=function(){void 0!==l&&clearTimeout(l),u=0,i=s=r=l=void 0},z.flush=function(){return void 0===l?c:j(b())},z}}).call(this,o(0))}});