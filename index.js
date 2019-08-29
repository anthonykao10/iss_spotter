const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((err, ip) => {
//   if (err) {
//     console.log("It didn't work!\n" , err);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

fetchCoordsByIP('162.245.144.188', (err, data) => {
  if (err) {
    console.log("It didn't work!\n" , err);
    return;
  }
  console.log('It worked! Returned coords:' , data);
});