const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/hour", async (req, res, next) => {
  try {
    const response = await fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/day", async (req, res, next) => {
  try {
    const response = await fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/week", async (req, res, next) => {
  try {
    const response = await fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/month", async (req, res, next) => {
  try {
    const response = await fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const students = await Student.findAll({
      include: Campus,
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
