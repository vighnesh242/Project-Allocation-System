<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
      hfc 
    </header>
  </div>
</template>

<script>
import UserService from './../../services/user.service';

export default {
  name: 'User',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getStudentBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>