

// import 'intersection-observer';
// import Stickyfill from 'stickyfilljs';
// import scrollama from 'scrollama'
/* global d3 */

function resize() {}

/* global d3 */


function init() {

	//

	var layerMadeVisible = "2015-gte-20-limited";

	var makeMap = true;
	var map;
	var compareMap;
	var beforeContainer  = d3.select(".before-map-container");
	var deltaModeOn = false;
	var compareModeOn = false;
	var presentModeOn = true;

	function changeView(view){

		if(view == "compare-button"){
			map.resize();
			beforeContainer.classed("extended",true);
			beforeContainer.transition().duration(200).style("width","50%").on("end",function(d){
				compareModeOn = true;
				makeCompareMap();
				map.resize();
			});
		}
		else if(compareModeOn) {
			beforeContainer.classed("extended",false);
			beforeContainer.transition().duration(200).style("width","0%").on("end",function(d){
				compareModeOn = false;
				// compareMap.remove();
				map.resize();
			});
		}

		if(view == "delta-button"){
			deltaModeOn = true;
			map.setLayoutProperty("delta-1990-2015-limited", 'visibility', 'visible');
			map.setLayoutProperty("neg-test-5", 'visibility', 'visible');
		}
		else{
			deltaModeOn = false;
			if(view != "compare-button"){
				map.setLayoutProperty("delta-1990-2015-limited", 'visibility', 'none');
				map.setLayoutProperty("neg-test-5", 'visibility', 'none');
			}
		}

		if(view == "present-button"){
			presentModeOn = true;
			map.setLayoutProperty("2015-gte-20-limited", 'visibility', 'visible');
		}
		else{
			presentModeOn = false;
			if(view != "compare-button"){
				map.setLayoutProperty("2015-gte-20-limited", 'visibility', 'none');
			}
		}


	}

	function createToggles(){

		var topTogglesContainer = d3.select(".top-toggles");

		topTogglesContainer.selectAll("p").on("click",function(d){
			changeView(d3.select(this).attr("class"));
		})
	}

	function makeCompareMap(){

		compareMap = new mapboxgl.Map({
			container: 'compare-map',
			// style: 'mapbox://styles/mapbox/dark-v9',
			style: 'mapbox://styles/dock4242/cjn6mkymw1f5u2sp7uf9gs39o?optimize=true',
			center: [-122.050,37.511],
			zoom: 8,
			pitch: 60, // pitch in degrees
			bearing: 0, // bearing in degrees
		});

		compareMap.on("load",function(d){
			compareMap.setLayoutProperty("2015-gte-20-limited", 'visibility', 'none');
			compareMap.setLayoutProperty("1990-gte-20-limited", 'visibility', 'visible');

			var combinedMap = new mapboxgl.Compare(map, compareMap, {
					// Set this to enable comparing two maps by mouse movement:
					// mousemove: true
			});
		})


	}


	if(makeMap){
		mapboxgl.accessToken = 'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ';

		function getPopulation(){

			console.log("fetching population");

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


		map = new mapboxgl.Map({
			container: 'main-map',
			//style: 'mapbox://styles/mapbox/light-v9',
			style: 'mapbox://styles/dock4242/cjn6mkymw1f5u2sp7uf9gs39o?optimize=true',
			center: [-122.050,37.511],
			zoom: 8,
			pitch: 60, // pitch in degrees
			bearing: 0, // bearing in degrees
		});


		//
		// var combinedMap = new mapboxgl.Compare(map, afterMap, {
		//     // Set this to enable comparing two maps by mouse movement:
		//     // mousemove: true
		// });


		map.on('load',function(){
			// map.setLayoutProperty("all-5k", 'visibility', 'none');
			// map.setLayoutProperty("all-1k", 'visibility', 'none');
			// map.setLayoutProperty("2015-gte-20-limited", 'visibility', 'visible');

			// getPopulation();

		});

		//get population function
		map.on('moveend',function(){

			// console.log("here");
			// getPopulation();

		});

	}
	createToggles();
}

export default { init, resize };
