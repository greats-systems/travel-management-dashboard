<!-- components/FlightMap.client.vue -->
<template>
    <ClientOnly>
      <FlightMap :flight-data="flightData" />
      <template #fallback>
        <div class="h-96 bg-gray-100 flex items-center justify-center">
          <p>Loading map...</p>
        </div>
      </template>
    </ClientOnly>
  </template>
  
  <script setup>
  import FlightMap from './FlightMap.vue'
  
  defineProps({
    flightData: Array
  })
  </script>