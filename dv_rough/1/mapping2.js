
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const margin = {
    top: 80,
    right: 10,
    bottom: 20,
    left: 90
};


const svg1 = d3.select('#svg1');
const width = +svg1.attr('width');
const height = +svg1.attr('height');
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const g = svg1.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);


const renderBarPlot = (data) => {

    d3.selectAll('.bar-plot-axis').remove();

    const groups = ['Non Veg', "Veg", "Snacks", "Sweets"];

    var x = d3.scaleBand()
        .domain(groups)
        .range([0, innerWidth])
        .padding([0.3]);

    g.append("g")
        .attr('class', 'bar-plot-axis')
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d['value'])) + 1])
        .range([innerHeight, 0]);

    g.append("g")
        .attr('class', 'bar-plot-axis')
        .call(d3.axisLeft(y));

    g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .transition()
        .duration(300)
        .attr('x', d => x(d['name']))
        .attr('y', d => y(d['value']))
        .attr('height', d => innerHeight - y(d['value']))
        .attr('width', x.bandwidth())
        .attr('fill', '#b0adff')
        .attr('stroke', '#8330ff');
}

var map = L.map(
    "map2",
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
).addTo(map);


var circle1 = L.circle([12.9770, 77.5773], {
    color: 'green',
    fillColor: '#81C784',
    fillOpacity: 0.4,
    radius: 2000,
    name: "P-1"

}).addTo(map);

var popup_20d9fd8d692a0c40c1e3b7ef8f96524b = L.popup({ "width": "50px" });
var html_a28ca6589235c98974223de64debe93a = $(`<div id="html_a28ca6589235c98974223de64debe93a" style="width: 100.0%; height: 100.0%;">Jayant Probikes & Fitness, 7, 2nd Cross Road, Gandhinagar, West Zone, Bengaluru, Bangalore North, Bangalore Urban, Karnataka, 560009, India</div>`)[0];
popup_20d9fd8d692a0c40c1e3b7ef8f96524b.setContent(html_a28ca6589235c98974223de64debe93a);
circle1.bindPopup(popup_20d9fd8d692a0c40c1e3b7ef8f96524b);



// ! Circle 1

const data1 = [
    {
        name: "Non Veg",
        value: 32
    },
    {
        name: "Veg",
        value: 4
    }
];


circle1.on('mouseover', function (event) {
    renderBarPlot(data1);
    circle1.setStyle({
        color: 'green',
        fillColor: '#81C784',
        fillOpacity: 0.8,
        radius: 611
    })

}).on('mouseout', function () {
    d3.selectAll('rect')
        .transition()
        .duration(300)
        .attr('height', 1)
        .attr('width', 1)
        .remove();

    circle1.setStyle({
        color: 'green',
        fillColor: '#81C784',
        fillOpacity: 0.3,
        radius: 611
    })

    // d3.selectAll('.bar-plot-axis').remove();
})


// ! Circle 2

const data2 = [
    {
        name: "Non Veg",
        value: 11
    },
    {
        name: "Veg",
        value: 5
    }
];
var circle2 = L.circle([12.9783, 77.6408], {
    color: 'green',
    fillColor: '#81C784',
    fillOpacity: 0.4,
    radius: 888
}).addTo(map);

circle2.on('mouseover', function (e) {
    renderBarPlot(data2);

    circle2.setStyle({
        fillOpacity: 0.8,
    })

}).on('mouseout', function () {
    d3.selectAll('rect')
        .transition()
        .duration(300)
        .attr('height', 10)
        // .attr('width', 10)
        .remove();

    circle2.setStyle({
        fillOpacity: 0.3,
    })

    // d3.selectAll('.bar-plot-axis').remove();

})

// ! Circle 3

const data3 = [
    {
        name: "Non Veg",
        value: 11
    },
    {
        name: "Veg",
        value: 3
    }
];

const circle3 = L.circle([12.9850, 77.5533], {
    color: 'green',
    fillColor: '#81C784',
    fillOpacity: 0.3,
    radius: 777
}).addTo(map);
circle3.on('mouseover', function () {
    renderBarPlot(data3);

}).on('mouseout', function () {
    d3.selectAll('rect')
        .transition()
        .duration(300)
        .attr('height', 10)
        .attr('width', 10)
        .remove();

});

// ! Circle 4

const data4 = [
    {
        name: "Non Veg",
        value: 11
    },
    {
        name: "Veg",
        value: 1
    }
];

const circle4 = L.circle([12.8845, 77.6036], {
    color: 'green',
    fillColor: '#81C784',
    fillOpacity: 0.3,
    radius: 666
}).addTo(map);
circle4.on('mouseover', function () {
    renderBarPlot(data4);

}).on('mouseout', function () {
    d3.selectAll('rect')
        .transition()
        .duration(300)
        .attr('height', 10)
        .attr('width', 10)
        .remove();

    // d3.selectAll('.bar-plot-axis').remove();
});

// ! Circle 5

const data5 = [
    {
        name: "Non Veg",
        value: 8
    },
    {
        name: "Veg",
        value: 3
    },
    {
        name: "Snacks",
        value: 5
    }
];

const circle5 = L.circle([12.9369, 77.6407], {
    color: 'green',
    fillColor: '#81C784',
    fillOpacity: 0.3,
    radius: 611
}).addTo(map);

circle5.on('mouseover', function () {
    circle5.setStyle({
        color: 'green',
        fillColor: '#81C784',
        fillOpacity: 0.8,
        radius: 611
    })
    renderBarPlot(data5);

}).on('mouseout', function () {

    circle5.setStyle({
        color: 'green',
        fillColor: '#81C784',
        fillOpacity: 0.3,
        radius: 611
    })
    d3.selectAll('rect')
        .transition()
        .duration(300)
        .attr('height', 10)
        .attr('width', 10)
        .remove();

    // d3.selectAll('.bar-plot-axis').remove();
});


L.circle([12.9261, 77.6221], {
    color: 'green',
    fillColor: '#81C784',
    fillOpacity: 0.3,
    radius: 611
}).addTo(map);


L.circle([12.9048, 77.6821], {
    color: 'green',
    fillColor: '#81C784',
    fillOpacity: 0.3,
    radius: 500
}).addTo(map);

L.circle([12.9706, 77.6529], {
    color: 'green',
    fillColor: '#81C784',
    fillOpacity: 0.3,
    radius: 500
}).addTo(map);


L.circle([12.9766, 77.5993], {
    color: 'green',
    fillColor: '#81C784',
    fillOpacity: 0.3,
    radius: 444
}).addTo(map);

L.circle([13.0206, 77.6479], {
    color: 'green',
    fillColor: '#81C784',
    fillOpacity: 0.6,
    radius: 444
}).addTo(map);










