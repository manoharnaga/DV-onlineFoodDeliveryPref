
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

var map2 = L.map(
    "map3",
    {
        center: [12.9716, 77.5946],
        crs: L.CRS.EPSG3857,
        zoom: 12,
        zoomControl: true,
        preferCanvas: false,
    }
);



var tile_layer_431fe1f1945f4804ac9a54b68213e05a = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { "attribution": "Data by \u0026copy; \u003ca target=\"_blank\" href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target=\"_blank\" href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false }
).addTo(map2);


var circle1 = L.circle([12.9770, 77.5773], {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.4,
    radius: 2000,
    name: "P-1"

}).addTo(map2);

var popup_20d9fd8d692a0c40c1e3b7ef8f96524b = L.popup({ "width": "50px" });
var html_a28ca6589235c98974223de64debe93a = $(`<div id="html_a28ca6589235c98974223de64debe93a" style="width: 100.0%; height: 100.0%;">Jayant Probikes & Fitness, 7, 2nd Cross Road, Gandhinagar, West Zone, Bengaluru, Bangalore North, Bangalore Urban, Karnataka, 560009, India</div>`)[0];
popup_20d9fd8d692a0c40c1e3b7ef8f96524b.setContent(html_a28ca6589235c98974223de64debe93a);
circle1.bindPopup(popup_20d9fd8d692a0c40c1e3b7ef8f96524b);


var circle2 = L.circle([12.9783, 77.6408], {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.4,
    radius: 1000,
    name: "P-1"

}).addTo(map2);

var circle3 = L.circle([12.9770, 77.5773], {
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.4,
    radius: 800,
    name: "P-1"

}).addTo(map2);

var circle4 = L.circle([13.0487, 77.5923], {
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.1,
    radius: 400,
    name: "P-1"
    
}).addTo(map2);


// 12.9770   77.5773      12
// 13.0487   77.5923       6
