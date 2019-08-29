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
    // On error pass err to callback
    if (err) return callback(err, null);
    // On success, pass ip to callback
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  })
};

module.exports = { fetchMyIP };