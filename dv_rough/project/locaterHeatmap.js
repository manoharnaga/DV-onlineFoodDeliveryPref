// mapid is the id of the div where the map will appear
var map = L.map("mapid").setView([12.9716, 77.5946], 12); // center position + zoom
var circlePtr = null;
var locaterRadius = 1500;
function setLocaterRadius() {
  const inpRadius = document.querySelector("#locaterRadius").value;
  circlePtr?.setRadius(inpRadius);
  locaterRadius = inpRadius;
  console.log(document.querySelector("#showRadius").value);
  document.querySelector("#showRadius").innerHTML =
    "Current Radius:  " + inpRadius.toString();
}

// Add a tile to the map = a background. Comes from OpenStreetmap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  maxZoom: 19,
}).addTo(map);

// Add a svg layer to the map
L.svg().addTo(map);
function pieChart(){
  
}


async function temp() {
  const dataTemp = await d3.csv("./onlinedeliverydata.csv");

  var dataTemp2 = [];
  dataTemp.forEach((d) => {
    dataTemp2.push({
      long: d.longitude,
      lat: d.latitude,
    });
  });
  const data = dataTemp2;

  data.forEach((d) => {
    var lat = d.lat;
    var lng = d.long;
    L.circle([lat, lng], {
      color: "black",
      fillColor: "black",
      fillOpacity: 1,
      radius: 120,
      name: "P-2",
      interactive: true,
    }).addTo(map);
    //   L.marker([lat, lng]).addTo(map);
  });

  map.on("click", function (e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    circlePtr?.remove();
    // Add a marker to the map at the clicked location

    circlePtr = L.circle([lat, lng], {
      color: "blue",
      fillColor: "blue",
      fillOpacity: 0.3,
      radius: locaterRadius,
      name: "P-1",
      interactive: true,
    }).addTo(map);

    const dataHeat = [];
    dataTemp.forEach((d) => {
      // calculate distance between the two points
      var R = 6371e3; // metres
      var φ1 = (lat * Math.PI) / 180; // φ, λ in radians
      var φ2 = (d.latitude * Math.PI) / 180;
      var Δφ = ((d.latitude - lat) * Math.PI) / 180;
      var Δλ = ((d.longitude - lng) * Math.PI) / 180;
      var a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var dist = R * c; // in metres

      if (dist <= locaterRadius) {
        dataHeat.push(d);
      }
    });

    // heatMap(dataHeat);
  });
}
temp();