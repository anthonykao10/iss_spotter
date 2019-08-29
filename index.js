const { fetchMyIP } = require('./iss');

fetchMyIP((err, ip) => {
  if (err) {
    console.log("It didn't work!\n" , err);
    return;
  } 
  console.log('It worked! Returned IP:' , ip);
});