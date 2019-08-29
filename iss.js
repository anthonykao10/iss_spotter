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

    let data = JSON.parse(body).data;
    let coords = {
      latitude: data.latitude,
      longitude: data.longitude
    };
    callback(err, coords);
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP };