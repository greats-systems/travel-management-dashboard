export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    
    // Verify config values are available
    console.log('Supabase URL:', config.public.supabaseUrl)
    console.log('Supabase Key:', config.public.supabaseKey)
  
    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseKey
    )
  
    return {
      provide: {
        supabase
      }
    }
  })