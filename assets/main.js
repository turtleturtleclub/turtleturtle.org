$(document).ready(function () {
  function drawTable () {
    $.ajax({
      url: 'https://blockapi.turtlepay.io/node/stats',
      dataType: 'json',
      type: 'GET',
      cache: 'false',
      success: function (response) {
        table.clear()

        for (var i = 0; i < response.length; i++) {
          var node = response[i]

          table.row.add([
            node.name,
            node.height,
            (node.online) ? 'Yes' : 'No',
            node.difficulty,
            node.hashrate,
            {
              in: node.connectionsIn,
              out: node.connectionsOut
            },
            node.version
          ])
        }

        table.draw(false)
      },
      error: function () {
        console.log('Could not retrieve node information')
      }
    })

    setTimeout(function () {
      drawTable()
    }, 15000)
  }

  var table = $('#nodeTable').DataTable({
    columnDefs: [
      {
        targets: [1],
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = data.toLocaleString()
          }
          return data
        }
      },
      {
        targets: [3],
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = (data / 1000000000).toFixed(3) + ' B'
          }
          return data
        }
      },
      {
        targets: [4],
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = (data / 1000000).toFixed(2) + ' MH/s'
          }
          return data
        }
      },
      {
        targets: [5],
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = data.in + '/' + data.out
          } else if (type === 'sort') {
            data = data.in + data.out
          }
          return data
        }
      }
    ],
    order: [
      [0, 'asc']
    ],
    searching: !1,
    info: !1,
    paging: !1,
    lengthMenu: -1
  })

  drawTable()
})
