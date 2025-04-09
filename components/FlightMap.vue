<template>
    <div class="h-96 w-full relative">
      <!-- Loading state -->
      <div v-if="!mapReady" class="absolute inset-0 flex items-center justify-center bg-gray-100">
        <p>Loading map...</p>
      </div>
      
      <!-- Map container -->
      <client-only>
        <div v-show="mapReady" class="h-full">
          <LMap 
            ref="map" 
            :zoom="2" 
            :center="[20, 0]" 
            @ready="onMapReady"
          >
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <template v-for="flight in flightData" :key="flight.light_interest_id">
              <LMarker :lat-lng="getAirportCoords(flight.origin)">
                <LPopup>
                  <strong>Origin:</strong> {{ flight.origin }}<br>
                  <strong>Passengers:</strong> {{ flight.adults }}
                </LPopup>
              </LMarker>
              
              <LMarker :lat-lng="getAirportCoords(flight.destination)">
                <LPopup>
                  <strong>Destination:</strong> {{ flight.destination }}<br>
                  <strong>Return:</strong> {{ flight.return_date ? 'Yes' : 'No' }}
                </LPopup>
              </LMarker>
              
              <LPolyline
                :lat-lngs="[
                  getAirportCoords(flight.origin),
                  getAirportCoords(flight.destination)
                ]"
                color="#3b82f6"
              />
            </template>
          </LMap>
        </div>
      </client-only>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // Only import Leaflet components on client side
  const LMap = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LMap))
  const LTileLayer = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LTileLayer))
  const LMarker = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LMarker))
  const LPopup = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LPopup))
  const LPolyline = defineAsyncComponent(() => import('@vue-leaflet/vue-leaflet').then(m => m.LPolyline))
  
  const props = defineProps(['flightData'])
  const mapReady = ref(false)
  const map = ref(null)
  
  const onMapReady = () => {
    mapReady.value = true
  }
  
  // Airport coordinates database
  const airportCoords = {
    'Paris': [48.8566, 2.3522],
    'Dubai': [25.2048, 55.2708],
    'Sydney': [-33.8688, 151.2093],
    'Amsterdam': [52.3676, 4.9041],
    'London': [51.5074, -0.1278],
    'Mumbai': [19.0760, 72.8777]
  }
  
  const getAirportCoords = (city) => {
    return airportCoords[city] || [0, 0]
  }
  
  // Auto-fit map to markers
  const fitMapToMarkers = () => {
    if (!map.value) return
    
    const bounds = new L.LatLngBounds()
    props.flightData.forEach(flight => {
      bounds.extend(getAirportCoords(flight.origin))
      bounds.extend(getAirportCoords(flight.destination))
    })
    
    map.value.leafletObject.fitBounds(bounds, { padding: [50, 50] })
  }
  
  onMounted(() => {
    setTimeout(fitMapToMarkers, 500)
  })
  </script>