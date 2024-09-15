import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import hbs from "hbs";
import { geocode } from "../src/utils/geocode.mjs";
import { forecast } from "../src/utils/forecast.mjs";

const app = express();

const publicDirectoryPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public"
);

const viewsPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../templates/views"
);

const partialsPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../templates/partials"
);

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Adam",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Adam",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Adam Smith",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(
        latitude,
        longitude,
        (error, { currentTemp, feelsLike } = {}) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            location,
            currentTemp,
            feelsLike,
          });
        }
      );
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Adam Smith",
    errMsg: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Adam Smith",
    errMsg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
