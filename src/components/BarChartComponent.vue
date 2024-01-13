<script>
import { postData } from '../repository/ConnectAPI'
import { useToast } from 'primevue/usetoast'
import { geraCoresGrafico, obterMesAno } from '../utils/Utils'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

var loaded = false
var chartData = {}
var dadosServidor = []

const getDados = async () => {
  const toast = useToast()
  await postData('/v01/metricas', {
    nomeDaColuna: 'dataInicio'
  })
    .then((response) => {
      // console.log(response)
      chartData = mountChartData(response.data)
    })
    .catch(function (error) {
      // console.log({ error })
      toast.add({ severity: 'Error', summary: 'danger', detail: error, life: 3000 })
      loaded = true
    })
}

const mountChartData = (data) => {
  const bgAtivos = geraCoresGrafico('rgba(106, 158, 218, 0.2)', data.length)
  const bgCancelados = geraCoresGrafico('rgba(250, 95, 73, 0.2)', data.length)
  const bdAtivos = geraCoresGrafico('rgba(106, 158, 218, 1)', data.length)
  const bdCancelados = geraCoresGrafico('rgba(250, 95, 73, 1)', data.length)

  // console.log({ bgAtivos, bgCancelados, bdAtivos, bdCancelados })
  dadosServidor = data

  const chartDataReturn = {
    labels: data.map((item) => obterMesAno(new Date(item.Mes))),
    datasets: [
      {
        label: 'Ativos',
        backgroundColor: bgAtivos,
        borderColor: bdAtivos,
        borderWidth: 1,
        data: data.map((item) => item.ativa)
      },
      {
        label: 'Cancelados',
        backgroundColor: bgCancelados,
        borderColor: bdCancelados,
        borderWidth: 1,
        data: data.map((item) => item.cancelada)
      }
    ]
  }
  loaded = true
  return chartDataReturn
}

const chartOptions = {
  responsive: true,
  locale: 'pt-BR',
  scales: {
    y: {
      beginAtZero: true,
      grace: 1
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        beforeFooter: (context) => {
          // console.log(context, context[0].dataIndex, dadosServidor[context[0].dataIndex])
          return 'MRR: ' + Math.round(dadosServidor[context[0].dataIndex].mrr).toFixed(2)
        }
      }
    }
  }
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

const chartPlugins = [topline]

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      loaded,
      chartData,
      chartOptions,
      chartPlugins
    }
  },
  methods: { getDados },
  created() {
    this.getDados()
  }
}
</script>

<template>
  <PToast />
  <div class="grid grid-cols-12 gap-6">
    <Bar
      v-if="loaded"
      class="chart chart--donut"
      id="barAtivosCancelados"
      :options="chartOptions"
      :plugins="chartPlugins"
      :data="chartData"
    />
  </div>
</template>

<style scoped>
.chart {
  height: 400px;
}
</style>
