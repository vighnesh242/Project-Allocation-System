<template>
<v-card style="margin:  30px 20% 30px 20% ">
  <div class="groupInfo content-wrapper" style="padding-top:30px">
      <center> <h1>FACULTY REGISTRATION</h1> </center>
      <div style="height: 20px"> </div>
      <hr> 
      <div style="height: 20px"> </div>
       
       </div>
<div class="stdRegistration content-wrapper center-align-sm" style="margin: 0 20%">
  <v-form @submit="postData" method="post">
    <v-container app center>

      <v-row cols="12" sm="6">
          <v-text-field  label="Full Name"   v-model= "info[0].FullName" outlined  filled  :disabled="true" ></v-text-field>
      </v-row>

      <v-row cols="12" sm="6">
          <v-text-field label= "Faculty ID"  v-model= "info[0].grno_EmpCode" outlined  filled  :disabled="true" ></v-text-field>
      </v-row>

      <v-row cols="12" sm="6">
        <v-text-field  label="Department"  v-model= "info[0].department_name"  outlined filled  :disabled="true" >
        </v-text-field>
      </v-row>

      <v-row cols="12" sm="6">
          <v-text-field   label="Phone Number"   v-model= "info[0].mobile" outlined  filled   :disabled="true"  ></v-text-field>
      </v-row>


      <v-row center=align cols="6" sm="6"> 
          <v-text-field  label="E-mail"  v-model= "info[0].email"  outlined  filled    :disabled="true"  ></v-text-field>
      </v-row>
      
      <div class="text-center">
          <v-btn @click="postData" type="submit" color="primary" dark>
             <v-icon left>
               done
             </v-icon>
           SUBMIT
         </v-btn>
       </div>
     </v-container>
   </v-form>
  </div> 
</v-card>
</template>

<script>
  export default {
    data () {
      return { 

           info:[],
       departments: 
            ['Computer', 'Electronics and Telecommunication', 'Civil', 'Mechanical','Information Technology'],
          
         rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length <= 20 || 'Max 20 characters',
          counter2: value => value.length <= 10 || 'Max 10 numbers',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'  
          }
      }
    }
  },
  methods:{
    postData(e)
    {
      this.axios.post("http://localhost:8081/FacultyRegistration",this.info[0])
      .then((result)=>{
        if(result.data.status=="success"){
          alert("Successfully registered");
        }
        else{
          // alert(result.data.data.sqlMessage);
          alert("Some Error Occured");
        }
        console.warn(result)
      })
       e.preventDefault();
    },
  
  },
    
     mounted(){
    this.axios
    .get("http://localhost:8081/FacultyRegistration")
    .then(response=>(this.info=response.data.data))
    console.log(this.info)
  },

 
  }
</script>

<style>
    h1{
     font-family: 'Poppins', sans-serif;
    }
</style>



