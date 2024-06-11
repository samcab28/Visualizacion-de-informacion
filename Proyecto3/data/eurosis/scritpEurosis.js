d3.json('eurosis.json').then(data => {
    const nodes = data.nodes;
    console.log(nodes);
  }).catch(error => {
    console.error('Error:', error);
  });
  

