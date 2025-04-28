<script lang="ts">
import Dropdown from './Dropdown.vue';
// import { RouterLink } from 'vue-router';
import { NuxtLink } from '#components';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'navbar',
  components: {
    NuxtLink
  }, 
  
}
</script>

<template>
  <nav class="bg-gradient-to-t from-orange-200 to-orange-400 via-orange-300 border-b">
    <div class="menu-item">
      <NuxtLink to="/about">Home</NuxtLink>
    </div>
    <div class="menu-item">
      <NuxtLink to="/flights_dashboard">Flights</NuxtLink>
    </div>
    <!-- <Dropdown title="Payroll Files" :items="payrollFiles"></Dropdown>
    <Dropdown title="Employees" :items="employees"></Dropdown>

    <Dropdown title="Payslip Entries" :items="payslipEntries"></Dropdown>
    <Dropdown title="Tax and Other Tables" :items="taxAndOtherTables"></Dropdown> -->
    <div class="menu-item">
      <RouterLink to="/shuttles_dashboard">Shuttles</RouterLink>
    </div>
    <!-- <Dropdown title="Reports" :items="reports"></Dropdown> -->
    <div class="menu-item">
      <RouterLink to="#">Cargo</RouterLink>
    </div>
  </nav>
</template>

<style>
nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 110%;
}

nav .menu-item {
  color: orange;
  padding: 10px 30px;
  position: relative;
  text-align: center;
  border-bottom: 3px solid transparent;
  display: flex;
  transition: 0.4s;
}

nav .menu-item.active,
nav .menu-item:hover {
  background-color: white;
  border-bottom-color: orange;
}

nav .menu-item {
  color: inherit;
  text-decoration: none;
}
</style>
