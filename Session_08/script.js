// Dataset
const data = d3.json("data.json");

data.then( function(data) {
  const chartHolder = d3.select('#barchart');
  
  // A function that update the chart
  function update(nobelData=data) {
    // Variables for Environment
    var margin = {top:20, right:20, bottom:30, left:40};
    var boundingRect = chartHolder.node().getBoundingClientRect(); 
    var width = boundingRect.width - margin.left - margin.right; 
    var height = boundingRect.height - margin.top - margin.bottom;
    var barWidth = width / data.length;
    let maxWinners = d3.max(data, d => +d.value);
    // Create Chart 
    var svg = chartHolder.append("svg") 
    .attr("width", width + margin.left + margin.right) 
    .attr("height", height + margin.top + margin.bottom) 
    .append("g").classed('chart', true) 
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let yscale = d3.scaleLinear()
    .domain([0, maxWinners]) /* [0, 336] */
    .range([height, 0]);
  
    var yaxis = d3.axisLeft().scale(yscale);
    // Create Axes
    svg.append("g").attr("id","y-axis")
      .call(yaxis);
  
    const bars = svg
      .selectAll('rect')

    // Variables for Axes
    let xscale = d3
      .scaleBand()
      .domain(nobelData.map(d=>d.key))
      .range([0, width/data.length*nobelData.length]);

    var xaxis = d3.axisBottom().scale(xscale);

    bars
      .data(nobelData, d => d)
      .join('rect').classed('bar', true)
      .attr('height', d => d.value)
      .attr('width', barWidth/1.5)
      .attr('y', d => height - d.value)
      .attr('x', (d, i) => i * (barWidth) + barWidth/6)
      .attr("stroke-width",2)
      .attr("stroke", "white")

    svg.append("g").attr("id","x-axis")
      .attr('transform','translate(0,' + height + ')')
      .call(xaxis)
      .selectAll("text")
        .attr("y", 2)
        .attr("x", -9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-65)")
        .style("text-anchor", "end");
  }

  // Select all checkboxes using D3.js
  const checkboxes = d3.selectAll('input[type=checkbox]');

  // Function to get values of checked checkboxes
  function getCheckedValues() {
    const checkedCheckboxes = checkboxes.filter(function() {
      return this.checked;
    });

    const values = checkedCheckboxes.nodes().map(function(checkbox) {
      return checkbox.id;
    });

    filterData = data.filter(d => values.includes(d.key))
    return filterData
  }

  // Example usage: log values of checked checkboxes
  checkboxes.on('change', function() {
    const filterData= getCheckedValues()
    chartHolder.selectAll('svg').remove()
  
    update(filterData)

  });

  update(getCheckedValues())
})