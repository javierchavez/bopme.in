
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

// if (navigator.geolocation) {
//   var timeoutVal = 10 * 1000 * 1000;
//   navigator.geolocation.getCurrentPosition(
//     displayPosition, 
//     displayError,
//     { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
//   );
// }
// else {
//   alert("Geo-location is not supported by this browser");
// }

// function displayPosition(position) {
//   alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
// }

// function displayError(error) {
//   var errors = { 
//     1: 'Permission denied',
//     2: 'Position unavailable',
//     3: 'Request timeout'
//   };
//   alert("Error: " + errors[error.code]);
// }

