// Select the svg area and add circles:
// d3.select("#mapid")
//   .select("svg")
//   .selectAll("myCircles")
//   .data(data)
//   .enter()
//   .append("circle")
//   .attr("cx", function (d) {
//     return map.latLngToLayerPoint([d.lat, d.long]).x;
//   })
//   .attr("cy", function (d) {
//     return map.latLngToLayerPoint([d.lat, d.long]).y;
//   })
//   .attr("r", 14)
//   .style("fill", "red")
//   .attr("stroke", "red")
//   .attr("stroke-width", 3)
//   .attr("fill-opacity", 0.4);

// // Function that update circle position if something change
// function update() {
//   d3.selectAll("circle")
//     .attr("cx", function (d) {
//       return map.latLngToLayerPoint([d.lat, d.long]).x;
//     })
//     .attr("cy", function (d) {
//       return map.latLngToLayerPoint([d.lat, d.long]).y;
//     });
// }

// If the user change the map (zoom or drag), I update circle position:
// map.on("moveend", update);


.range(["#E0F2F1", "#00695C"])
.style("fill", function (d) { return myColor(+d['value']) })
            .delay(function (d, i) { return 20 * i });
