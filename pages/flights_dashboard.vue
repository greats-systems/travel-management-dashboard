<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import Navbar from '~/components/Navbar.vue'

const runtimeConfig = useRuntimeConfig()
const _apiRoot = runtimeConfig.public.apiRoot
const flightData = ref([])
const isLoading = ref(true)
const error = ref(null)

// Format dates nicely
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

async function fetchData() {
  try {
    isLoading.value = true
    const response = await axios.get(`${_apiRoot}/analytics/flight-interest`)
    
    console.log('response data:', response.data)
    flightData.value = response.data

  } catch (err) {
    error.value = err.message
    console.error('Error fetching data:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => fetchData())
</script>

<template>
  <Navbar></Navbar>
  <div class="space-y-6 p-4">
      <!-- Table -->
      <div class="bg-white p-4 rounded-lg shadow max-h-96 overflow-y-auto">
        <FlightsFlightTable />
      </div>

      <!-- Chart -->
      <div class="bg-white p-4 rounded-lg shadow max-h-1/10 overflow-y-auto">
        <h2 class="text-xl font-semibold mb-4">Passenger Demand</h2>
        <FlightsFlightChart :flight-data="flightData" />
      </div>
    </div>
</template>

<style scoped>
.error {
  color: red;
}

table {
  font-family: 'Inter', sans-serif;
}

tr:nth-child(even) {
  background-color: #f9fafb;
}
</style>