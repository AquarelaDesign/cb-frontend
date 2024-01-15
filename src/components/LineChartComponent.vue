<script setup>
import Chart from 'chart.js/auto'
import { pt } from 'date-fns/locale'
import { ref, onServerPrefetch, onMounted } from 'vue'
import { postData } from '../repository/ConnectAPI'
import { useToast } from 'primevue/usetoast'

const chartLine = ref(null)

onServerPrefetch(async () => {
  chartLine.value = await getDados()
})

onMounted(async () => {
  if (chartLine.value) {
    chartLine.value = await getDados()
  }
})

const getDados = async () => {
  const toast = useToast()
  await postData('/v01/metricas', {
    nomeDaColuna: 'dataInicio'
  })
    .then((response) => {
      const md = mountChartData(response.data)
      return md
    })
    .catch(function (error) {
      toast.add({ severity: 'Error', summary: 'danger', detail: error, life: 3000 })
    })
}

const mountChartData = (dataServer) => {
  const bgAtivos = ['rgba(106, 158, 218, 0.2)']
  const bgCancelados = ['rgba(250, 95, 73, 0.2)']
  const bdAtivos = ['rgba(106, 158, 218, 1)']
  const bdCancelados = ['rgba(250, 95, 73, 1)']

  const chartData = {
    // labels: dataServer.map((item) => obterMesAno(new Date(item.Mes))),
    labels: dataServer.map((item) => item.Mes),
    datasets: [
      {
        label: 'Ativos',
        backgroundColor: bgAtivos,
        borderColor: bdAtivos,
        borderWidth: 1,
        pointHoverBackgroundColor: 'white',
        pointHoverRadius: 10,
        pointHoverBorder: 3,
        clip: false,
        data: dataServer.map((item) => item.ativa)
      },
      {
        label: 'Cancelados',
        backgroundColor: bgCancelados,
        borderColor: bdCancelados,
        borderWidth: 1,
        pointHoverBackgroundColor: 'white',
        pointHoverBorder: 3,
        pointHoverRadius: 10,
        clip: false,
        data: dataServer.map((item) => item.cancelada)
      }
    ]
  }

  let indexDataPoint
  const customToolTip = {
    id: 'customToolTip',
    afterDatasetsDraw(chart, args, plugins) {
      const {
        ctx,
        data,
        scales: { x, y }
      } = chart
      if (indexDataPoint === undefined) {
        return ''
      }

      const xPos = x.getPixelForValue(
        new Date(data.labels[indexDataPoint.indexValue]).setHours(0, 0, 0, 0)
      )
      const yPos0 = chart.getDatasetMeta(indexDataPoint.highestValue).data[
        indexDataPoint.indexValue
      ].y
      const yPos1 = chart.getDatasetMeta(indexDataPoint.lowestValue).data[indexDataPoint.indexValue]
        .y

      const highestVisible = chart.getDatasetMeta(indexDataPoint.highestValue).visible
      const lowestVisible = chart.getDatasetMeta(indexDataPoint.lowestValue).visible

      tooltip(yPos0, indexDataPoint.highestValue, -1, -38, highestVisible)
      tooltip(yPos1, indexDataPoint.lowestValue, 1, +18, lowestVisible)

      function tooltip(y, datasetIndex, tooltipPosition, cloudPosition, visible) {
        if (visible) {
          ctx.beginPath()
          ctx.fillStyle = data.datasets[datasetIndex].borderColor
          ctx.roundRect(xPos - 50, y + cloudPosition, 100, 20, 10)

          ctx.moveTo(xPos, y + 13 * tooltipPosition)
          ctx.lineTo(xPos - 5, y + 18 * tooltipPosition)
          ctx.lineTo(xPos + 5, y + 18 * tooltipPosition)
          ctx.closePath()
          ctx.fill()

          ctx.fillStyle = 'white'
          ctx.font = 'bold 10px sans-serif'
          ctx.textAlign = 'left'
          ctx.textBaseLine = 'middle'
          ctx.fillText(
            `${data.datasets[datasetIndex].label}: ${
              data.datasets[datasetIndex].data[indexDataPoint.indexValue]
            }`,
            xPos - 40,
            y + cloudPosition + 10
          )
        }
      }
    },
    afterEvent(chart, args) {
      const {
        ctx,
        data,
        scales: { x, y }
      } = chart
      const xCoor = args.event.x
      const yCoor = args.event.y

      ctx.save()
      chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
        if (datapoint.active === true && args.inChartArea) {
          const up = data.datasets[0].data[index] >= data.datasets[1].data[index] ? 0 : 1
          const down = up > 0 ? 0 : 1
          indexDataPoint = {
            indexValue: index,
            highestValue: up,
            lowestValue: down
          }
        }
        if (!args.inChartArea) {
          indexDataPoint = undefined
        }
      })
    }
  }

  const chartConfig = {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      locale: 'pt-BR',
      layout: {
        padding: {
          left: 30,
          right: 50
        }
      },
      interaction: {
        mode: 'index',
        interact: false
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month'
          }
        },
        y: {
          grace: 1,
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          enabled: false
        }
      },
      adapters: {
        date: {
          locale: pt
        }
      }
    },
    plugins: [customToolTip]
  }

  return mountChart(chartConfig)
}

const mountChart = (chartConfig) => {
  const ctx = document.getElementById('LineChart')
  const LineChart = new Chart(ctx, chartConfig)
  return LineChart
}
</script>

<template>
  <PToast />
  <div class="grid grid-cols-12 gap-6">
    <canvas id="LineChart" ref="chartLine" width="400"></canvas>
  </div>
</template>

<style scoped></style>
