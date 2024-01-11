<script>
import axios from 'axios'
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

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      loaded: false,
      chartData: '',
      chartOptions: {
        responsive: true
      }
    }
  },
  methods: {
    async getDataJson() {
      ;(this.loaded = false),
        await axios
          .post('http://localhost:3001/api/v01/metricas', {
            nomeDaColuna: 'dataInicio'
          })
          .then((response) => {
            // handle success
            console.log(response.data.data)
            // this.ageRange = response.data.UsersAgeRange
            this.chartData = {
              labels: response.data.data.map((item) => item.Mes),
              datasets: [
                {
                  label: 'Ativos',
                  backgroundColor: [
                    '#f87979',
                    '#FFD700',
                    '#1E90FF',
                    '#20B2AA',
                    '#FA8072',
                    '#CD5C5C',
                    '#F0E68C',
                    '#00BFFF',
                    '#ADD8E6',
                    '#DB7093',
                    '#7FFFD4',
                  ],
                  data: response.data.data.map((item) => item.Ativos)
                },
                {
                  label: 'Cancelados',
                  backgroundColor: [
                    '#f87979',
                    '#FFD700',
                    '#1E90FF',
                    '#20B2AA',
                    '#FA8072',
                    '#CD5C5C',
                    '#F0E68C',
                    '#00BFFF',
                    '#ADD8E6',
                    '#DB7093',
                    '#7FFFD4',
                  ],
                  data: response.data.data.map((item) => item.Cancelados)
                },
              ]
            }
            this.loaded = true
            console.log(this.chartData)
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
    }
  },
  created() {
    this.getDataJson()
  }
}
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <Bar v-if="loaded" class="chart chart--donut" id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<style scoped>
  .chart {
    height: 400px;
  }
</style>
