import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';
import Sankey from './Sankey';
const ageMealData = require("../data/age-meal.json");
const incomeMealData = require('../data/income-meal.json');

export default function Age_meal_barplot() {

    const [plot, setPlot] = useState("age");

    const svgRef = useRef();
    const svgRef2 = useRef();

    const width = 700;
    const height = 550;

    const margin = {
        top: 70,
        right: 30,
        bottom: 60,
        left: 90
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const renderPlot1 = () => {
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const subgroups = [
            "Breakfast", "Lunch", "Dinner", "Snacks"
        ];

        var groups = ["18-20", "21-23", "24-26", "27-29", "30-32"]
        const colors = ['#7B1FA2', '#9C27B0', '#BA68C8', '#E1BEE7'];

        renderGroupedBarPlot(ageMealData, subgroups, groups, svg, 60, colors,
            "Meal Consumption by Age Group: A Groped Bar Char", "Age Groups", "Percentage");

    }

    const renderPlot2 = () => {
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const subgroups = [
            "Breakfast", "Lunch", "Dinner", "Snacks"
        ];

        var groups = ['No Income', "Below Rs 10000", "More than 50000",
            "10001 to 25000", "25001 to 25000"];

        const colors = ['#0277BD', '#039BE5', '#4FC3F7', '#81D4FA'];

        renderGroupedBarPlot(incomeMealData, subgroups, groups, svg, 60, colors,
            "Meal Consumption by Income level: A Grouped Bar Char", "Income level", "Count");
    }



    const renderGroupedBarPlot = (data, subgroups, groups, svg, max, colors, title, xlabel, ylabel) => {

        svg.selectAll('g').remove();

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);


        var x = d3.scaleBand()
            .domain(groups)
            .range([0, innerWidth])
            .padding([0.15]);

        const xAxis = d3.axisBottom(x).tickSize(10);

        const xAxisG = g.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${innerHeight})`)
            // .selectAll('text')
            // .attr('transform', 'rotate(-25)')
            // .attr("text-anchor", "end")
            .append('text')
            .attr('y', 50)
            .attr('x', innerWidth / 2)
            .text(xlabel)
            .attr('fill', 'black')
            .style('font-size', '20px');


        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, max])
            .range([innerHeight, 0])
            .nice();

        const yAxis = d3.axisLeft(y).tickFormat((d) => d + "%")

        const yAxisG = g.append('g')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -50)
            .text(ylabel)
            .attr('fill', 'black')
            .style('font-size', '20px');

        g.append('text')
            .classed('h4', true)
            .attr("x", innerWidth / 2)
            .attr("y", -40)
            .text(title)
            .attr("text-anchor", "middle");


        // Another scale for subgroup position?
        var xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.1])

        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(colors);


        g.selectAll('my-dots')
            .data(subgroups)
            .enter()
            .append('circle')
            .attr('cx', innerWidth / 1.2)
            .attr('cy', function (d, i) { return 10 + i * 30 })
            .transition()
            .duration(400)
            .attr('r', 7)
            .style('fill', function (d, i) { return color(d) })
            .delay(function (d, i) { return (i * 300) });

        g.selectAll('my-labels')
            .data(subgroups)
            .enter()
            .append('text')
            .attr('x', innerWidth / 1.2 + 20)
            .attr('y', function (d, i) { return 17 + i * 30 })
            .attr('opacity', 0.3)
            .transition()
            .duration(400)
            .text(function (d) { return d })
            .delay(function (d, i) { return i * 300 })
            .attr('opacity', 1);

        // Show the bars
        g.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .enter()
            .append("g")

            .attr("transform", function (d) {
                return "translate(" + x(d.group) + ",0)";
            })

            .selectAll("rect")
            .data(function (d) {
                return subgroups.map(function (key) {
                    return { key: key, value: d[key] };
                });
            })

            .enter()
            .append("rect")
            .attr("x", function (d) {
                return xSubgroup(d.key);
            })
            .attr('y', y(1))
            .attr("width", xSubgroup.bandwidth())
            .transition()
            .duration(1000)
            .attr("y", function (d) {
                return y(d.value) - 10;
            })
            .attr("height", function (d) {
                return innerHeight - y(d.value);
            })
            .attr("fill", function (d) {
                return color(d.key);
            })
            .attr('rx', 5)
            .delay(function (d, i) { return (i * 300) });

    }

    const handleRadioOnChange = (event) => {
        setPlot(event.target.value);


    }

    useEffect(() => {

        plot === "age" ? renderPlot1() : renderPlot2();




    }, [plot])



    return (
        <>



            <div className='my-5 p-5'>

                <div className='ms-5'>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" defaultChecked value="age" onChange={handleRadioOnChange} />
                        <label className="form-check-label">Age Group</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" value="income" onChange={handleRadioOnChange} />
                        <label className="form-check-label">Income Level</label>
                    </div>
                </div>

                <div className="row" style={{ "paddingTop": "2%" }}>

                    <div className="col-6">
                        <div className='svg-container-1'>
                            <svg ref={svgRef} id='svg1'></svg>
                        </div>
                    </div>

                    <div className="col-4">
                        <h3 className='display-4 my-4 fw-bold'>Snacks Take the Lead</h3>
                        
                        <p className='fs-5 mt-4' style={{ "textAlign": "justify", "textJustify": "inter-word" }}> When it comes to online food delivery, snacks are the clear winner across all age groups and income levels. </p>

                        <p className='fs-5 mt-4' style={{ "textAlign": "justify", "textJustify": "inter-word" }}>While breakfast, lunch, and dinner orders are a part of the mix, it's the snacks that have emerged as the preferred choice for many. Regardless of whether you're a student with no income or a high-earning professional, the data indicates that snacks are the go-to option when ordering food online. </p>

                        <hr className='hr hr-blurry mt-5'/>

                    </div>

                </div>

            </div >

        </>
    )
}
