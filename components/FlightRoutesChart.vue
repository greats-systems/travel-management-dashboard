<template>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'FlightRoutesChart',
    components: { Bar },
    props: {
      flightData: {
        type: Array,
        required: true
      },
      chartId: {
        type: String,
        default: 'bar-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 400
      },
      cssClasses: {
        default: '',
        type: String
      },
      styles: {
        type: Object,
        default: () => {}
      },
      plugins: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: 'Number of Searches',
              backgroundColor: '#f87979',
              data: []
            }
          ]
        },
        chartOptions: {
          responsive: true,
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true
            }
          }
        }
      }
    },
    mounted() {
      this.processData()
    },
    methods: {
      processData() {
        const routeCounts = {}
        
        this.flightData.forEach(flight => {
          const route = `${flight.origin} → ${flight.destination}`
          routeCounts[route] = (routeCounts[route] || 0) + 1
        })
        
        this.chartData.labels = Object.keys(routeCounts)
        this.chartData.datasets[0].data = Object.values(routeCounts)
      }
    }
  }
  </script>