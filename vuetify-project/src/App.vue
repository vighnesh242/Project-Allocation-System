<template>
  <v-app class="grey lighten-4">
    <Navbar />

    <v-main style="background-color:#eaeef3">
      
      <router-view ></router-view>
      
    </v-main>
    
  </v-app>
</template>

<script>
import Vue from 'vue'
import Navbar from './components/nav'
export default Vue.extend ({
  components: { Navbar },
  name: 'App',
  data () {
    return {
      
    }
  }
})
</script>



