<template>
  <div class="container">
    <div style="height:200px"></div>
    <!-- <center><strong>Welcome {{this.$store.state.auth.user.username}}!!!</strong></center> -->
    <!-- <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
     <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li> 
    </ul> -->
    
  <v-card
    class="mt-4 mx-auto"
    max-width="400"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
       Domain Preferences
      </div>
      <div class="subheading font-weight-light grey--text">
        Department- Computer
      </div>
      <v-divider class="my-2"></v-divider>
     
    </v-card-text>
  </v-card>

  </div>
  
</template>

<script>

export default {
  name: 'Profile',
   data: () => ({
      labels: [
        'DataScience',
        'AI',
        'Android',
        'Web',
        'Cyber',
        'DeepLearning',
        'ML',
        'CC',
        'Machine'
      ],
      value: [
        2,
        6,
        4,
        3,
        3,
        4,
        2,
        2,
      ],
    }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>