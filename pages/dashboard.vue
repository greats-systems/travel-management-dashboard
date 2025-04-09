<script setup>
import { createClient } from '@supabase/supabase-js'
import { ref, onMounted } from 'vue'

// const { public: { supabaseUrl, supabaseKey } } = useRuntimeConfig()
const supabase = useSupabaseClient()
// console.log(`supabase:\n`)
// console.log(supabase)
const flightData = ref([])
const isLoading = ref(true)
const error = ref(null)

const headers = [
  'Created At',
  'Route',
  'Departure',
  'Trip Type',
  'Passengers',
  'Return Date'
]

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
    const { data, error: supabaseError } = await supabase.from('flight_interest_stats').select('*')
      // .limit(100)
    // console.log('data:')
    console.log(data)
    if (supabaseError) throw supabaseError
    flightData.value = data
    // console.log('Data loaded:', data)
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
  <div class="space-y-6 p-4">
    <h1 class="text-3xl font-bold">Flight Analytics Dashboard</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Table -->
      <div class="bg-white p-4 rounded-lg shadow max-h-1/3 overflow-y-auto">
        <h2 class="text-xl font-semibold mb-4">Recent Flight Interests</h2>
        <FlightTable :data="flightData" />
      </div>

      <!-- Chart -->
      <div class="bg-white p-4 rounded-lg shadow max-h-1/3 overflow-y-auto">
        <h2 class="text-xl font-semibold mb-4">Passenger Demand</h2>
        <FlightChart :flight-data="flightData" />
      </div>

      <!-- Full width map -->
      <!-- <div class="col-span-full bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Flight Routes</h2>
        <FlightMap :flight-data="flightData" />
      </div> -->
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