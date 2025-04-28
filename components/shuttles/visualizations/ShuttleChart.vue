<template>
    <div class="bg-white p-4 rounded-lg shadow">
        <Bar v-if="chartData" :data="chartData" :options="chartOptions" :key="chartKey" />
        <div v-else class="text-center py-8 text-gray-500">
            No shuttle data available
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
    shuttleData: {
        type: Array,
        default: () => []
    }
})

const chartKey = ref(0)
const chartData = ref(null)

// Prepare chart data from the shuttle_interest_stats structure
const prepareChartData = () => {
    if (!props.shuttleData || props.shuttleData.length === 0) {
        chartData.value = null
        return
    }

    chartData.value = {
        labels: props.shuttleData.map(item => `${item.origin} → ${item.destination}`),
        datasets: [{
            label: 'Total Passengers',
            data: props.shuttleData.map(item => item.count), // Note: Make sure this matches your view's column name
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

// Watch for changes in shuttleData
watch(() => props.shuttleData, prepareChartData, { immediate: true, deep: true })

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            title: {
                display: true,
                text: 'Shuttle Routes'
            },
            // Add this:
            afterFit: (scale) => {
                scale.width = 50; // Adjust this value as needed
            }
        },
        y: {
            // ... your existing y-axis config
        }
    },
    plugins: {
        title: {
            display: true,
            text: 'Popular shuttle Routes',
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
                    return `${context.raw} searches`
                },
                afterLabel: (context) => {
                    const dataItem = props.shuttleData[context.dataIndex]
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
                text: 'Shuttle Routes'
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