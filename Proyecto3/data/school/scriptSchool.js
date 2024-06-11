d3.json('school.json').then(data => {
    const nodes = data.nodes;
    console.log(nodes);
  }).catch(error => {
    console.error('Error:', error);
  });
  

