<template>
  <v-card class="center-align-lg" style="margin-top:5%"> 
    <div style="height:20px"></div>
    <v-toolbar flat >
    <v-toolbar-title><span class="tab_title"> GROUP INFORMATION </span></v-toolbar-title> 
    
    <v-spacer></v-spacer>
    

    <!--  MODAL  -->
    <v-dialog  v-model="dialog"  max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs"   v-on="on"> Query </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Select Query</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row cols="12" sm="6" md="4">
              <v-text-field v-model="query.grno_EmpCode" clearable outlined :rules="[rules.required,rules.counter2]" label="Gr.Number"   filled ></v-text-field>  
            </v-row>
            <v-row cols="12" sm="6" md="4">
              <v-text-field v-model="query.Group_Name" clearable outlined :rules="[rules.required,rules.counter]"  label="Group Id"   filled ></v-text-field>  
            </v-row>
            <v-row cols="12" sm="6" md="4">
              <v-select v-model="query.querydesc" clearable outlined   label="Select your query"   :rules="[rules.required]"  :items="query_list"   filled></v-select>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn   color="blue darken-1"  text  @click="dialog = false">  Cancel  </v-btn>
          <v-btn  color="blue darken-1"   text  @click="postData" >  Save  </v-btn>   
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-toolbar>
  <div style="height:20px"></div>
  <hr>
  <div style="height:10px"></div>
       <v-card-title>
        <div style="width:50%">
          <tr v-for="(group) in info[0] " :key="group.Group_Name" >
                <th class="center"> Group NAME : </th>
                <td> {{group.Group_Name}}</td>
                 <th class="center"> Domain : </th>           
                <td>{{group.final_domain}}</td>
              </tr>
        </div>
          <div style="width:50%">
            <tr v-for="(group) in info[1] " :key="group.Group_Name" >
            <th>Guides : </th>
            <td>{{group.Instructor_name}} </td>
            </tr>
          </div>
          
      
    </v-card-title>
    <div style="height:10px"></div>
        <hr>
        <!-- </div> -->
        <v-simple-table
    fixed-header
    height="300px"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left" style="font-size: 1.25em">
            Member Name
          </th>
          <th class="text-left" style="font-size: 1.25em">
            Member Grno
          </th>
        </tr>
      </thead>
      <tbody>
         <tr v-for="(group) in info[2]" :key="group.FullName">
          <td>{{group.FullName}} </td>
          <td>{{group.grno_EmpCode}}</td>
          </tr>
       </tbody>
     </template>
  </v-simple-table>   
 </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data: () =>({
    info:[],
    dialog:false,
    modal:false,
    query_list:[
                 
                 {text:"Change Group",value:1},
                 {text:"Change Module",value:2}
                 ],
    query: {
        
        Group_Name:null,
        grno_EmpCode:null,
        querydesc:null
  
      },
    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 20 || 'Max 20 characters',
      counter2: value => value.length <= 10 || 'Max 10 numbers',
    }         
  }),
  methods:{
    postData(e)
    {
      console.log("Postquery");
      this.axios.post("http://localhost:8081/StudentGroupDetails",this.query)
      .then((result)=>{
        if(result.data.status=="success"){
          alert("Query Token Raised");
          this.dialog=false
        }
        else{
          // alert(result.data.data.sqlMessage);
          alert("Some Error Occured");
        }
        console.warn(result)
      })
       e.preventDefault();
    }
  },
  
  mounted(){
    axios
    .get("http://localhost:8081/StudentGroupDetails/")
    .then(response=>(this.info=response.data.data))
    console.log(this.info)
  },
 }

</script>