<template>
  <v-data-table 
    :headers="headers"
    :items="info"
    sort-by="DueDate"
    class="elevation-1 center-align-lg"
    style="margin-top:3%"
    :search="search"
  >
    <template v-slot:top>
      <div style="height:25px"></div>
      <v-toolbar flat >
         <v-toolbar-title><span class="tab_title">INDUSTRY PROJECTS </span></v-toolbar-title>
           <v-divider class="mx-4" inset  vertical></v-divider>
           <v-spacer></v-spacer>
             <v-text-field  v-model="search"  append-icon="mdi-magnify" label="Search"    single-line   hide-details></v-text-field><v-spacer></v-spacer><v-spacer></v-spacer>

        <!-- ADD A NEW COMPANY MODAL  -->
         <v-dialog  v-model="dialog"  max-width="500px">
             <template v-slot:activator="{ on, attrs }">
               <v-btn color="primary" dark class="mb-2" v-bind="attrs"   v-on="on">Add Company </v-btn>
             </template>
          <v-card>
            <v-card-title>
              <span class="headline">New Company</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row cols="12" sm="6" md="4">
                       <v-text-field v-model="editedItem.CompanyName"  label="Company Name" ></v-text-field>
                </v-row> 
                
                  <v-row cols="12" sm="6" md="4">
                         <v-text-field  v-model="editedItem.Description"  label="Description" ></v-text-field>
                  </v-row>
                  
                    <v-row cols="12" sm="6" md="4">
                       <v-text-field  v-model="editedItem.FacultyRef"  label="Faculty Reference" ></v-text-field>
                    </v-row>
                   <v-row cols="12" sm="6" md="4">
                      <v-text-field  v-model="editedItem.Links"  label="Registration Link" ></v-text-field>
                  </v-row>
                   <v-row cols="12" sm="6" md="4">
                        <v-select  v-model="editedItem.Domain1" label="Domain"  :items="domain" item-text="text" item-value="value"  >  </v-select>  
                 </v-row>
                 <v-row  cols="12" sm="6" md="4">
                      <v-col cols="12" sm="6" md="4"> 
                         <v-dialog ref="dialog" v-model="modal" :return-value.sync="DueDate" persistent  width="290px">     

                             <template v-slot:activator="{ on, attrs }">
                                  <v-text-field v-model="editedItem.DueDate"  label="DueDate"   prepend-icon="mdi-calendar"  readonly  v-bind="attrs"   v-on="on"  ></v-text-field>
                              </template>        
                                  <v-date-picker  v-model="editedItem.DueDate"   scrollable  >
                                    <v-spacer></v-spacer>
                                       <v-btn text   color="primary"  @click="modal = false"  >  Cancel  </v-btn>
                                       <v-btn text   color="primary"  @click="$refs.dialog.save(DueDate)"> OK  </v-btn>
                                  </v-date-picker>
                          </v-dialog>
                       </v-col>
                   </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn   color="blue darken-1"  text  @click="close">  Cancel  </v-btn>
              <v-btn  color="blue darken-1"   text  @click="postData" >  Save  </v-btn>   
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- DELETE MODAL  -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteData">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>



        <!-- UPDATE COMPANY MODAL  -->
        <v-dialog  v-model="dialog2"  max-width="500px">

          <!--uPDATE COMPANY MODAL  -->
          <v-card>
            <v-card-title>
              <span class="headline">UPDATE COMPANY</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row cols="12" sm="6" md="4">
                       <v-text-field v-model="editedItem.CompanyName"  label="Company Name" ></v-text-field>
                </v-row> 
                
                  <v-row cols="12" sm="6" md="4">
                         <v-text-field  v-model="editedItem.Description"  label="Description" ></v-text-field>
                  </v-row>
                  
                    <v-row cols="12" sm="6" md="4">
                       <v-text-field  v-model="editedItem.FacultyRef"  label="FacultyRef" ></v-text-field>
                    </v-row>
                   <v-row cols="12" sm="6" md="4">
                      <v-text-field  v-model="editedItem.Links"  label="Registration Link" ></v-text-field>
                  </v-row>
                  <v-row cols="12" sm="6" md="4">
                        <v-select  v-model="editedItem.Domain1" label="Domain"  :items="domain" item-text="text" item-value="value"  >  </v-select>  
                  </v-row>
                   
                 <v-row  cols="12" sm="6" md="4">
                      <v-col cols="12" sm="6" md="4"> 
                         <v-dialog ref="dialog" v-model="modal" :return-value.sync="DueDate" persistent  width="290px">     

                             <template v-slot:activator="{ on, attrs }">
                                  <v-text-field v-model="editedItem.DueDate" hint="YYYY/MM/DD" label="DueDate"   prepend-icon="mdi-calendar"  readonly  v-bind="attrs"   v-on="on"  ></v-text-field>
                              </template>        
                                  <v-date-picker  v-model="editedItem.DueDate"   scrollable  >
                                    <v-spacer></v-spacer>
                                       <v-btn text   color="primary"  @click="modal = false"  >  Cancel  </v-btn>
                                       <v-btn text   color="primary"  @click="$refs.dialog.save(DueDate)"> OK  </v-btn>
                                  </v-date-picker>
                          </v-dialog>
                       </v-col>
                   </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn   color="blue darken-1"  text  @click="closeUpdate">  Cancel  </v-btn>
              <v-btn  color="blue darken-1"   text  @click="updateItem" >  Save  </v-btn>   
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
      <div style="height:25px"></div>
      <hr>
    </template>
    <template v-slot:[`item.actions`]="{ item }"> 
      <v-icon  class="mr-2" color="indigo" @click="editItem(item)">  mdi-pencil   </v-icon>
      <v-icon  class="mr-2" color="red" @click="deleteItem(item)">  mdi-delete   </v-icon>
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
      info:[],
      DueDate: new Date().toISOString().substr(0, 10), //date
      menu: false, //date
      modal: false, //date
      menu2: false, //date
      dialog: false,//addcompany
      dialog2: false, //updatecompany
      dialogDelete: false,//deletecompany
      search: '',
      headers: [
          { text: 'Company Name',value: 'CompanyName', class:'tab_header'},
          { text: 'Description', value: 'Description', class:'tab_header' },
          { text: 'Domain1', value: 'Domain1', class:'tab_header' },
          { text: 'DueDate', value: 'DueDate', class:'tab_header' },
          { text: 'Apply', value: 'Links', class:'tab_header' },
          { text: 'Actions', value: 'actions',class:'tab_header', sortable: false },
        ], 
        domain: 
            [
              { text: "Web Development", value:1},
              { text: "Machine Learning", value:2},
              { text: "Cyber Security", value:3},
              { text: "Data Science",value:4},
              { text: "Android Development",value:5},
              { text: "Blockchain",value:6},
              { text: "Deep Learning",value:7},
              { text: "Artificial Intelligence",value:8},
              { text: "Internet Of Things",value:9},
              { text: "Cloud Computing",value:10}
           ],

      
      editedIndex: -1,
      editedItem: {
        Companyname:null,
        Description:null,
        Domain1:null,
        DueDate:null,
        FacultyRef:null,
        Links:null
        
      },
      defaultItem: {
        Companyname:null,
        Description:null,
        Domain1:null,
        DueDate:null,
        FacultyRef:null,
        Links:null
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

     mounted(){
    axios
    .get("http://localhost:8081/CoordinatorIndustryProject")
    .then(response=>(this.info=response.data.data))
  },

    methods: {

       postData(e)
    {
      this.axios.post("http://localhost:8081/CoordinatorIndustryProject",this.editedItem)
      .then((result)=>{
        if(result.data.status=="success"){
          alert("Successfully Added");
          this.dialog = false
        }
        else{
          // alert(result.data.data.sqlMessage);
          alert("Some Error Occured");
        }
        console.warn(result)
      })
       e.preventDefault();
    },


    //  UPDATE FUNCTION
     updateItem(e)
    {
      
      this.axios.put("http://localhost:8081/CoordinatorIndustryProject",this.editedItem)
      .then((result)=>{
        console.log(result);
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

    //DELETE ENTIRE ROW
     deleteData(e)
    {
      
      this.axios.put("http://localhost:8081/CoordinatorIndustryProject/"+this.CompanyName,this.editedItem)
      .then((result)=>{
        if(result.data.status=="success"){
          console.log(result)
          alert("Successfully Deleted");
          this.info.splice(this.editedIndex, 1)
          this.dialogDelete=false
        }
        else{
          // alert(result.data.data.sqlMessage);
          alert("Some Error Occured");
        }
        console.log(result)
      })
       e.preventDefault();
    },


      //fOR pENCIL iCON
      editItem (item) {
        this.editedIndex = this.info.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog2 = true
      },
       
        
      //FOR DELETE ICON
      deleteItem (item) {
        this.editedIndex = this.info.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.info.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      
      //CLOSE THE NEW COMPANY MODAL
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      //CLOSE THE UPDATE COMPANY MODAL
      closeUpdate()
      {
        this.dialog2=false
      },

      //CLOSE THE DELETE MODAL 
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.info[this.editedIndex], this.editedItem)
        } else {
          this.info.push(this.editedItem)
        }
        this.close()
      },
    },
  }
 </script>