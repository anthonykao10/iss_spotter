const request = require('request-promise-native');


/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org/?format=json');
};


/* 
 * Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};


/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from ipvigilante.com
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const { latitude: LAT, longitude: LONG } = JSON.parse(body).data;
  const PASSES = 5;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LONG}&n=${PASSES}`);
};


// const nextISSTimesForMyLocation = function() {
//   fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(passes => {
//     console.log(passes);
//   });
// };


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };