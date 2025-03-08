<template>
  <v-card class="center-align-lg"  style="margin-top:3%"> 
    <div style="height:20px"></div>

    <v-toolbar flat >
    <v-toolbar-title><span class="tab_title"> GROUP INFORMATION </span></v-toolbar-title> 

    <v-spacer></v-spacer>
  </v-toolbar>
  <div style="height:20px"></div>
  <hr>
  <div style="height:20px"></div>

    <div class="facultyGroupDetails content-wrapper">
        
        <v-simple-table fixed-header height="300px" sort-by="Group ID" disable-pagination>
          <template v-slot:default>
             <thead>
        <tr>
          <th style="font-size: 1.25em">GROUP NAME</th> 
          <th style="font-size: 1.25em">DOMAIN</th>
          <th style="font-size: 1.25em">GR. NO.</th>
             <th style="font-size: 1.25em">NAME</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(group) in info" :key="group.Group_Name"> 
               <td >{{group.Group_Name}}</td>               
               <td>{{group.Name}}</td>
               <td>{{group.grno_EmpCode}}</td>
               <td> {{group.FullName}}</td>
            </tr>
            
            
             
          </tbody>
        </template>
      </v-simple-table>  
      </div> 
 </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
        info:[]
      }   
  },
  mounted(){
    axios
    .get("http://localhost:8081/FacultyGroupDetails")
    .then(response=>(this.info=response.data.data))
    
  }
 }

 </script>