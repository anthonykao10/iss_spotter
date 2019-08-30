const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(passes => {
    for (let pass of passes) {
      let date = new Date(0);
      date.setUTCSeconds(pass.risetime);
      console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
    }
  })
  .catch((err) => {
    console.log("It didn't work: ", err.message);
  });