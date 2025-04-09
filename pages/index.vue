<!-- pages/index.vue -->
<template>
    <div>
      <button @click="loadMap">Show Flight Map</button>
      <div v-if="showMap">
        <FlightMap :flight-data="flightData" />
      </div>
    </div>
  </template>
  
  <script setup>
  const showMap = ref(false)
  const FlightMap = shallowRef(null)
  
  const loadMap = async () => {
    FlightMap.value = (await import('../components/FlightMap.vue')).default
    showMap.value = true
  }
  </script>