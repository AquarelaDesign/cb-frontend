<script>
import BarChart from './BarChartComponent.vue'
import LineChart from './LineChartComponent.vue'
import DoughnutChart from './DoughnutChartComponent.vue'

export default {
  components: {
    BarChart,
    LineChart,
    DoughnutChart
  }
}
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div>
      <h2>Gráfico Barra</h2>
      <BarChart />
    </div>
    <hr />
    <div>
      <h2>Gráfico Linha</h2>
      <LineChart />
    </div>
    <hr />
    <div>
      <h2>Gráfico Doughnut</h2>
      <DoughnutChart />
    </div>
  </div>
</template>

<style scoped></style>
