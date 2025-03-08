<template>
<v-card style="margin:  30px 20% 30px 20% ">
  <div class="groupInfo content-wrapper " style="padding-top:30px">
      <center> <h1>DOMAIN REGISTRATION</h1> </center>
       <div style="height: 20px"> </div>
      <hr> 
      <div style="height: 20px"> </div>
       <span style="height:30px"></span>
       </div>
<div class="stdRegistration content-wrapper center-align-sm">
  <v-form @submit="postData" method="post">
    <v-container app center>


      <!-- FACULTY ID -->
     <v-row cols="12" sm="6">
          <v-text-field clearable outlined
          :rules="[rules.required,rules.counter]"
            v-model="faculty_domain.grno_EmpCode"
            label="Faculty ID"
            filled
          ></v-text-field>
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
          v-model="faculty_domain.Domain_Pref_1"
          filled
          d
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
          v-model="faculty_domain.Domain_Pref_2"
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
          v-model="faculty_domain.Domain_Pref_3"
          filled
          
        >
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
        faculty_domain:{
        grno_EmpCode:null,
        Domain_Pref_1:null,
        Domain_Pref_2:null,
        Domain_Pref_3:null
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

  methods : {
    postData(e)
    {
      this.axios.post("http://localhost:8081/DomainRegistration",this.faculty_domain)
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