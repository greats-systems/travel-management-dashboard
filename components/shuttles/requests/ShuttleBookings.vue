<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
const supabase = useSupabaseClient() // Make sure you have this set up

const runtimeConfig = useRuntimeConfig()
const _apiRoot = runtimeConfig.public.apiRoot
const bookingData = ref([])
const isLoading = ref(true)
const error = ref(null)

const headers = [
    'First Name',
    'Last name',
    'Departure date',
    'Route',
    'Status'
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
        const data = await axios.get(`${_apiRoot}/bookings/pending`) // Filter for pending bookings        
        bookingData.value = data.data
        console.log('Bookings data:', bookingData.value)
    } catch (err) {
        error.value = err.message
        console.error('Error fetching data:', err)
    } finally {
        isLoading.value = false
    }
}

// Set up realtime subscription
const setupRealtime = () => {
    const subscription = supabase
        .channel('bookings_changes')
        .on(
            'postgres_changes',
            {
                event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
                schema: 'public',
                table: 'ShuttleBookings'
            },
            (payload) => {
                console.log('Change received!', payload)
                fetchData() // Refresh data when any change occurs
            }
        )
        .subscribe()

    return subscription
}

let subscription

onMounted(() => {
    fetchData()
    subscription = setupRealtime()
})

onUnmounted(() => {
    // Clean up subscription when component unmounts
    if (subscription) {
        supabase.removeChannel(subscription)
    }
})
</script>

<template>
    <div class="p-16">
        <!-- <h1 class="text-2xl font-bold mb-4">booking Interest Dashboard</h1> -->

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
                    <tr v-for="booking in bookingData" :key="booking.booking_id" class="hover:bg-gray-50">
                        <td class="px-4 py-2">{{ booking.first_name }}</td>
                        <td class="px-4 py-2">{{ booking.last_name }}</td>
                        <td class="px-4 py-2">{{ formatDate(booking.departure_date) }}</td>
                        <td class="px-4 py-2 font-medium">{{ booking.origin }} → {{ booking.destination }}</td>
                        <td class="px-4 py-2">{{ booking.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
            <div class="flex justify-center mt-4 space-x-4">
            <button @click=""
                class="bg-green-300 hover:bg-green-500 text-white font-bold py-4 px-4 rounded-full w-1/5 focus:outline-none focus:shadow-outline"
                type="submit">Accept</button>
            <button @click=""
                class="bg-red-300 hover:bg-red-500 text-white font-bold py-4 px-4 rounded-full w-1/5 focus:outline-none focus:shadow-outline"
                type="submit">Reject</button>
        </div>
    </div>
</template>