const data = d3.json("countries.json");

function getCheckedValues(data) {
  const checkedCheckboxes = d3.selectAll('input[type=checkbox]').filter(function() {
    return this.checked;
  });
  const values = checkedCheckboxes.nodes().map(function(checkbox) {
    return checkbox.id;
  });
  return data.filter(d => values.includes(d.name))
}

data.then(function(data) {
  element = document.querySelector("#barchart")
  selected_data = getCheckedValues(data)
  const chart = new Barchart({element: element, data: selected_data})

  d3.selectAll('input[type=checkbox]').on('change', function() { 
    chart.setData(getCheckedValues(data))
  })
})