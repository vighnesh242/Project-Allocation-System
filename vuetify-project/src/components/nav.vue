<template>
  <nav>


    <!-- topnav -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Welcome to </span>
        <span>VIERP</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <span v-if="showStudentBoard" >
        <router-link to="/student">Student Board</router-link>
      </span> -->
      
      <v-spacer></v-spacer>
      
      <template v-if="!currentUser">
        <v-btn icon>
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />
            <!-- Sign Up -->
          </router-link>
        </v-btn>
        <v-btn icon>
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />
            <!-- Login -->
          </router-link>
        </v-btn>
      </template>

      <template v-if="currentUser">
        <v-btn icon>
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />
            <!-- LogOut -->
          </a>
        </v-btn>
      </template>

    </v-app-bar>


    <!-- sidenav -->
    <v-navigation-drawer app dark temporary v-model="drawer" class="deep-purple darken-1" v-if="currentUser">
      <!-- student -->
      <v-treeview hoverable open-on-click :items="studentNav" v-if="showStudentBoard">
          <template slot="label" slot-scope="props">
            <span class="red--text text--darken-2 nav-item"> 
              <router-link :to="props.item.to" v-if="props.item.to"> <v-icon>{{props.item.icon}}  </v-icon> {{ props.item.name }}</router-link>
              <span v-else>{{ props.item.name }}</span>
            </span>
          </template>
      </v-treeview>

      <!-- faculty -->
      <v-treeview hoverable open-on-click :items="facultyNav" v-if="showGuideBoard">
          <template slot="label" slot-scope="props">
            <span class="red--text text--darken-2 nav-item"> 
              <router-link :to="props.item.to" v-if="props.item.to"> <v-icon>{{props.item.icon}}  </v-icon> {{ props.item.name }}</router-link>
              <span v-else>{{ props.item.name }}</span>
            </span>
          </template>
      </v-treeview>

      <!-- coordinator -->
      <v-treeview hoverable open-on-click :items="coordinatorNav" v-if="showHodBoard">
          <template slot="label" slot-scope="props">
                <span class="red--text text--darken-2 nav-item"> 
                  <router-link :to="props.item.to" v-if="props.item.to"> <v-icon>{{props.item.icon}}  </v-icon> {{ props.item.name }}</router-link>
                  <span v-else>{{ props.item.name }}</span>
                </span>
            </template>
      </v-treeview>
     </v-navigation-drawer> 
   
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      studentNav: [
        {
          name: 'Student',
          children: [
            { icon: 'person', name: 'Student Registration', to: '/StudentRegistration'},
            { icon: 'supervised_user_circle', name: 'Industry Project', to: '/StudentIndustryProject' },
            { icon: 'groups', name: 'Group Registration', to: '/GroupRegistration' },
            { icon: 'info', name: 'Group Information', to: '/StudentGroupDetails' },
          ]
        }
      ],
      facultyNav:[
        {
          name: 'Faculty',
          children: [
            { icon: 'person', name: 'Faculty Registration', to: '/FacultyRegistration' },
            { icon: 'article', name: 'Industry Project', to: '/FacultyIndustryProject' },
            { icon: 'info', name: 'Domain Registration', to: '/DomainRegistration' },
            { icon: 'announcement', name: 'Groups Information', to: '/FacultyGroupDetails' },
          ]
        }
      ],
      coordinatorNav:[
        {
          name: 'Coordinator',
          children: [
            // { icon: 'pie_chart', name: 'Reports', to: '/Reports' },
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
}
</script>
<style scoped>
  .nav-item *{
    color: white;
    text-decoration: none;
  }
  .nav-item-link{
    color: grey;
  }
</style>