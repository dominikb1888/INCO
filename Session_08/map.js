class WorldMap {
    constructor(opts) {
      this.element = document.querySelector(opts.element);
      this.data = opts.data;
      this.world = opts.basemap;

      this.backgroundColor = "#EAF2FA";
      this.landColor = "#09A573";
      this.landStroke = "#FCF5E9";
      this.markerColor = "#E26F99";

      this.chartWidth = 1000;
      this.chartHeight = 500;

      this.draw();
    }

    draw() {
      const mapHolder = d3.select(this.element);
      this.mymap = mapHolder.append('svg')
        .attr("title", "Map")
        .attr('width', this.chartWidth)
        .attr('height', this.chartHeight);

      this.createProjection();
      this.createMap();
      this.updateMarkers(); // Changed to updateMarkers()
    }

    createProjection() {
      this.projection = d3.geoMercator()
        .scale([180])
        .center([-60, 50])
        .translate([this.chartWidth / 4, this.chartHeight / 3]);

      this.path = d3.geoPath().projection(this.projection);
    }

    createMap() {
      this.mymap.append("rect")
        .attr("width", this.chartWidth)
        .attr("height", this.chartHeight)
        .attr('fill', this.backgroundColor);

      this.mymap.append('g').selectAll('path')
        .data(this.world.features)
        .join('path')
        .attr('d', this.path)
        .attr('fill', this.landColor)
        .attr('stroke', this.landStroke)
        .attr('stroke-width', 1);
    }

    updateMarkers() {
      const circles = this.mymap.select('g').selectAll("circle")
        .data(this.data);

      circles.exit().remove();

      circles.enter()
        .append("circle")
        .merge(circles)
        .attr("transform", d => {
          const coords = d.geo_point_2d ? Object.values(d.geo_point_2d) : [0, 0];
          return `translate(${this.projection(coords)})`;
        })
        .attr("r", 5)
        .style("fill", "red");
    }

    setData(newData) {
      this.data = newData;
      this.updateMarkers(); // Call updateMarkers() to update markers when data changes
    }
  }
