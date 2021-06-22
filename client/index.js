var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
var MapboxGeocoder = require("@mapbox/mapbox-gl-geocoder");
import { addDataLayer, displayPopUp } from "./data-layer";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3ludGF4c2hhd3R5IiwiYSI6ImNrcTYxeG56ZjB3aXkybnBmeXhnMG9maTEifQ.NnUQP5iapMH7nISWNW68YQ";

//creates a new map
const map = new mapboxgl.Map({
  container: "map",
  center: [-156.009, 60.705],
  style: "mapbox://styles/mapbox/outdoors-v11",
  zoom: 1,
});

//creates and adds geocoder search bar to map
//search generates marker and zooms in
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  marker: {
    color: "black",
  },
  mapboxgl: mapboxgl,
  zoom: 6,
});

map.addControl(geocoder);

//adds zoom control feature to map
map.addControl(new mapboxgl.NavigationControl());

map.on("load", function () {
  addDataLayer(map);
});

map.on("click", "earthquake-layer", function (e) {
  displayPopUp(e).addTo(map);
});

// Change the cursor to a pointer when the mouse is over the earthquake layer.
map.on("mouseenter", "earthquake-layer", function () {
  map.getCanvas().style.cursor = "pointer";
});

// Change it back to a pointer when it leaves.
map.on("mouseleave", "earthquake-layer", function () {
  map.getCanvas().style.cursor = "";
});
