<template>
    <Pie
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
  import { Pie } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
  
  export default {
    name: 'TripTypeChart',
    components: { Pie },
    props: {
      flightData: {
        type: Array,
        required: true
      },
      // ... same props as above component
    },
    data() {
      return {
        chartData: {
          labels: ['One-way trips', 'Round trips'],
          datasets: [
            {
              backgroundColor: ['#41B883', '#E46651'],
              data: [0, 0]
            }
          ]
        },
        chartOptions: {
          responsive: true
        }
      }
    },
    mounted() {
      this.processData()
    },
    methods: {
      processData() {
        const counts = {
          oneWay: this.flightData.filter(flight => flight.one_way).length,
          roundTrip: this.flightData.filter(flight => !flight.one_way).length
        }
        
        this.chartData.datasets[0].data = [counts.oneWay, counts.roundTrip]
      }
    }
  }
  </script>