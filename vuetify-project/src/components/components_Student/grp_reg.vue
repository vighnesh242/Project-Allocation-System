<template>
<v-card style="margin:  30px 20% 30px 20% ">
  <div class="groupInfo content-wrapper" style="padding-top:30px">
      <center> <h1>GROUP REGISTRATION</h1> </center>
       <div style="height: 20px"> </div>
      <hr> 
      <div style="height: 20px"> </div>
       
       </div>
<div class="stdRegistration content-wrapper center-align-sm" style="margin: 0 20%">
  <v-form @submit="postData" method="post">
    <v-container app center>

    <!-- PROJECT TYPE -->
     <v-flex>
      <v-radio-group v-model="group.Project_Type_id" row mandatory class="justify-center">
         <v-radio label="Industrial" value=1></v-radio>
         <v-radio label="Interdepartmental" value=2 ></v-radio>
         <v-radio label="Intradepartmental" value=3></v-radio>
      </v-radio-group>
     </v-flex>

      <!-- Department -->
         <v-row  class="d-flex" cols="12" sm="6">
        <v-select clearable outlined
          label="Department"
          :rules="[rules.required]"
          :items="department"
          item-text="text"
          item-value="value"
          v-model="group.department_name"
          filled
        >
        </v-select>
      </v-row>


      <!-- Member 1 -->
      <v-row cols="12"
          sm="6"
        >
          <v-text-field filled  clearable  outlined  v-model="group.Member1"  label="Member 1"  :rules="[rules.required,rules.counter]" ></v-text-field>
      </v-row>

      <!-- Member 2 -->
      <v-row        
          cols="12"
          sm="6"
        >
          <v-text-field filled  clearable  outlined  v-model="group.Member2"  label="Member 2"  :rules="[rules.required,rules.counter]" ></v-text-field>
      </v-row>

      <!-- Member 3 -->
      <v-row        
          cols="12"
          sm="6"
        >
          <v-text-field filled  clearable  outlined  v-model="group.Member3"  label="Member 3"  :rules="[rules.required,rules.counter]" ></v-text-field>
      </v-row>

      <!-- Member 4 -->
      <v-row        
          cols="12"
          sm="6"
        >
          <v-text-field filled  clearable  outlined  v-model="group.Member4"  label="Member 4"  :rules="[rules.required,rules.counter]" ></v-text-field>
      </v-row>



      <!-- Domain 1 -->
      <v-row 
        class="d-flex"
        cols="12"
        sm="6"
     >
        <v-select clearable outlined
          label="Domain Preference 1"
          :rules="[rules.required]"
          :items="domain"
          item-text="text"
          item-value="value"
          v-model="group.Domain_Pref_1"
          filled
        >
        </v-select>
      </v-row>


      <!-- Domain 2 -->
      <v-row 
        class="d-flex"
        cols="12"
        sm="6"
     >
        <v-select clearable outlined
          label="Domain Preference 2"
          :rules="[rules.required]"
          :items="domain"
          item-text="text"
          item-value="value"
          v-model="group.Domain_Pref_2"
          filled
        >
        </v-select>
      </v-row>

      
      <!-- Domain 3 -->
      <v-row 
        class="d-flex"
        cols="12"
        sm="6"
     >
        <v-select clearable outlined
          label="Domain Preference 3"
          :rules="[rules.required]"
          :items="domain"
          item-text="text"
          item-value="value"
          v-model="group.Domain_Pref_3"
          filled>
        </v-select>
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
        group:{
        Domain_Pref_1:null,
        Domain_Pref_2:null,
        Domain_Pref_3:null,
        Project_Type_id:null,
        department_name:null,
        Member1:null,
        Member2:null,
        Member3:null,
        Member4:null
        
      },
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
        
          department: 
            [
              { text: "Civil", value:1},
              { text: "Computer", value:2},
              { text: "Electronics and Telecommunication", value:3},
              { text: "Information Technology",value:4},
              { text: "Mechanical", value:5}
            ],
              
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
   methods :{
  postData(e)
    {
      this.axios.post("http://localhost:8081/GroupRegistration",this.group)
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
    }
  }
  }
</script>

<style>
h1{
     font-family: 'Poppins', sans-serif;
    }
</style>
