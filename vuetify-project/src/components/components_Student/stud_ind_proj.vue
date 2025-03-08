<template>
  <v-card class="center-align-lg" style="margin-top:3%">
    <v-card-title>
      <span class="tab_title">  
      INDUSTRY PROJECTS </span>
      <v-spacer></v-spacer>
       <v-text-field  v-model="search" clearable  append-icon="mdi-magnify" label="Search"    single-line   hide-details></v-text-field>
    </v-card-title>
    <hr>
    <v-data-table light :headers="headers" :items="info"  :search="search" hide-default-footer >
      <template v-slot:item="row">
        <tr>
           <tr>
            <td>{{row.item.CompanyName}}</td>
            <td>{{row.item.Description}}</td>
            <td>{{row.item.Domain1}}</td>
            <td>{{row.item.DueDate}}</td>
            <td><v-btn small  elevation="4" outlined color="green" class='mx-2'  v-on:click="btnClick(row.item.Links)"> <v-icon left> input </v-icon>Apply</v-btn></td>
        </tr>
      </template>
    </v-data-table >
  </v-card>
</template>

<script>
import axios from "axios"
  export default {
    data () {
      //Industry-Project Company_Id Domain1 Domain2 CompanyName DueDate Description FacultyRef Links College_id visible 
      return {
          info: [],   
        search: '',
        headers: [
          { text: 'Company Name',value: 'CompanyName', class:'tab_header'},
          { text: 'Description', value: 'Description', class:'tab_header' },
          { text: 'Domain1', value: 'Domain1', class:'tab_header' },
          { text: 'Duedate', value: 'DueDate', class:'tab_header' },
          { text: 'Apply', value: 'Links', class:'tab_header' },

        ],   
      }
    },
    mounted(){
    axios
    .get("http://localhost:8081/StudentIndustryProject")
    .then(response=>(this.info=response.data.data))
  },
   methods:
   {
  
    btnClick:function(registration_link)  
      { window.open(registration_link);
      
      console.warn(registration_link); }
      }

}

</script>
