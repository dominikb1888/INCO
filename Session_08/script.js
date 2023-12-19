function getCheckedValues() {
  const checkedCheckboxes = d3.selectAll('input[type=checkbox]').filter(function() {
    return this.checked;
  });
  const values = checkedCheckboxes.nodes().map(function(checkbox) {
    return checkbox.id;
  });
  return values
}

function filterData(values, data) {
  let result = data.filter(function (d) { if (d.diedcountrycode) { return values.includes(d.diedcountrycode.toLowerCase())}})
  return result.filter(d => d !== undefined)
}

async function getJSONData(path) {
  try {
    const data = await d3.json(path);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function processData() {
  try {
    var data = await getJSONData('nobellaureates.json')
    var basemap = await getJSONData('world-110m.geojson')
    var selected_data = filterData(getCheckedValues(), data )
    var mychart = new Barchart({
      'element': '#barchart', 
      'data': selected_data,
    });

    var mymap = new WorldMap({
      'element': '#map', 
      'data': selected_data, 
      'basemap': basemap,
    });

    d3.selectAll('input[type=checkbox]').on('change', function() { 
      selected_data = filterData(getCheckedValues(), data)
      mychart.setData(selected_data);
      mymap.setData(selected_data);
    })
  }
  catch (error) {
    console.error("Error fetching data:", error)
  }
}

processData()