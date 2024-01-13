<script>
import axios from 'axios';
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend)



export default {
  name: 'LineChart',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Line },
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
    getDataJson() {
      this.loaded = false,
        axios.get('https://my-json-server.typicode.com/Pierp23/FakeStats/db')
          .then(response => {
            // handle success
            // console.log(response.data.MonthlyConnections);
            // this.ageRange = response.data.MonthlyConnections
            this.chartData = {
              labels: response.data.MonthlyConnections.map(item => item.month),
              datasets: [{
                label: 'Connessioni mensili',
                backgroundColor: '#f87979',
                data: response.data.MonthlyConnections.map(item => item.connections)
              }]
            }
            this.loaded = true
            // console.log(this.chartData)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
    }
  },
  created() {
    this.getDataJson();
  }
}
</script>

<template>
  <Line v-if="loaded" id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
  
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  