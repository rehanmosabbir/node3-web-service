import request from "postman-request";

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}&key=%20fe41b2db1695479686d90253240809%20`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to Weather service!", undefined);
    } else if (body.error) {
      callback(body.error.message, undefined);
    } else {
      callback(undefined, {
        currentTemp: body.current.temp_c,
        feelsLike: body.current.feelslike_c,
      });
    }
  });
};

export { forecast };
