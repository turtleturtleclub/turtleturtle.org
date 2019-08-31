$(document).ready(function () {
  var d = $('#nodeTable').DataTable({
    columnDefs: [{
      targets: [0, 1],
      visible: !1,
      searchable: !1
    }],
    order: [
      [2, 'asc']
    ],
    searching: !1,
    info: !1,
    paging: !1,
    lengthMenu: -1
  })
  loadTable(d)
  setInterval(function () {
    updateTable(d)
  }, 120000)
})

function loadTable (d) {
  var defer = $.Deferred().resolve()

  $.each(nodes, function (key, node) {
    // Add next deferred to chain, it will be invoked when previous is completed
    defer = defer.then(function () {
      return AjaxLoadTable(key, node, d)
    })
  })

  defer.then(function () {
    console.log('All requests completed')
  })

  function AjaxLoadTable (key, node, d) {
    return $.ajax({
      url: `https://api.turtlenode.io/${node.url}/${node.port}/getinfo`,
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded',
      type: 'GET',
      cache: 'false',
      success: function (c) {
        if (c.synced) {
          c.error ? d.row.add([node.name, node.port, node.name, 0, 'No', 0, '0 H/s', 0, 0, 0, 0, 'Unknown']).draw(!1) : d.row.add(['a.hostname', node.port, node.name, c.height, c.synced ? 'Yes' : 'No', c.difficulty, (c.hashrate / 1E6).toFixed(2) + ' MH/s', c.tx_pool_size, c.tx_count, c.incoming_connections_count, c.outgoing_connections_count,
            c.version
          ]).draw(!1)
        }
      }
    })
  }
}

function updateTable (d) {
  d.rows().remove()
  var defer = $.Deferred().resolve()

  $.each(nodes, function (key, node) {
    // Add next deferred to chain, it will be invoked when previous is completed
    defer = defer.then(function () {
      return AjaxLoadTable(key, node, d)
    })
  })

  defer.then(function () {
    console.log('All requests completed')
  })

  function AjaxLoadTable (key, node, d) {
    return $.ajax({
      url: `https://api.turtlenode.io/${node.url}/${node.port}/getinfo`,
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded',
      type: 'GET',
      cache: 'false',
      success: function (c) {
        if (c.synced) {
          c.error ? d.row.add([node.name, node.port, node.name, 0, 'No', 0, '0 H/s', 0, 0, 0, 0, 'Unknown']).draw(!1) : d.row.add(['a.hostname', node.port, node.name, c.height, c.synced ? 'Yes' : 'No', c.difficulty, (c.hashrate / 1E6).toFixed(2) + ' MH/s', c.tx_pool_size, c.tx_count, c.incoming_connections_count, c.outgoing_connections_count,
            c.version
          ]).draw(!1)
        }
      }
    })
  }
}
