
function initMap() {
    var position = {lat: 28.5728722, lng: -80.6511695};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: position,
        styles: stylemap
    });
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: 'raket2.png'
    });
    marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}


function getAPIdata() {

	// get latest weather
	fetch('https://api.openweathermap.org/data/2.5/forecast?q=orlando,usa&appid=b0c8dafa512a0134e90df6ece3c2b7a2')
	
	// parse to JSON format
	.then(function(response) {
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {

		// render weatherCondition
		onAPISucces(response);
	})
	
	// catch error
	.catch(function (error) {
		// onAPIError();
		console.error('Request failed', error);
	});
}

function onAPISucces(response) {

	// get all temps (now)
	var now = response.list[0].main;

	//console.log(now);

	// get type of weather in string format
	var type = response.list[0].weather[0].main

	//console.log(response.list[0]);

	// get Celcius
	var degC = Math.floor(now.temp - 273.15);

	// render weather in DOM
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = degC + "&#176;C <br>" + type;
}

// function onAPIError() {
// 	var weatherBox = document.getElementById('weather');
// 	weatherBox.className = 'hidden'; 
// }

// init data stream
getAPIdata();





//SUNRISE API proberen maar helaas lukt het niet echt. 

//function getAPIdata2() {
//
//	// get sunrise 
//	fetch('https://api.sunrise-sunset.org/json?lat=28.5728722&lng=-80.6511695&date=today')
//	
//	// parse to JSON format 
//	.then(function(response) {
//		return response.json();
//	})
//	
//	// render sunrise per day
//	.then(function(response) {
//
//		// show full JSON object
//		console.log(response.list);
//
//		for(var i = 0; i < response.list.length; i++) {
//			console.log(response.list[i]);
//			//console.log(response.list[i].dt);
//			//console.log(response.list[i].dt_txt);
//			// etc.
//		}
//
//	})
//  var sunriseBox = document.getElementById('sunrise');
//  sunriseBox.innerHTML = 
//	
////	// catch error < zet dit er ook bij
////	.catch(function (error) {
////		console.error('Request failed', error);
////	});
////}
//
//function onAPISucces2(response) {
//
//	// get all temps (now)
//	var now = response.list[0].main;
//
//	//console.log(now);
//
//	// get type of sunrise in string format
//	var type = response.list[0].sunrise[0].main
//
//	//console.log(response.list[0]);
//    var sunrise = response.list[0].sunrise.main
//
//
//	// render sunrise in DOM
//	var sunriseBox = document.getElementById('sunrise');
//  sunriseBox.innerHTML = 
//}
//
//// init data stream < zet dit er ook bij
//getAPIdata2();
