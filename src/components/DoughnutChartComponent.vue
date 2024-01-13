<script>
import axios from 'axios';
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)



export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  data() {
    return {
      loaded: false,
      chartData: '',
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      }
    }
  },
  methods: {
    getDataJson() {
      this.loaded = false,
        axios.get('https://my-json-server.typicode.com/Pierp23/FakeStats/db')
          .then(response => {
            // handle success
            // console.log(response.data.Devices);
            // this.ageRange = response.data.Devices
            this.chartData = {
              labels: response.data.Devices.map(item => item.os),
              datasets: [{
                //   //   label: 'Daily Students',
                backgroundColor: ['#f87979', 'yellow', 'blue', 'green', 'red'],
                data: response.data.Devices.map(item => item.connections),
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
  <div class="">
    <Doughnut v-if="loaded" id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
  
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  