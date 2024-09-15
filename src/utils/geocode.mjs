import request from "postman-request";

const geocode = (location, callback) => {
  const url = `https://geocode.maps.co/search?q=${encodeURIComponent(
    location
  )}&api_key=66de79c056d6d703243861feuc6ea32`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to Geocoding service!", undefined);
    } else if (body.length === 0) {
      callback("Unable to find location. Try another search!", undefined);
    } else {
      callback(undefined, {
        latitude: body[0]?.lat,
        longitude: body[0]?.lon,
        location: body[0]?.display_name,
      });
    }
  });
};

export { geocode };
