<template>
  <v-app class="grey lighten-4">
    <!-- <Navbar />

    <v-main style="background-color:#eaeef3">
      
      <router-view ></router-view>
       -->
    <!-- </v-main> -->
    <!-- <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Welcome to </span>
        <span>VIERP</span>
      </v-toolbar-title>
    </v-app-bar> -->

    <v-navigation-drawer app dark temporary v-model="drawer" class="deep-purple darken-1" v-if="currentUser">     

      <v-treeview hoverable open-on-click :items="items">
          <template slot="label" slot-scope="props" >
                <span class="red--text text--darken-2 nav-item"> 
                  <router-link :to="props.item.to" v-if="props.item.to"> <v-icon>{{props.item.icon}}  </v-icon> {{ props.item.name }}</router-link>
                  <span v-else>{{ props.item.name }}</span>
                </span>
            </template>
      </v-treeview>

     </v-navigation-drawer>

    <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
      <a href class="navbar-brand" @click.prevent></a>
      <div class="navbar-nav mr-auto">
        <!-- <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li> -->
        <li v-if="showStudentBoard" class="nav-item">
          <router-link to="/student" class="nav-link">Student Board</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
  </v-app>
</template>

<script>
// import Vue from 'vue'
// import Navbar from './components/nav'
// export default Vue.extend ({
//   components: { Navbar },
//   name: 'App',
//   data () {
//     return {
      
//     }
//   }
// })
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          name: 'Student',
          children: [
            { icon: 'person', name: 'Student Registration', to: '/StudentRegistration'},
            { icon: 'supervised_user_circle', name: 'Industry Project', to: '/StudentIndustryProject' },
            { icon: 'groups', name: 'Group Registration', to: '/GroupRegistration' },
            { icon: 'info', name: 'Group Information', to: '/StudentGroupDetails' },
          ]
        },
        {
          name: 'Faculty',
          children: [
            { icon: 'person', name: 'Faculty Registration', to: '/FacultyRegistration' },
            { icon: 'article', name: 'Industry Project', to: '/FacultyIndustryProject' },
            { icon: 'info', name: 'Domain Registration', to: '/DomainRegistration' },
            { icon: 'announcement', name: 'Groups Information', to: '/FacultyGroupDetails' },
          ]
        },
        {
          name: 'Coordinator',
          children: [
            { icon: 'pie_chart', name: 'Reports', to: '/Reports' },
            { icon: 'supervised_user_circle', name: 'Industry Project', to: '/CoordinatorIndustryProject' },
            { icon: 'group_add', name: 'Group Details', to: '/CoordinatorGroupDetails' },
            { icon: 'support_agent', name: 'Support', to: 'CoordinatorSupport' },
          ]
        }
      ]
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showStudentBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_STUDENT');
      }

      return false;
    },
    showGuideBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_GUIDE');
      }

      return false;
    },
      showHodBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_HOD');
      }

      return false;
    },
      showDirectorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_DIRECTOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
   nav *{
    color: white;
    text-decoration: none;
  }
</style>

