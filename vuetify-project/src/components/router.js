import VueRouter from 'vue-router'

import StudentRegistration from './components_Student/stud_reg.vue'
import StudentIndustryProject from './components_Student/stud_ind_proj.vue'
import GroupRegistration from './components_Student/grp_reg.vue'
import StudentGroupDetails from './components_Student/grp_info.vue'

import FacultyRegistration from './components_Faculty/fac_reg.vue'
import FacultyIndustryProject from './components_Faculty/fac_ind_proj.vue'
import DomainRegistration from './components_Faculty/dom_reg.vue'
import FacultyGroupDetails from './components_Faculty/grp_info'

import Reports from './components_Coordinator/reports.vue'
import CoordinatorIndustryProject from './components_Coordinator/coor_ind_proj.vue'
import CoordinatorGroupDetails from './components_Coordinator/group_members.vue'
import CoordinatorSupport from './components_Coordinator/support.vue' 

import Login from './components_Additional/Login.vue'
import Register from './components_Additional/Register.vue'

import Welcome from './components_Additional/welcome.vue'
import PageNotFound from './components_Additional/page_not_found.vue'


const routes = [
    { path: '/', component: Welcome, name: 'welcome'},

    { path: '/StudentRegistration', component: StudentRegistration, name: 'studentRegistration' },
    { path: '/StudentIndustryProject', component: StudentIndustryProject, name: 'studentIndustryProject' },
    { path: '/GroupRegistration', component: GroupRegistration, name: 'groupRegistration' },
    { path: '/StudentGroupDetails', component: StudentGroupDetails, name: 'studentGroupDetails' },

    { path: '/FacultyRegistration', component: FacultyRegistration, name: 'facultyRegistration' },
    { path: '/FacultyIndustryProject', component: FacultyIndustryProject, name: 'facultyIndustryProject' },
    { path: '/DomainRegistration', component: DomainRegistration, name: 'domainRegistration' },
    { path: '/FacultyGroupDetails', component: FacultyGroupDetails, name: 'facultyGroupDetails' },

    { path: '/Reports', component: Reports, name: 'reports' },
    { path: '/CoordinatorIndustryProject', component: CoordinatorIndustryProject, name: 'coordinatorIndustryProject' },
    { path: '/CoordinatorGroupDetails', component: CoordinatorGroupDetails, name: 'coordinatorGroupDetails' },
    { path: '/CoordinatorSupport', component: CoordinatorSupport, name: 'coordinatorSupport' },

    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', name: 'profile', component: () => import('./components_Additional/Profile.vue') }, // lazy-loaded
    { path: '/student', name: 'student', component: () => import('./components_Student/Student.vue') }, // lazy-loaded


  { path: '*', component: PageNotFound },
]

export const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});