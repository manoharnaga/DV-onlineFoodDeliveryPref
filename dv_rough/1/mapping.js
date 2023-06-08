

var map_d3747cd81334af7a3d473810d0d98e8c = L.map(
    "map_d3747cd81334af7a3d473810d0d98e8c",
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
).addTo(map_d3747cd81334af7a3d473810d0d98e8c);


// var circle = L.circle([12.9766, 77.5993], {
//     color: 'red',
//     fillColor : '#f03',
//     fillOpacity: 0.3,
//     radius: 1000
// }).addTo(map_d3747cd81334af7a3d473810d0d98e8c);

// var marker_e6afd113597d1576d1c802d7b2696105 = L.marker(
//     [12.9766, 77.5993],
//     {}
// ).addTo(map_d3747cd81334af7a3d473810d0d98e8c);

var geojsonFeature  = {
    "type" : "Feature",
    "properties" : {
        "name" : "Hello world",
        "amenity" : "Nothing",
        "popupContent" : "This is popup",
    },
    "geometry": {
        "type" : "Point",
        "coordinates" : [12.9766, 77.5993]
    }
};

var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

L.geoJSON(geojsonFeature, {
    style: myStyle
}).addTo(map_d3747cd81334af7a3d473810d0d98e8c)

