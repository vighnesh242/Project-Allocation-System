<template>
  <nav>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Welcome to </span>
        <span>VIERP</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app dark temporary v-model="drawer" class="deep-purple darken-1">     

      <v-treeview hoverable open-on-click :items="items">
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
  }
}
</script>
<style scoped>
  .nav-item *{
    color: white;
    text-decoration: none;
  }
</style>