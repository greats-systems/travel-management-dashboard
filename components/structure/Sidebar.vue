<template>
    <div class="hidden lg:flex lg:flex-shrink-0">
      <div
        class="flex flex-col flex-shrink-0 w-56 xl:w-64 min-w-[14rem] max-w-xs border-r dark:border-gray-700 relative"
        style="width: 224px"
      >
        <div class="flex flex-col flex-1 min-h-0 relative">
          <div class="flex items-center justify-stretch px-4 h-14">
            <StructureLogo />
            <UtilitiesColorModeButton />
          </div>
          <div class="overflow-auto">
            <StructureMenu :menus="menus" />
          </div>
        </div>
        <!-- <div class="mx-4 mb-2">
          <UButton
            block
            color="black"
            size="sm"
            icon="i-heroicons-arrow-left-end-on-rectangle"
            label="Logout"
            @click="logout"
          />
        </div> -->
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from '#app';
  
  export default {
    data() {
      return {
        actionsOpen: true,
        menus: [
          [
            {
              label: "Dashboard",
              icon: "i-heroicons-home",
              to: "/user/dashboard",
              exact: true,
            },
            /*
            {
              label: "Wards",
              icon: "i-heroicons:globe-europe-africa",
              to: "/user/wards",
              exact: true,
            },
            {
              label: "Business Unit",
              icon: "i-heroicons-building-storefront",
              to: "/user/b_units",
              exact: true,
            },
            */
           {
  
           },
            {
              label: "Payroll",
              icon: "i-heroicons-banknotes",
              to: "/user/payroll",
              exact: true,
            },
            /*
            {
              label: "Farmer Next of Kins",
              icon: "i-heroicons-user-group",
              to: "/user/farmernoks",
              exact: true,
            },
            {
              label: "Farmer Spouses",
              icon: "i-heroicons-user-group",
              to: "/user/spouses",
              exact: true,
            },
            {
              label: "Farms",
              icon: "i-heroicons-user-group",
              to: "/user/farms",
              exact: true,
            },
            {
              label: "Bank accounts",
              icon: "i-heroicons-user-group",
              to: "/user/bankaccounts",
              exact: true,
            },
            {
              label: "Cooperatives",
              icon: "i-heroicons-user-group",
              to: "/user/cooperatives",
              exact: true,
            },
            {
              label: "Crops",
              icon: "i-heroicons-user-group",
              to: "/user/crops",
              exact: true,
            },
            {
              label: "Crop Production",
              icon: "i-heroicons-chart-bar",
              to: "/user/cropproductions",
              exact: true,
            },
            {
              label: "Certificates",
              icon: "i-heroicons-document-arrow-up",
              to: "/user/cropcertificates",
              exact: true,
            },
            {
              label: "Certificate Issuers",
              icon: "i-heroicons-rectangle-stack",
              to: "/user/cropcertificateissuers",
              exact: true,
            },
            */
            {
              label: "Commodities",
              icon: "i-heroicons-shopping-cart",
              to: "/user/commodities",
              exact: true,
            },
            {
              label: "Livestock",
              icon: "i-heroicons-eye-dropper",
              to: "/user/livestock",
              exact: true,
            },
            {
              label: "Service Providers",
              icon: "i-heroicons-shopping-bag",
              to: "/user/providers",
              exact: true,
            },
            {
              label: "Weather",
              icon: "i-heroicons-cloud",
              to: "/user/weather",
              exact: true,
            },
            {
              label: "Settings",
              icon: "i-heroicons-cog",
              to: "/user/settings",
              exact: true,
            },
            {
              label: "Profile",
              icon: "i-heroicons-user",
              to: "/user/profile",
              exact: true,
            },
          ],
          /*
          [
            {
              label: "Settings",
              icon: "i-heroicons-cog",
              to: "/user/settings",
              exact: true,
            },
            {
              label: "Profile",
              icon: "i-heroicons-user",
              to: "/user/profile",
              exact: true,
            },
            
            {
              label: "Theme Options",
              icon: "i-heroicons-swatch",
              to: "/user/profile/appearance",
              exact: true,
            },          
          ],
          */
        ],
      };
    },
  
    methods: {
      async logout(){
        const router = useRouter();
        const supabase = useSupabaseClient();
        await supabase.auth.signOut().then((_)=>{
          console.log('Logged out')
          router.push("/auth/login")
        })
      }
    }
  };
  </script>
  
  
  <style scoped>
  /*
  .nuxt-container .sidebar {
    overflow-y: auto;
    max-height: 100vh;
  }
    */
  </style>
  