Promise.all([
    d3.json('world-110m.geojson'),
    d3.json('nobellaureates.geojson')
]).then(function([world, nobelwinners]){

    const chartWidth = 1000;
    const chartHeight = 500;
    const backgroundColor = "#EAF2FA";
    const landColor = "#09A573";
    const landStroke = "#FCF5E9";
    const markerColor = "#E26F99";
   

    const projection = d3.geoMercator()
                        .scale([180])
                        .center([-60,50])
                        .translate([chartWidth / 4, chartHeight / 3]);

    const pathGenerator = d3.geoPath(projection);
    
    const mapHolder = d3.select('#map');

    const svg = mapHolder.append('svg')
                .attr("title", "Map")
                .attr('width', chartWidth)
                .attr('height', chartHeight);

    svg.append("rect")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .attr('fill', backgroundColor);

    svg.append('g').selectAll('path')
        .data(world.features)
        .join('path')
        .attr('d', pathGenerator)
        .attr('fill', landColor)
        .attr('stroke', landStroke)
        .attr('stroke-width', 1);
    
    svg.append('g').selectAll("circle")
        .data(nobelwinners)
        .join("circle")
        .attr("cx", function (d) {
            if (d.geo_point_2d) {
                coords = Object.values(d.geo_point_2d);
                return projection(coords)[0];
            }
          })
          .attr("cy", function (d) {
            if (d.geo_point_2d) {
                coords = Object.values(d.geo_point_2d);
                return projection(coords)[1];
            }
          })
          .attr("r", 5) // Adjust the radius as needed
          .style("fill", "red");

})
   