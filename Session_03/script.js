
d3.json("heatmap.json")
    .then(function(jsonData) {
        var data = jsonData.data;
        var index = jsonData.index;
        var columns = jsonData.columns

        var dl = d3.select("#chart_html");

        index.forEach(function (item, i) {
            var dt = dl.append("dt").text(item);
            var dd = dl.append("dd");
            var ol = dd.append("ol");

            data[i].forEach(function (value, j) {
                ol.append("li")
                    .attr("class", function() {if (value === 0) {return "zero";} else if (value > 0 && value < 25) { return "small"; }})
                    .append("a")   
                    .attr("style", function() {let size = (value/2) + "px"; let shift = (50 - value / 2) / 2 + "px"; if (value > 24) { return "height: " + size + "; width: " + size + "; top: " + shift + "; left: " + shift + ";"  }})
                    .attr("id", index[i] + "--" + (j + 1))
                    .text(value);
            });
    });
});