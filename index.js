const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log("It didn't work!\n" , err);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('162.245.144.188', (err, coords) => {
//   if (err) {
//     console.log("It didn't work!\n" , err);
//     return;
//   }
//   console.log('It worked! Returned coords:' , coords);
// });

fetchISSFlyOverTimes({latitude: '49.27670', longitude: '-123.13000'}, (err, flyOverTimes) => {
  if (err) {
    console.log("It didn't work!\n" , err);
    return;
  }
  console.log('It worked! Returned fly-over times:\n' , flyOverTimes);
});