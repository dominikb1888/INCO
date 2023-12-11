
d3.json("heatmap.json")
    .then(function(jsonData) {
            // Assuming you have your JSON data in a variable called 'jsonData'
        // Assuming you have your JSON data in a variable called 'jsonData'
        var data = jsonData.data;
        var index = jsonData.index;

        // Select the element where you want to append the definition list
        var dlContainer = d3.select("#chart_html");

        // Create the definition list (dl)
        var dl = dlContainer.append("dl");

        // Iterate through the index and data arrays together
        index.forEach(function (item, i) {
        // Create the definition term (dt)
        var dt = dl.append("dt").text(item);

        // Create the description term (dd) and the associated ordered list (ol)
        var dd = dl.append("dd");
        var ol = dd.append("ol");

        // Add list items (li) for each value in the data array
        data[i].forEach(function (value) {
            ol.append("li")
                .attr("class", function() {if (value === 0) {return "zero";} else if (value > 0 && value < 25) { return "small"; }})
                .append("a")   
                .attr("style", function() {let size = (value/2) + "px"; let shift = (50 - value / 2) / 2 + "px"; if (value > 24) { return "height: " + size + "; width: " + size + "; top: " + shift + "; left: " + shift + ";"  }})
                .text(value);
        });
    });
});