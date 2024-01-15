<script setup>
import Chart from 'chart.js/auto'
import { ref, onServerPrefetch, onMounted } from 'vue'
import { postData } from '../repository/ConnectAPI'
import { useToast } from 'primevue/usetoast'
import { obterMesAno } from '../utils/Utils'

const chartBar = ref(null)

onServerPrefetch(async () => {
  chartBar.value = await getDados()
})

onMounted(async () => {
  if (chartBar.value) {
    chartBar.value = await getDados()
  }
})

const getDados = async () => {
  const toast = useToast()
  await postData('/v01/metricas', {
    nomeDaColuna: 'dataInicio'
  })
    .then((response) => {
      return mountChartData(response.data)
    })
    .catch(function (error) {
      toast.add({ severity: 'Error', summary: 'danger', detail: error, life: 3000 })
      return null
    })
}

const mountChartData = (dataServer) => {
  const bgAtivos = ['rgba(106, 158, 218, 0.2)']
  const bgCancelados = ['rgba(250, 95, 73, 0.2)']
  const bdAtivos = ['rgba(106, 158, 218, 1)']
  const bdCancelados = ['rgba(250, 95, 73, 1)']

  const chartData = {
    labels: dataServer.map((item) => obterMesAno(new Date(item.Mes))),
    datasets: [
      {
        label: 'Ativos',
        backgroundColor: bgAtivos,
        borderColor: bdAtivos,
        borderWidth: 1,
        data: dataServer.map((item) => item.ativa)
      },
      {
        label: 'Cancelados',
        backgroundColor: bgCancelados,
        borderColor: bdCancelados,
        borderWidth: 1,
        data: dataServer.map((item) => item.cancelada)
      }
    ]
  }

  const chartConfig = {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      locale: 'pt-BR',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
    plugins: [topline]
  }

  return mountChart(chartConfig)
}

const topline = {
  id: 'topLine',
  afterDatasetsDraw(chart) {
    const { ctx, data } = chart
    ctx.save()
    const _dts = chart.data.datasets.length
    for (let i = 0; i < _dts; i++) {
      chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
        ctx.beginPath()
        ctx.strokeStyle = data.datasets[i].borderColor[index]
        ctx.lineWidth = 3
        const halfWidth = datapoint.width / 2
        ctx.moveTo(datapoint.x - halfWidth, datapoint.y - 6)
        ctx.lineTo(datapoint.x + halfWidth, datapoint.y - 6)
        ctx.stroke()

        ctx.font = 'bold 12px sans-serif'
        ctx.fillStyle = 'black'
        ctx.textAlign = 'center'
        ctx.fillText(data.datasets[i].data[index], datapoint.x, datapoint.y - 15)
      })
    }
  }
}

const mountChart = (chartConfig) => {
  const ctx = document.getElementById('BarChart')
  const BarChart = new Chart(ctx, chartConfig)
  return BarChart
}
</script>

<template>
  <PToast />
  <div class="grid grid-cols-12 gap-6">
    <canvas id="BarChart" ref="chartBar" class="w-max h-max"></canvas>
  </div>
</template>

<style scoped></style>
