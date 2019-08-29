const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (err, res, body) => {
    // Error can be set if invalid domain, user is offline, etc.
    if (err) return callback(err, null);
    // If non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response:\n ${body}`;
      callback(Error(msg).toString(), null);
      return;
    }
    // On success, pass ip to callback
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (err, res, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (err) return callback(err, null);
    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status code ${res.statusCode} when fetching coords for IP. Response:\n ${body}`;
      callback(Error(msg).toString(), null);
      return;
    }

    const data = JSON.parse(body).data;
    const coords = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    callback(err, coords);
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const LAT = coords.latitude;
  const LONG = coords.longitude;
  const PASSES = 5;
  request(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LONG}&n=${PASSES}`, (err, res, body) => {
    if (err) return callback(err, null);
    if (res.statusCode !== 200) {
      const msg = `Status code ${res.statusCode} when fetching fly-over times. Response:\n ${body}`;
      callback(Error(msg).toString(), null);
      return;
    }
    const data = JSON.parse(body).response;
    callback(null, data);
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };