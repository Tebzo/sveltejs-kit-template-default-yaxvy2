<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>GPS Tracking Data Visualization</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
  </head>
  <body>
    <h1>GPS Tracking Data Visualization</h1>
    <p>Name: Tom N</p>
    <p>University: [Your University]</p>
    <p>Student Number: [Your Student Number]</p>
    <div id="map"></div>
    <select id="car-select"></select>
    <script>
      // Define the size of the map
      const width = 600;
      const height = 600;

      // Create an SVG element to hold the map
      const svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // Define the projection for the map (e.g. Mercator projection)
      const projection = d3.geoMercator()
        .scale(120)
        .translate([width / 2, height / 2]);

      // Define the path generator for the map
      const path = d3.geoPath()
        .projection(projection);

      // Load the GPS tracking data from the CSV file located at the URL
      d3.csv("https://vda-lab.github.io/assets/vast2021_gps_coordinates.json").then(function(data) {
        // Convert latitude and longitude to numeric values
        data.forEach(function(d) {
          d.lat = +d.lat;
          d.lon = +d.lon;
        });

        // Create a group for the GPS tracking data
        const gpsGroup = svg.append("g")
          .attr("class", "gps-data")
          .attr("opacity", 0.5);

        // Draw the GPS tracking data as circles on the map
        gpsGroup.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
          })
          .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
          })
          .attr("r", 2)
          .attr("fill", "black");

        // Group the GPS tracking data by car
        const cars = d3.group(data, d => d.car);

        // Create an array of cars to use in the dropdown box
        const carNames = Array.from(cars.keys());

        // Create a dropdown box for selecting a car
        const carSelect = d3.select("#car-select")
          .selectAll("option")
          .data(carNames)
          .enter()
          .append("option")
          .attr("value", function(d) { return d; })
          .text(function(d) { return d; });

        // Create groups for each type of point of interest
        const poiGroups = {};
        data.forEach(function(d) {
          if (!(d.poi_type in poiGroups)) {
            poiGroups[d.poi_type] = svg.append("g")
              .attr("class", "poi-" + d.poi_type);
          }
        });

        // Draw the points of interest as circles on the map, with different colours for each type
        for (const [poiType, poiGroup] of Object.entries(poiGroups)) {
          poiGroup.selectAll("circle")
            .data(data.filter(d => d.poi_type === poiType))
            .enter()
           
