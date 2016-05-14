var Place = require('../../place.model');
var isNumeric = require('is-numeric');

module.exports = function(request, response) {
  if (Object.keys(request.params).length === 0) {
    return response.send(400, 'Invalid params.');
  }

  var radiusInKm = 1;
  var kilometersPerDegree = 111.2;
  var longitude = request.params.longitude;
  var latitute = request.params.latitude;

  if (!isNumeric(latitute) || !isNumeric(longitude)) {
    return response.send(400, 'Invalid latitude or longitude.');
  }

  Place.find({
    loc: {
      $near: [longitude, latitute],
      $maxDistance: radiusInKm / kilometersPerDegree
    }
  }).exec(function(err, places) {
    if (err) {
      return console.error(err);
    }

    console.log("Places found: " + places.length);
    console.log(places);

    if (places.length === 0) {
      return response.send(204);
    }

    return response.send(places);
  });
};
