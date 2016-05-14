var Place = require('../../place.model');
var isNumeric = require('is-numeric');

module.exports = function(request, response) {
  if (Object.keys(request.params).length === 0) {
    return response.send(400, 'Invalid params.');
  }

  var latitute = request.params.latitude;
  var longitude = request.params.longitude;
  var maxDistance = 100;

  if (!isNumeric(latitute) || !isNumeric(longitude)) {
    return response.send(400, 'Invalid latitude or longitude.');
  }

  var coords = [longitude, latitute];
  console.log("coords: " + coords);

  Place.find({
    loc: {
      $near: coords,
      $maxDistance: maxDistance
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
