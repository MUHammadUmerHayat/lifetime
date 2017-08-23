let currentGeocoder;
let myLatlng;

navigator.geolocation.getCurrentPosition((position, html5Error) => {
  const geoLoc = processGeolocationResult(position);
  const currLatLong = geoLoc.split(',');
  initializeCurrent(currLatLong[0], currLatLong[1]);
});

// Get geo location result

function processGeolocationResult(position) {
  const html5Lat = position.coords.latitude; // Get latitude
  const html5Lon = position.coords.longitude; // Get longitude
  return `${(html5Lat).toFixed(8)}, ${(html5Lon).toFixed(8)}`;
}

// Check value is present or not & call google api function

function initializeCurrent(latcurr, longcurr) {
  currentGeocoder = new window.google.maps.Geocoder();

  if (latcurr !== '' && longcurr !== '') {
    myLatlng = new window.google.maps.LatLng(latcurr, longcurr);
  }
}

// Get current address
/* eslint-disable import/prefer-default-export */
export function getCurrentAddress(location, callback) {
  const loc = location || myLatlng;

  currentGeocoder.geocode({
    location: loc,
  }, (results, status) => {
    if (status === window.google.maps.GeocoderStatus.OK) {
      callback(results[0].formatted_address);
    } else {
      callback(null, `Geocode was not successful for the following reason: ${status}`);
    }
  });
}
