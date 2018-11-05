var nodesUrl = `https://raw.githubusercontent.com/turtlecoin/turtlecoin-nodes-json/master/turtlecoin-nodes.json`


var nodes;

// Make a request to turtlecoin-nodes.json to get all nodes
axios.get(nodesUrl)
  .then( (response) => {
    // handle success
    console.log(response.data.nodes)
    nodes = response.data.nodes
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
 
