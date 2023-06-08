// var p = "Meal(P1)";
// d3.selectAll(".pieChart").remove();
// pieChart(dataPie, p, "#pie1");
function pieChart(dataPie, preference, pie_id) {
  console.log(dataPie, preference, pie_id);
  // Set the dimensions of the canvas
  var width = 500;
  var height = 500;
  var radius = Math.min(width, height) / 2;

  // Define the color scale
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  var dataTemp = [{ Snacks: 0 }, { Lunch: 0 }, { Dinner: 0 }, { Breakfast: 0 }];

  for (var i = 0; i < dataPie.length; i++) {
    var meal = dataPie[i][preference];
    if (meal === "Snacks") {
      dataTemp[0][meal] += 1;
    } else if (meal === "Lunch") {
      dataTemp[1][meal] += 1;
    } else if (meal === "Dinner") {
      dataTemp[2][meal] += 1;
    } else if (meal === "Breakfast") {
      dataTemp[3][meal] += 1;
    }
  }

  var data = [];
  for (let i = 0; i < dataTemp.length; i++) {
    for (const pref in dataTemp[i]) {
      if (Object.hasOwnProperty.call(dataTemp[i], pref)) {
        if (dataTemp[i][pref]) {
          data.push({ label: pref, value: dataTemp[i][pref] });
        }
      }
    }
  }

  // Define the arc generator
  var arc = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  // Define the pie layout
  var pie = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d.value;
    });

  // Append the SVG canvas to the page
  var svg = d3
    .select(pie_id)
    .append("svg")
    .attr("class", "pieChart")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("class", "pieChart")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Add the arcs
  var g = svg
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "pieChart")
    .attr("class", "arc");

  g.append("path")
    .attr("class", "pieChart")
    .attr("d", arc)
    .style("fill", function (d) {
      return color(d.data.label);
    });

  // Add the text labels
  g.append("text")
    .attr("class", "pieChart")
    .attr("transform", function (d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .text(function (d) {
      return d.data.label;
    });
}
