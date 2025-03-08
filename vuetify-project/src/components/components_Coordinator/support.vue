<template>
  <v-data-table 
    :search="search"
    :headers="headers"
    :items="info"
    class="elevation-1 center-align-lg"
    style="margin-top:3%"
    
  >
   <template v-slot:top>
      <div style="height:25px"></div>
    <v-toolbar flat>
         <v-toolbar-title><span class="tab_title"> SUPPORT </span></v-toolbar-title>
         
           <v-divider class="mx-4" inset  vertical></v-divider>
           <v-spacer></v-spacer>
             <v-text-field  v-model="search"  append-icon="mdi-magnify" label="Search"    single-line   hide-details></v-text-field><v-spacer></v-spacer>
           
           <v-dialog ref="dialog" v-model="dialogres" max-width="500px">
               <v-card>
                  <v-card-title class="headline"> Are you sure it is RESOLVED ?</v-card-title>
                   <v-card-actions>
                     <v-spacer></v-spacer>
                       <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                       <v-btn color="blue darken-1" text @click="resolveItem">YES</v-btn>
                    <v-spacer></v-spacer>
                 </v-card-actions>
               </v-card>
           </v-dialog>
           
      </v-toolbar>
      <div style="height:25px"></div>
      <hr>
    </template>
    <template v-slot:[`item.actions`]="{ item }"> 
        <v-icon  class="mr-2" color="green" @click="edit(item)">  assignment_turned_in   </v-icon> 
    </template>
    <template v-slot:no-data>
      <v-btn  color="primary"  @click="initialize"> Reset  </v-btn> 
    </template>
  </v-data-table>
</template>


<script>
import axios from "axios"
  export default {
    data: () => ({
          info: [],   
        search: '',
        dialogres: false,
        headers: [
          { text: 'GROUP NAME ',value: 'Group_Name', class:'tab_header'},
          { text: 'GR NUMBER', value: 'grno_EmpCode', class:'tab_header' },
          { text: 'QUERY', value: 'Support_Description_Name', class:'tab_header' },
          { text: 'Resolved', value: 'actions', class:'tab_header', sortable: false },
         
        ],  
         editedIndex: -1,

        editedItem: {
          Group_Name:null,
          grno_EmpCode:null,
          Support_Description_Name:null, 
        }
    }),

  
     watch: {
      dialogres(val){
      val ||this.close()
      },
    },

    mounted(){
    axios
    .get("http://localhost:8081/CoordinatorSupport")
    .then(response=>(this.info=response.data.data))
   },
      
  methods:{
    edit (item) {
        this.editedIndex = this.info.indexOf(item)
        this.editedItem = Object.assign({},item)
        this.dialogres = true
      },

    resolveItem(e)
    {
      
      this.axios.put("http://localhost:8081/CoordinatorSupport",this.editedItem)
      .then((result)=>{

        if(result.data.status=="success"){
          alert("Successfully Responded");
          this.dialogres=false
        }
        else{
          // alert(result.data.data.sqlMessage);
          alert("Some Error Occured");
        }
        console.warn(result)
      })
       e.preventDefault();
    },

     
      
      close(){
        this.dialogres=false
      }
  }
  
}

</script>