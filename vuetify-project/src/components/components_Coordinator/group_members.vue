<template>
  <div>
    <v-card class="elevation-1 center-align-lg"
        style="margin-top:3%">
      <v-data-table 
        :headers="headers1"
        :items="info"
        :single-expand="singleExpand" 
        :search="search"
        item-key="group_id"
        show-expand
        sort-by="group_id">
        <!-- class="elevation-1 center-align-lg"
        style="margin-top:3%"> -->
        
      <template v-slot:top>
          <div style="height:25px"></div>
          <v-toolbar flat >
            <v-toolbar-title><span class="tab_title">GROUP MEMBERS </span></v-toolbar-title>
            
              <v-divider class="mx-4" inset  vertical></v-divider>
              <v-spacer></v-spacer> 
              <v-text-field  v-model="search" clearable  append-icon="mdi-magnify" label="Search"    single-line   hide-details></v-text-field><v-spacer></v-spacer>
            <v-switch
              v-model="singleExpand"
              label="Single expand"
              class="mt-2"
            ></v-switch>
          

        <!--uPDATE COMPANY MODAL  -->

        <v-dialog  v-model="dialog2"  max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">UPDATE GROUP DETAILS</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.Group_Name" disabled label="Group ID :" ></v-text-field>
                    </v-row> 
                    
                      <v-row cols="12" sm="6" md="4">
                          <v-text-field  v-model="editedItem.final_domain"  label="Domain" ></v-text-field>
                      </v-row>
                      
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field  v-model="editedItem.Member1"  label="Member 1:" ></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field  v-model="editedItem.Member2"  label="Member 2:" ></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field  v-model="editedItem.Member3"  label="Member 3:" ></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field  v-model="editedItem.Member4"  label="Member 4:" ></v-text-field>
                        </v-row>
                      <v-row cols="12" sm="6" md="4">
                          <v-text-field  v-model="editedItem.instructor"  label="Faculty Id :" ></v-text-field>
                      </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn   color="blue darken-1"  text  @click="close">  Cancel  </v-btn>
                  <v-btn  color="blue darken-1"   text  @click="updateItem" >  Save  </v-btn>   
                </v-card-actions>
              </v-card>
            </v-dialog>

        </v-toolbar>
          <hr>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-card  class="ma-5"  max-width="1000px" >
              <v-simple-table>
                <template v-slot:default>
                  
                    <v-col col="4">
                      <thead>
                        
                          <th class="text-left" style="font-size: 1.0em">  Members 
                            </th>                     
                          
                      </thead>
                      <tbody>  
                        <tr>
                          <td>
                              {{item.Member1}}
                              <br/>{{item.Member2}}
                            <br/>{{item.Member3}}
                            <br/>{{item.Member4}}</td>    
                        </tr>  
                      </tbody>
                    </v-col>
                </template> 
              </v-simple-table>
            </v-card>          
          </td>
        </template>

        <template v-slot:[`item.actions`]="{ item }"> 
            <v-icon  class="mr-1" color="black" @click="editgrp(item)">  mdi-pencil   </v-icon> 
        </template>
      </v-data-table>
    </v-card>
    <v-card class="elevation-1 center-align-lg"
        style="margin-top:3%">
      <v-card-title>
        <span class="tab_title" style="font-size:20px">INITIATE ALLOCATION PROCESS</span>
        <v-divider class="mx-4" inset  vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" color="primary" dark @click="allocate">
          Allocate <v-icon dark right > mdi-checkbox-marked-circle </v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </div>
</template>


<script>
import axios from "axios"
  export default {
    data: ()=> ({
        info:[],
        expanded: [],
        dialog2: false,
        singleExpand: false,
        search: '',
        headers1: [
          { text: 'GROUP NAME',value:'Group_Name', class:'tab_header'},
          { text: 'DOMAIN', value: 'final_domain' , class:'tab_header'},
          { text: 'FACULTY', value: 'instructor' , class:'tab_header'},
          { text: 'ACTIONS', value: 'actions', class:'tab_header', sortable: false },
          { text: '', value: 'data-table-expand' , class:'tab_header'}
           
        ],

        editedIndex: -1,
        editedItem: {
              group_id:null,
              domain:null,
              member1:null,
              member2:null,
              member3:null,
              member4:null,
              faculty_id:null, 
            },
      }),

      watch: {
      dialog2 (val) {
        val || this.close()
      }
      },

  
   mounted(){
    axios
    .get("http://localhost:8081/CoordinatorGroupDetails")
    .then(response=>(this.info=response.data.data))
   },

    methods: {

      editgrp(item) {
        
        this.editedIndex = this.info.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog2 = true
      },

       updateItem(e)
    {
      
      this.axios.put("http://localhost:8081/CoordinatorGroupDetails",this.editedItem)
      .then((result)=>{
        if(result.data.status=="success"){
          alert("Successfully Added");
          this.dialog2 = false
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

      this.dialog2 = false
    },
    allocate(e){
      this.axios.post("http://localhost:8081/Allocate")
      .then((result)=>{
        if(result.data.status=="success"){
          alert("Successfully Allocated");
        }
        else{
          console.log(result.data.data.sqlMessage);
          alert("Some Error Occured");
        }
        console.warn(result)
      })
      e.preventDefault();
    }


    }//method
       
  }//default
 
</script>