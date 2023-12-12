// Dataset
var nobelData = [
  {key:'United States', value:336}, 
  {key:'United Kingdom', value:98}, 
  {key:'Germany', value:79}, 
  {key:'France', value:60}, 
  {key:'Sweden', value:29}, 
  {key:'Switzerland', value:23}, 
  {key:'Japan', value:21}, 
  {key:'Russia', value:19}, 
  {key:'Netherlands', value:17}, 
  {key:'Austria', value:14}
];

// Variables for Environment
var chartHolder = d3.select('#barchart');

var margin = {top:20, right:20, bottom:30, left:40};
var boundingRect = chartHolder.node().getBoundingClientRect(); 
var width = boundingRect.width - margin.left - margin.right; 
var height = boundingRect.height - margin.top - margin.bottom;
var barWidth = width/nobelData.length;
let maxWinners = d3.max(nobelData, d => +d.value);

// Variables for Axes
let xscale = d3
  .scaleBand()
  .domain(nobelData.map(d => d.key))
  .range([0, width]);
var xaxis = d3.axisBottom().scale(xscale);

let yscale = d3.scaleLinear()
  .domain([0, maxWinners]) /* [0, 336] */
  .range([height, 0]);
var yaxis = d3.axisLeft().scale(yscale);



// Create Chart 
var svg = d3.select('#barchart').append("svg") 
  .attr("width", width + margin.left + margin.right) 
  .attr("height", height + margin.top + margin.bottom) 
  .append("g").classed('chart', true) 
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg
  .selectAll('rect')
  .data(nobelData)
  .enter()
  .append('rect').classed('bar', true)
  .attr('height', d => d.value)
  .attr('width', barWidth/1.5)
  .attr('y', d => height - d.value)
  .attr('x', (d, i) => i * (barWidth) + barWidth/6)
  .attr("stroke-width",2)
  .attr("stroke", "white")

// Create Axes
svg.append("g").attr("id","y-axis")
  .call(yaxis);

svg.append("g").attr("id","x-axis")
  .attr('transform','translate(0,' + height + ')')
  .call(xaxis)
  .selectAll("text")
    .attr("y", 2)
    .attr("x", -9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(-65)")
    .style("text-anchor", "end");

