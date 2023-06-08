import React, { useState, useRef } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, Circle, useMapEvent, useMapEvents } from 'react-leaflet';

import * as d3 from 'd3';
import cloud from 'd3-cloud';

const deliveryData = require('../data/data.json');

export default function MapLocater() {

    const [radius, setRadius] = useState(1500);
    const svgRef = useRef();
    const [plot, setPlot] = useState("");

    const handleOnRadiusChange = (event) => {
        // console.log(event.target.value);
        setRadius(event.target.value);
    }

    const handleOnClick = (event) => {
        // console.log("Hello");
        console.log(event.target.value);
    }

    const handleHeatMapClick = () => {
        setPlot("heatmap");
        renderHeatMap(dataInsideCircle);
    }

    const handlePieChartClick = () => {
        setPlot("pie");
        renderPieChart(dataInsideCircle, "Meal(P1)", "#pie1")
    }

    const handleReviewsWordCloudClick = () => {
        setPlot("wordCloud");
        renderWordCloud(dataInsideCircle);
    }


    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const [dataInsideCircle, setDataInsideCircle] = useState([]);
    const [array_word, set_array_word] = useState([]);

    function MyComponent() {
        const map = useMapEvents({
            click: (e) => {
                var lat = e.latlng.lat;
                var lng = e.latlng.lng;
                setLat(lat);
                setLng(lng);

                const dataTemp = [];
                deliveryData.map((d) => {
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

                    if (dist <= radius) {
                        dataTemp.push(d);
                    }

                })

                setDataInsideCircle(dataTemp);

                // console.log(dataInsideCircle);

            }
        });
    }



    function AllCircles() {
        deliveryData.map((data) => {
            const lat = data['latitude'];
            const lng = data['longitude'];
            // console.log(data['latitude'], data['longitude']);

            <Circle center={[lat, lng]} pathOptions={{ "color": "red", "opacity": "0.1", "name": "P-2", "interactive": "true" }} radius="1000" />
        })
    }

    const renderHeatMap = (dataHeat) => {
        // d3.selectAll(".heatmap").remove();

        const n = dataHeat.length;

        // set the dimensions and margins of the graph
        var margin = { top: 30, right: 30, bottom: 130, left: 130 },
            width = 650 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;


        d3.selectAll("g.heatmap").remove();
        d3.selectAll("g.pieChart").remove();
        d3.selectAll('.wc').remove();


        // append the svg object to the body of the page
        var svg = d3.select(svgRef.current)
            .attr("class", "heatmap")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class", "heatmap")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        // Labels of row and columns
        var myGroups = [
            "Time saving",
            "More Offers and Discount",
            "Health Concern",
            "Poor Hygiene",
            "Delay of delivery person getting assigned",
            "Wrong order delivered",
        ];

        var myVars = [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree",
            "Strongly agree",
        ];

        var dataHeat2 = [];
        for (let i = 0; i < myGroups.length; i++) {
            for (let j = 0; j < myVars.length; j++) {
                let newObj = { group: myGroups[i], variable: myVars[j], value: 0 };
                dataHeat2.push(newObj);
            }
        }

        for (let i = 0; i < dataHeat.length; i++) {
            const elem = dataHeat[i];
            for (let j = 0; j < myGroups.length; j++) {
                for (let k = 0; k < dataHeat2.length; k++) {
                    if (
                        dataHeat2[k].group === myGroups[j] &&
                        dataHeat2[k].variable === elem[myGroups[j]]
                    ) {
                        dataHeat2[k].value += 1;
                    }
                }
            }
        }

        const data = dataHeat2;

        // Build X scales and axis:
        var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);
        svg
            .append("g")
            .attr("class", "heatmap")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Build X scales and axis:
        var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
        svg.append("g").attr("class", "heatmap").call(d3.axisLeft(y));

        // Build color scale
        var myColor = d3
            .scaleLinear()
            .range(["white", "red"])
            .domain([1, 30]);

        // create a tooltip
        var tooltip = d3
            .select("#heatmap")
            .append("div")
            .attr("class", "heatmap")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px");

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function (d) {
            tooltip.style("opacity", 1);
        };
        var mousemove = function (e, d) {
            tooltip
                .html(d.value)
                .style("left", e.pageX + "px")
                .style("top", e.pageY + margin.top + "px");
        };
        var mouseleave = function (d) {
            tooltip.style("opacity", 0);
        };

        // add the squares
        svg
            .selectAll()
            .data(data, function (d) {
                return d.group + ":" + d.variable;
            })
            .enter()
            .append("rect")
            .attr("class", "heatmap")
            .attr("x", function (d) {
                return x(d.group);
            })
            .attr("y", function (d) {
                return y(d.variable);
            })
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .transition()
            .duration(500)
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) {
                return myColor(+d["value"]);
            })
            .delay(function (d, i) {
                return 20 * i;
            });
    }

    const renderPieChart = (dataPie, preference, pie_id) => {


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

        d3.selectAll("g.heatmap").remove();
        d3.selectAll("g.pieChart").remove();
        d3.selectAll('.wc').remove();


        // Append the SVG canvas to the page
        var svg = d3.select(svgRef.current)
            .attr("class", "pieChart")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("class", "pieChart")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // svg.append('text')
        //     .classed('h4', true)
        //     .attr("x", 0)
        //     .attr("y", -100)
        //     .text("Hello")
        //     .attr("text-anchor", "middle");

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

    function printFrequency(str) {
        let arr = [];

        let M = new Map();
        let word = "";
        const stopwords = ["nil", 'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't", 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', "can't", 'cannot', 'com', 'could', "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing', "don't", 'down', 'during', 'each', 'else', 'ever', 'few', 'for', 'from', 'further', 'get', 'had', "hadn't", 'has', "hasn't", 'have', "haven't", 'having', 'he', "he'd", "he'll", "he's", 'her', 'here', "here's", 'hers', 'herself', 'him', 'himself', 'his', 'how', "how's", 'http', 'i', "i'd", "i'll", "i'm", "i've", 'if', 'in', 'into', 'is', "isn't", 'it', "it's", 'its', 'itself', 'just', 'k', "let's", 'like', 'me', 'more', 'most', "mustn't", 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'r', 'same', 'shall', "shan't", 'she', "she'd", "she'll", "she's", 'should', "shouldn't", 'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', "there's", 'these', 'they', "they'd", "they'll", "they're", "they've", 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', "wasn't", 'we', "we'd", "we'll", "we're", "we've", 'were', "weren't", 'what', "what's", 'when', "when's", 'where', "where's", 'which', 'while', 'who', "who's", 'whom', 'why', "why's", 'with', "won't", 'would', "wouldn't", 'www', 'you', "you'd", "you'll", "you're", "you've", 'your', 'yours', 'yourself', 'yourselves', '?', '(', ')']

        for (let i = 0; i < str.length; i++) {
            if (str[i] === " ") {
                if (word && !stopwords.includes(word.toLowerCase())) {
                    const lowerWord = word.toLowerCase();
                    if (!M.has(lowerWord)) {
                        M.set(lowerWord, 1);
                    } else {
                        M.set(lowerWord, M.get(lowerWord) + 1);
                    }
                }
                word = "";
            } else {
                word += str[i];
            }
        }

        if (word && !stopwords.includes(word.toLowerCase())) {
            const lowerWord = word.toLowerCase();
            if (!M.has(lowerWord)) {
                M.set(lowerWord, 1);
            } else {
                M.set(lowerWord, M.get(lowerWord) + 1);
            }
        }


        // sorting map key in increasing order
        M = new Map([...M.entries()].sort());
        for (let [key, value] of M) {
            // arr.push(`${key} :${value}`);
            arr.push({ word: key, size: value });
        }

        set_array_word(arr);

    }

    const renderWordCloud = (data) => {

        d3.selectAll("g.heatmap").remove();
        d3.selectAll("g.pieChart").remove();
        d3.selectAll('.wc').remove();

        data.forEach((d) => {
            const Rev = d.Reviews;
            printFrequency(Rev, array_word);
            console.log(array_word);


            const sortedWords = array_word.sort((a, b) => b.size - a.size);
            const top10Words = sortedWords.slice(0, 60);
            // console.log("top10", top10Words)

            var layout = cloud()
                .size([500, 500])
                .words(top10Words.map(function (di) { return { text: di.word, size: di.size }; }))
                .padding(5)        //space between words
                .rotate(function () { return ~~(Math.random() * 2) * 90; })
                .fontSize(function (d) { return d.size * 20; })      // font size of words
                .on("end", draw);

            function draw(words) {
                d3.select(svgRef.current)
                    .append("g")
                    .attr("class", "wc")
                    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function (d) { return d.size; })
                    .style("fill", "#69b3a2")
                    .attr("text-anchor", "middle")
                    .style("font-family", "Impact")
                    .attr("transform", function (d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function (d) { return d.text; });
            }

            d3.selectAll(".wc").remove()
            layout.start();

        })

    }


    return (
        <>

            <div className='my-5 p-5 gray-bg'>

                <div className="row">

                    <div className="col-md-6">

                        <div style={{ "width": "50%" }}>
                            <label htmlFor="customRange1" className="form-label">Select radius
                            </label>
                            <input type="range" className="form-range" id="customRange1" value={radius} onChange={handleOnRadiusChange} min="500" max="15000" />
                        </div>

                        <div className='map-2'>
                            <MapContainer
                                className='shadow-5-strong'
                                center={[12.9716, 77.5946]}
                                // crs = {L.CRS.EPSG3857}
                                zoom={13}
                                zoomControl={true}
                                preferCanvas={false}>

                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />

                                <MyComponent />

                                {

                                    deliveryData.map((item) => {
                                        const lat = item['latitude'];
                                        const lng = item['longitude'];
                                        // console.log(lat, lng);

                                        return <Marker position={[lat, lng]} />
                                    })

                                }

                                {
                                    <Circle center={[lat, lng]} pathOptions={{ "color": "red", "opacity": "0.4", "name": "P-1", "interactive": "true" }} radius={radius} />

                                }


                            </MapContainer>
                        </div>
                    </div>

                    <div className="col-md-6">

                        <button className='btn btn-primary btn-sm' onClick={handleHeatMapClick}>Heatmap</button>
                        <button className='btn btn-primary btn-sm ms-5' onClick={handlePieChartClick}>Pie chart</button>
                        <button className='btn btn-primary btn-sm ms-5' onClick={handleReviewsWordCloudClick}>Reviews Word Cloud</button>


                        <div className='my-5'>
                            {plot == "pie" &&
                                <h3 className='my-3 fw-bold' style={{ "marginLeft": "150px" }}>Meal Preferences</h3>
                            }

                            {plot == "heatmap" &&
                                <h3 className='my-3 fw-bold ' style={{ "marginLeft": "150px" }}>Factors influencing online ordering</h3>
                            }

                            { plot == "wordCloud" && 
                                <h3 className='my-3 fw-bold' style={{ "marginLeft": "150px" }}>User Reviews</h3>
                            }
                            

                            <div className='svg-container-1'>
                                <svg ref={svgRef} id='svg1'></svg>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}
