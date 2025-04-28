<script setup>
import { createClient } from '@supabase/supabase-js'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const runtimeConfig = useRuntimeConfig()
const _apiRoot = runtimeConfig.public.apiRoot
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
    const data = await axios.get(`${_apiRoot}/data/flight-interest`)
    console.log(`Flights from flight table:`)
    flightData.value = data.data
    console.log(flightData.value)
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
    <div class="p-16">
      <!-- <h1 class="text-2xl font-bold mb-4">Flight Interest Dashboard</h1> -->
      
      <div class="overflow-x-auto">
        <table class="min-w-full min-h-0.5 bg-white rounded-lg overflow-hidden">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th v-for="header in headers" :key="header" class="px-4 py-2 text-left">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="flight in flightData" :key="flight.light_interest_id" class="hover:bg-gray-50">
              <td class="px-4 py-2">{{ formatDate(flight.created_at) }}</td>
              <td class="px-4 py-2 font-medium">{{ flight.origin }} → {{ flight.destination }}</td>
              <td class="px-4 py-2">{{ formatDate(flight.departure_date) }}</td>
              <td class="px-4 py-2">{{ flight.one_way ? 'One Way' : 'Round Trip' }}</td>
              <td class="px-4 py-2 text-center">{{ flight.adults }}</td>
              <td class="px-4 py-2">{{ flight.return_date ? formatDate(flight.return_date) : '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>