var nodesUrl = `https://raw.githubusercontent.com/turtlecoin/turtlecoin-nodes-json/master/turtlecoin-nodes.json`


async function getNodes(d) {
	try {
		var nodes = await axios.get(nodesUrl);
		nodes = nodes.data.nodes
		console.log(nodes);
		asyncForEach(nodes, async (node) => {
			let thisNode = await axios.get(`https://api.turtlenode.io/${node.url}/${node.port}/getinfo`);
			thisNode = thisNode.data
			
			if (thisNode.synced) {
                    thisNode.error ? d.row.add([node.name, node.port, node.name, 0, "No", 0, "0 H/s", 0, 0, 0, 0, "Unknown"]).draw(!1) : d.row.add(['a.hostname', node.port, node.name, thisNode.height, thisNode.synced ? "Yes" : "No", thisNode.difficulty, (thisNode.hashrate / 1E6).toFixed(2) + " MH/s", thisNode.tx_pool_size, thisNode.tx_count, thisNode.incoming_connections_count, thisNode.outgoing_connections_count,
                        thisNode.version
                    ]).draw(!1)
               }
 
		})


	} catch(e) {
		console.log(e)
	}
}


//helper function for async for each
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
