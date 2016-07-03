fetch('/stats.json')
  .then(res => res.json())
  .then(data => data.chats['-1001066517264']) // select chat
  .then(processData)
  .then(renderChart)

function processData (data) {
  let labels = []
  let collectedData = {
    messages: [], commands: [], stickers: [], photos: [], audios: [], videos: []
  }

  Object.keys(data).map(date => {
    if (date !== 'meta') {
      labels.push(date)
      collectedData.messages.push(data[date].message)
      collectedData.commands.push(data[date].command)
      collectedData.stickers.push(data[date].sticker)
      collectedData.photos.push(data[date].photo)
      collectedData.audios.push(data[date].audio)
      collectedData.videos.push(data[date].video)
    }
  })

  return {
    labels: labels,
    datasets: [
      {
        label: 'Messages',
        data: collectedData.messages,
        backgroundColor: 'rgba(3, 169, 244, 0.2)',
        borderColor: 'rgba(3, 169, 244, 0.5)',
        borderWidth: 1
      },
      {
        label: 'Commands',
        data: collectedData.commands,
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        borderColor: 'rgba(63, 81, 181, 0.5)',
        borderWidth: 1
      },
      {
        label: 'Stickers',
        data: collectedData.stickers,
        backgroundColor: 'rgba(233, 30, 99, 0.2)',
        borderColor: 'rgba(233, 30, 99, 0.5)',
        borderWidth: 1
      },
      {
        label: 'Photos',
        data: collectedData.photos,
        backgroundColor: 'rgba(156, 39, 176, 0.2)',
        borderColor: 'rgba(156, 39, 176, 0.5)',
        borderWidth: 1
      },
      {
        label: 'Audios',
        data: collectedData.audios,
        backgroundColor: 'rgba(139, 195, 74, 0.2)',
        borderColor: 'rgba(139, 195, 74, 0.5)',
        borderWidth: 1
      },
      {
        label: 'Videos',
        data: collectedData.videos,
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
        borderColor: 'rgba(255, 87, 34, 0.5)',
        borderWidth: 1
      }
    ]
  }
}

function renderChart (data) {
  var ctx = document.getElementById('historyChart')
  var historyChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        xAxes: [{ stacked: true }],
        yAxes: [{ stacked: true }]
      }
    }
  })
}
