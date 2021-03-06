var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
// import geolib from 'geolib';
// import startingCoords from './starting-coords.json';
// import locate from './utils/locate';

function resize() {}

function getStartingCoordinates() {
	return new Promise(resolve => {
		const fallback = { latitude: 37.511, longitude: -122.05 };
		locate('fd4d87f605681c0959c16d9164ab6a4a', (err, response) => {
			let user = null;
			if (err) user = { ...fallback };
			else {
				const { latitude, longitude } = response;
				user = { latitude, longitude };
			}

			const withDist = startingCoords.map(c => {
				const dist = geolib.getDistanceSimple(user, c);
				return { ...c, dist };
			});
			withDist.sort((a, b) => d3.descending(a.dist, b.dist));
			const closest = withDist.pop();
			resolve(closest);
		});
	});
}


function setupMap(startCoords) {

	if(viewportWidth < 720){
		d3.select("#present-button").select("p").html("Population<br>in 2015")
		d3.select("#compare-button").select("p").html("Compare<br>to 1990")
		d3.select("#delta-button").select("p").html(function(){
			return 'Show Change &rsquo;90-&rsquo;15 <span class="legend-change"><span style="color:#bf4d2b;">Decline</span>vs.<span style="color:#357662;">Growth</span></span>'
		})
	}
	// console.timeEnd('locate');
	// console.log(startCoords);

	var tourStop = 0;
	var tourObject = [
		{
			text:"<b>Take a tour.</b> Let's take a step back and look at the US.</b>",
			location:{

			},
			button:"Fly to US"
		},
		{
			text:"shot of US",
			location:{
				center:[-92.541666,29.895985],
				zoom:4,
				bearing:-1.55,
				pitch:60,
				speed:.2,
				easing: function (t) {
					return t;
				}

			},
			button:""
		},
		{
			text:"shot of asia",
			location:{
				center:[120.887528,29.174370],
				zoom:4,
				bearing:-41.58,
				pitch:57,
				speed:.2,
				easing: function (t) {
					return t;
				}

			},
			button:""
		},
		{
			text:"shot of hk",
			location:{
				center:[113.892168,22.922493],
				zoom:8.01,
				bearing:24.00,
				pitch:58,
				speed:.8,
				easing: function (t) {
					return t;
				}
			},
			button:""
		},
		{
			text:"shot of africa",
			location:{
				center:[27.90,-1.89],
				zoom:3.97,
				bearing:-27.20,
				pitch:60,
				speed:.2,
				easing: function (t) {
					return t;
				}
			},
			button:""
		}





	]

	var tourContainer = d3.select(".tour-container");
	var tourHidden = true;
	var startScreen = d3.select(".start-screen");
	var startButton = startScreen.select(".start-button");
	var layer_2015 = "full-layer copy"
	var layerMadeVisible = layer_2015;
	var deltaMapBuilt = false;
	var makeMap = true;
	var map;
	var compareMap;
	var combinedMap;
	var beforeContainer  = d3.select(".before-map-container");
	var mainContainer = d3.select("#main-map");

	var currentMode = "present"
	var deltaMap;
	var deltaMapContainer = d3.select(".delta-map-container");
	var compareMapContainer = d3.select("#compare-map");
	var compareMapBuilt = false;

	function changeView(view){

		var attributeToTween = "width"
		if(viewportWidth < 720){
			attributeToTween = "height";
		}

		if(view != "delta-button" && currentMode == "delta" && deltaMapBuilt){
			map.jumpTo({
				center: deltaMap.getCenter(),
				zoom: deltaMap.getZoom(),
				pitch: deltaMap.getPitch(), // pitch in degrees
				bearing: deltaMap.getBearing() // bearing in degrees
			});
		}

		if (view == 'compare-button') {
			map.resize();
			beforeContainer.classed("extended",true);

			mainContainer.transition().duration(400).style(attributeToTween,"50%");
			beforeContainer.transition().duration(400).style(attributeToTween,"50%").on("end",function(d){
				currentMode = "compare";
				if(!compareMapBuilt){
					makeCompareMap();
				}
				else{
					compareMap.jumpTo({
						center: map.getCenter(),
						zoom: map.getZoom(),
						pitch: map.getPitch(), // pitch in degrees
						bearing: map.getBearing() // bearing in degrees
					});
				}
				map.resize();
			});
		}
		else if(currentMode == "compare") {
			beforeContainer.classed("extended",false);
			mainContainer.transition().duration(400).style(attributeToTween,"100%");
			beforeContainer.transition().duration(400).style(attributeToTween,"0%").on("end",function(d){
				compareMap.remove();
				map.resize();
			});
		}
		if (view == 'delta-button') {
			currentMode = 'delta';
			if (!deltaMapBuilt) {
				delta();
			} else {
				deltaMap.jumpTo({
					center: map.getCenter(),
					zoom: map.getZoom(),
					pitch: map.getPitch(), // pitch in degrees
					bearing: map.getBearing() // bearing in degrees
				});
			}
			deltaMapContainer
				.transition()
				.duration(500)
				.style('transform', 'translate(0px,0px)');
		} else {
			deltaMapContainer
				.transition()
				.duration(500)
				.style('transform', 'translate(100%,0px)')
				.on('end', d => {
					// deltaMap.remove();
				});
			if (view != 'compare-button') {
				// map.setLayoutProperty("delta-1990-2015-limited", 'visibility', 'none');
				// map.setLayoutProperty("neg-test-5", 'visibility', 'none');
			}
		}
		if (view == 'present-button') {
			currentMode = 'present';
			// map.setLayoutProperty(layer_2015, 'visibility', 'visible');
		} else if (view != 'compare-button') {
			// map.setLayoutProperty(layer_2015, 'visibility', 'none');
		}
	}
	function setupTourMode(){

		tourContainer.selectAll(".tour-toggle-arrow").on("click",function(d,i){
			if(i==0){
				flyToTour(tourObject[tourStop],"backward");
			}
			else{
				flyToTour(tourObject[tourStop],"foward");
			}

		});


		tourContainer.select(".tour-toggle-text-amount").text("of "+tourObject.length);
		tourContainer.select(".tour-text").html(tourObject[tourStop].text);
		tourContainer.select(".tour-button").text(tourObject[tourStop].button).on("click",function(d){
			flyToTour(tourObject[tourStop],"forward");
		});
		tourContainer.select(".tour-hide").on("click",function(d){
			if(!tourHidden){
				tourHidden = true;
				tourContainer.classed("tour-hidden",true);
			}
			else{
				tourHidden = false;
				tourContainer.classed("tour-hidden",false);
			}
		})
	}

	function flyToTour(location,direction){

			console.log(map);

			if(direction=="backward"){
				console.log("moving backward");
				tourStop = tourStop - 1;
				tourContainer.select(".tour-text").html(tourObject[tourStop].text);
				tourContainer.select(".tour-button").text(tourObject[tourStop].button);
				tourContainer.select(".tour-toggle-text-current").text(tourStop+1);
				if(tourStop != 0){
					map.flyTo(tourObject[tourStop].location)
				}

			}
			else {
				console.log("moving forward");
				tourStop = tourStop + 1;
				tourContainer.select(".tour-text").html(tourObject[tourStop].text);
				tourContainer.select(".tour-button").text(tourObject[tourStop].button);
				tourContainer.select(".tour-toggle-text-current").text(tourStop+1);
				if(tourStop != 0){
					map.flyTo(tourObject[tourStop].location)
				}
			}
			// 		map.flyTo({
			// 	bearing: 15.20,
			// 	speed: 0.1, // make the flying slow
			// 	curve: 1, // change the speed at which it zooms out
			// 	pitch: 44,
			// 	easing: function (t) {
			// 			return t;
			// 	}
			// })

	}

	function createToggles(){

		var topTogglesContainer = d3.select(".top-toggles");

		topTogglesContainer.selectAll("div").select("p").on("click",function(d){
			var id = d3.select(this.parentNode).attr("id");
			changeView(id);
			topTogglesContainer.selectAll("div").select("p").classed("top-toggle-active",false);
			d3.select(this).classed("top-toggle-active",true);
		})
	}
	function makeCompareMap() {
		compareMap = new mapboxgl.Map({
			container: 'compare-map',
			// style: 'mapbox://styles/mapbox/dark-v9',
			style: 'mapbox://styles/dock4242/cjnl0k08b88ai2slsjxzk0jii?optimize=true',
			center: map.getCenter(),
			zoom: map.getZoom(),
			pitch: map.getPitch(), // pitch in degrees
			bearing: map.getBearing(), // bearing in degrees
		});

		compareMap.on("load",function(d){
			// compareMap.setLayoutProperty("2015-gte-20-limited", 'visibility', 'none');
			// compareMap.setLayoutProperty("1990-gte-20-limited", 'visibility', 'visible');

			combinedMap = new mapboxgl.Compare(map, compareMap, {
					// Set this to enable comparing two maps by mouse movement:
					// mousemove: true
			});



			compareMapContainer.style("pointer-events","all");
		})
	}
	function delta() {
		deltaMapBuilt = true;
		deltaMap = new mapboxgl.Map({
			container: 'delta-map',
			//style: 'mapbox://styles/mapbox/cjnkyuronejw32snahlu7a5zc?optimize=true',
			style:'mapbox://styles/dock4242/cjnl4y42g1apa2ro2r6zjpuqz?optimize=true',
			//style: 'mapbox://styles/dock4242/cjlzoguw06l1z2rmvl1s10lpe?optimize=true',
			center: map.getCenter(),
			zoom: map.getZoom(),
			pitch: map.getPitch(), // pitch in degrees
			bearing: map.getBearing() // bearing in degrees
		});

	}
	if (makeMap) {
		mapboxgl.accessToken =
			'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2tqdXA5OGJoMDFtbzJ0bnEwbGl4cG0zYiJ9.6u_4MspNw0Y7jd8q5zr57A';
		function getPopulation() {
			console.log('fetching population');
			const bounds = map.getBounds();
			const geometry = {
				geodesic: true,
				type: 'Polygon',
				coordinates: [
					[
						[bounds.getSouthWest().lng, bounds.getSouthWest().lat],
						[bounds.getNorthWest().lng, bounds.getNorthWest().lat],
						[bounds.getNorthEast().lng, bounds.getNorthEast().lat],
						[bounds.getSouthEast().lng, bounds.getSouthEast().lat]
					]
				]
			};
			ee.data.setApiKey('AIzaSyADobnjzDCKXxK_K945fnA7bP85JXplQFE');
			ee.initialize();
			let imageForAnalysis = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015');
			imageForAnalysis = imageForAnalysis.clip(geometry);
			const meanDictionary = imageForAnalysis.reduceRegion({
				reducer: ee.Reducer.sum(),
				geometry,
				scale: 250,
				maxPixels: 1e9
			});
			const p = d3.precisionPrefix(1e5, 1.3e6);
			const f = d3.formatPrefix(`.${p}`, 1.3e6);
			const toRoute = meanDictionary.evaluate(d => {
				const total_pop = d.population_count;
				d3.select('.population')
					.select('p')
					.text(f(total_pop)+" people reside on-screen");
			});
		}

		console.log(startCoords);
		map = new mapboxgl.Map({
			container: 'main-map',
			// style: 'mapbox://styles/mapbox/light-v9',
			style: 'mapbox://styles/dock4242/cjnel8krq2ltq2spteciqe2x3?optimize=true',
			center: [startCoords.lon, startCoords.lat],
			zoom: 8,
			pitch: 60, // pitch in degrees
			bearing: 0 // bearing in degrees
		});
		//
		// var combinedMap = new mapboxgl.Compare(map, afterMap, {
		//     // Set this to enable comparing two maps by mouse movement:
		//     // mousemove: true
		// });
		map.on('load',function(){
			startButton.classed("start-active",true).select("p").text("See Population Data").on("click",function(d){
				setupTourMode();
				startScreen.transition().duration(500).style("opacity",0).on("end",function(d){
					d3.select(".top-header").transition().duration(500).delay(100).style("transform","translate(0px,0px)")
					d3.select(".tour-container").transition().duration(0).delay(500).on("end",function(d){
						d3.select(this).classed("tour-hidden",false).classed("tour-hidden-start",false);
						tourHidden = false;
					})
					startScreen.remove();
				});
			});
			// getPopulation();
		});
		// get population function
		var updatePopulationTimeout;
		var timeoutSet = false;
		map.on('moveend', () => {


			d3.select('.population')
				.select('p')
				.text("Fetching Population Count...");

			if(timeoutSet){
				clearTimeout(updatePopulationTimeout);
			}
			else{
				timeoutSet = true;
			}

			updatePopulationTimeout = setTimeout(function(){
				// getPopulation();
			},1000);

		});
	}
	createToggles();
}

function init() {
	setupMap({"lon":"-122.4374","lat":"37.7599"});
	// getStartingCoordinates().then(setupMap);
}

export default { init, resize };
