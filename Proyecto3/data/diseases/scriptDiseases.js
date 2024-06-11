d3.json('diseases.json').then(data => {
    const nodes = data.nodes;
    console.log(nodes);
  }).catch(error => {
    console.error('Error:', error);
  });
  

