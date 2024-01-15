<template>
  <main>
    <div class="home">
      <section class="hero">
        <div class="hero-text container">
          <h4>Gráficos</h4>
          <hr />
          <div class="upLoad">
            <PToast />
            <PFileUpload
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              :maxFileSize="1000000"
              @upload="onUpload"
            />
          </div>
          <PTabView class="tabvw">
            <PTabPanel header="Barras">
              <p class="m-0">
                <BarChart />
              </p>
            </PTabPanel>
            <PTabPanel header="Linhas">
              <p class="m-0">
                <LineChart />
              </p>
            </PTabPanel>
            <PTabPanel header="Rosca">
              <p class="m-0">
                <DoughnutChart />
              </p>
            </PTabPanel>
          </PTabView>
        </div>
      </section>
      <section></section>
    </div>
  </main>
</template>

<script>
import { useToast } from 'primevue/usetoast'
import BarChart from '@/components/BarChartComponent.vue'
import LineChart from '@/components/LineChartComponent.vue'
import DoughnutChart from '@/components/DoughnutChartComponent.vue'

const onUpload = () => {
  const toast = useToast()
  toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 })
}

export default {
  components: {
    BarChart,
    LineChart,
    DoughnutChart
  },
  methods: {
    onUpload,
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.tabvw) {
  .p-tabview-panels {
    background-color: transparent;
  }
  .p-tabview-nav {
    padding: 0;
    height: 45px;
    margin-bottom: 10px;
    border: none;
  }
  .p-tabview-selected {
    font-weight: 900;
    border-color: darkred;
  }
  .p-tabview-panel {
    background-color: rgba(220, 220, 220, 0.95);
    padding: 10px 10px 10px 10px;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 1),
      0 2px 4px -1px rgba(0, 0, 0, 0.6);
    border-color: #000;
  }
  .p-tabview-header {
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 1),
      0 2px 4px -1px rgba(0, 0, 0, 0.6);
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 25px 0 25px 0;
  }

  .p-tabview-title {
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.8);
    border: none;
  }

  ul,
  .link {
    font-weight: 500;
    color: #fff;
    list-style: none;
    text-decoration: none;
    border: none;
  }

  li {
    text-transform: uppercase;
    padding: 16px;
    margin-left: 5px;
    border: none;
  }

  a {
    border: none;
  }

  .link {
    font-size: 14px;
    transition: 0.5s ease all;
    padding-bottom: 4px;
    border: none;

    &:hover {
      color: #00afea;
      border-color: #00afea;
    }
  }
}
</style>
