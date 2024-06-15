d3.json('cleanDataEurosis/NodeEurosis.json').then(data => {
  var width = 300, height = 300;
  const nodes = data;
  
  console.log(nodes);
}).catch(error => {
  console.error('Error:', error);
});
