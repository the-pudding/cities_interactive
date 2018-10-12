

// import 'intersection-observer';
// import Stickyfill from 'stickyfilljs';
// import scrollama from 'scrollama'
/* global d3 */

function resize() {}

/* global d3 */


function init() {

	//
	mapboxgl.accessToken = 'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ';

	var layerMadeVisible = false;

	var makeMap = true;
	var map;
	function createToggles(){
		var container = d3.select(".toggles");

		container
			.append("div")
			.attr("class","years")
			.selectAll("p")
			.data([1975,1990,2000,2015])
			.enter()
			.append("p")
			.text(function(d){
				return d;
			})
			.on("click",function(d){
				if(!layerMadeVisible){
					layerMadeVisible = d+"-gte-20-limited";
				}
				else{
					map.setLayoutProperty(layerMadeVisible, 'visibility', 'none');
				}
				layerMadeVisible = d+"-gte-20-limited";
				map.setLayoutProperty(layerMadeVisible, 'visibility', 'visible');
				// map.setPaintProperty(layerMadeVisible, 'fill-extrusion-opacity', 1);
				map.setLayoutProperty("all-5k", 'visibility', 'none');
				map.setLayoutProperty("all-1k", 'visibility', 'none');

			})
			;

		container
			.append("div")
			.attr("class","deltas")
			.selectAll("p")
			.data(["delta-1990-2015"])
			.enter()
			.append("p")
			.text(function(d){
				return d;
			})
			.on("click",function(d){
				if(!layerMadeVisible){
					layerMadeVisible = d+"-limited";
				}
				else {
					map.setLayoutProperty(layerMadeVisible, 'visibility', 'none');
				}
				layerMadeVisible = d+"-limited";
				map.setLayoutProperty(layerMadeVisible, 'visibility', 'visible');
				// map.setPaintProperty(layerMadeVisible, 'fill-extrusion-opacity', 1);
				map.setLayoutProperty("all-5k", 'visibility', 'none');
				map.setLayoutProperty("all-1k", 'visibility', 'none');
			})
			;

	}


	if(makeMap){

		function getPopulation(){

			var bounds = map.getBounds();

			var geometry = {
			  "geodesic": true,
			  "type": "Polygon",
			  "coordinates": [
			    [
			      [
			        bounds.getSouthWest().lng,
			        bounds.getSouthWest().lat
			      ],
			      [
							bounds.getNorthWest().lng,
			        bounds.getNorthWest().lat
			      ],
			      [
							bounds.getNorthEast().lng,
			        bounds.getNorthEast().lat
			      ],
			      [
							bounds.getSouthEast().lng,
			        bounds.getSouthEast().lat
			      ]
			    ]
			  ]
			}

			ee.data.setApiKey('AIzaSyADobnjzDCKXxK_K945fnA7bP85JXplQFE')
			ee.initialize();

			var imageForAnalysis = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015');
			imageForAnalysis = imageForAnalysis.clip(geometry);

			var meanDictionary = imageForAnalysis.reduceRegion({
			  reducer: ee.Reducer.sum(),
			  geometry: geometry,
			  scale: 250,
			  maxPixels: 1e9
			});
			var p = d3.precisionPrefix(1e5, 1.3e6);
			var f = d3.formatPrefix("." + p, 1.3e6);


			var toRoute = meanDictionary.evaluate(function(d){
				var total_pop = d.population_count
				d3.select(".population").select("p").text(f(total_pop));
			})

		}
		//
		map = new mapboxgl.Map({
			container: 'before',
			style: 'mapbox://styles/dock4242/cjma1k7135xfl2smsicki0ned',
			center: [-122.050,37.511],
			zoom: 8,
			pitch: 60, // pitch in degrees
			bearing: 0, // bearing in degrees
		});

		// var afterMap = new mapboxgl.Map({
		// 	container: 'after',
		// 	style: 'mapbox://styles/dock4242/cjma1k7135xfl2smsicki0ned',
		// 	center: [-122.050,37.511],
		// 	zoom: 8,
		// 	pitch: 0, // pitch in degrees
		// 	bearing: 0, // bearing in degrees
		// });
		//
		// var map = new mapboxgl.Compare(beforeMap, afterMap, {
		//     // Set this to enable comparing two maps by mouse movement:
		//     // mousemove: true
		// });


		// const map = new mapboxgl.Map({
		// 	container: 'map',
		// 	style: 'mapbox://styles/dock4242/cjma1k7135xfl2smsicki0ned',
		// 	center: [-122.050,37.511],
		// 	zoom: 8,
		// 	pitch: 0, // pitch in degrees
		// 	bearing: 0, // bearing in degrees
		// });
		//
		// map.scrollZoom.disable();
		//
		map.on('load',function(){

			getPopulation();

		});

		map.on('moveend',function(){
			// console.log("here");
			getPopulation();

		});

	}
	createToggles();

}

export default { init, resize };
