<template>
    <div class="bg-white p-4 rounded-lg shadow">
      <Bar 
        v-if="chartData" 
        :data="chartData" 
        :options="chartOptions" 
        :key="chartKey"
      />
      <div v-else class="text-center py-8 text-gray-500">
        No flight data available
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
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
  
  // Register ChartJS components
  ChartJS.register(
    Title, 
    Tooltip, 
    Legend, 
    BarElement, 
    CategoryScale, 
    LinearScale
  )
  
  const props = defineProps({
    flightData: {
      type: Array,
      default: () => []
    }
  })
  
  const chartKey = ref(0)
  const chartData = ref(null)
  
  // Prepare chart data from the flight_interest_stats structure
  const prepareChartData = () => {
    if (!props.flightData || props.flightData.length === 0) {
      chartData.value = null
      return
    }
  
    chartData.value = {
      labels: props.flightData.map(item => `${item.origin} → ${item.destination}`),
      datasets: [{
        label: 'Total Passengers',
        data: props.flightData.map(item => item.total_adults), // Note: Make sure this matches your view's column name
        backgroundColor: [
          '#3b82f6'
        ],
        borderColor: '#1e293b',
        borderWidth: 1,
        borderRadius: 4
      }]
    }
    chartKey.value++
  }
  
  // Watch for changes in flightData
  watch(() => props.flightData, prepareChartData, { immediate: true, deep: true })
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Popular Flight Routes',
        font: {
          size: 16
        }
      },
      legend: {
        display: false // Hide legend since we only have one dataset
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || ''
            return `${label}: ${context.raw} passengers`
          },
          afterLabel: (context) => {
            const dataItem = props.flightData[context.dataIndex]
            return `Route: ${dataItem.origin} to ${dataItem.destination}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Passengers'
        },
        ticks: {
          precision: 0 // Only show whole numbers
        }
      },
      x: {
        title: {
          display: true,
          text: 'Flight Routes'
        }
      }
    }
  }
  </script>
  
  <style scoped>
  div {
    height: 400px;
  }
  </style>