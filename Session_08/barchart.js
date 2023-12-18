class Barchart {
    constructor(opts) {
      this.data = opts.data;
      this.element = opts.element;
      this.draw()
    }
  
    draw() {
      const chartHolder = d3.select(this.element)
      const boundingRect = chartHolder.node().getBoundingClientRect(); 
      this.width = boundingRect.width; 
      this.height = boundingRect.height;
    
      this.element.innerHTML = '';
  
      const svg = chartHolder.append("svg") 
        .attr("width", this.width) 
        .attr("height", this.height) 
      
      this.chart = svg
        .append("g").classed('chart', true) 
        // .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  
      this.createScales();
      this.addAxes();
      this.addBars();
    }
  
  
    createScales() {
      const maxWinners = d3.max(this.data, d => d.prizes_won);

      this.yscale = d3.scaleLinear()
        .domain([0, maxWinners])
        .range([this.height, 0]);
    
      this.xscale = d3
        .scaleBand()
        .domain(this.data.map(d=>d.name))
        .range([0, this.width/this.data.length*this.data.length]);
    }
  
  
    addAxes() {
      const yaxis = d3.axisLeft().scale(this.yscale);
      const xaxis = d3.axisBottom().scale(this.xscale);

      this.chart.append("g").attr("id","y-axis")
        .call(yaxis);
    
      this.chart.append("g").attr("id","x-axis")
        .attr('transform','translate(0,' + this.height + ')')
        .call(xaxis)
        .selectAll('text')
        .text('')
    }
  
  
    addBars() {
      const barWidth = this.width / this.data.length;
  
      this.chart.append("g").selectAll('rect')
        .data(this.data, d => d)
        .join('rect').classed('bar', true)
        .attr('height', d => this.height - this.yscale(d.prizes_won))
        .attr('width', barWidth/1.5)
        .attr('y', d => this.yscale(d.prizes_won))
        .attr('x', (d, i) => i * (barWidth) + barWidth/6)
        .attr("stroke-width",2)
        .attr("stroke", "white")
    
     this.chart.append("g").selectAll('foreignObject')
        .data(this.data)
        .join('foreignObject')
          .attr("width", 51)
          .attr("height", 40)
          .attr("x", function (d,i) { let pos = (i * barWidth) + 3; if (d.prizes_won >= 100) { pos = pos - 5 }; return pos;})
          .attr("y", this.height)
        .append('div')
          .attr('class', d=>'fib fi-'+d['alpha-2'])
  
          
    }
  
    setData(newData) {
      this.data = newData;
  
      // full redraw needed
      this.draw();
    }
  }