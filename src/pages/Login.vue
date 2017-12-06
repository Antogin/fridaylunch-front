<template>
  <div class="container">
    <div class="shadow"></div>
    <div class="box">
      <form v-on:submit.prevent="logIn(user)">
        <div class="zai-field">
          <div class="control has-icons-left">
            <input class="input" v-model="user.username" type="text" placeholder="username" value="">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>

        <div class="zai-field">
          <div class="control has-icons-left">
            <input class="input" type="password" v-model="user.password" placeholder="password" value="">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button" type="submit">Sign In</button>
          </div>
        </div>
          <div class="corner"></div>
      </form>
    </div>

  </div>

</template>


<script>
  import AuthService from './../services/auth.service'

  export default {
    name: 'Card',
    data() {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      logIn: function (user) {
        AuthService.auth(user.username,  user.password);


      },
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>


  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .zai-field {
    margin: 10px 0;
  }

  .button {
    width: 100%;
    background-color: #001422;
    border: 0;
    color: #e7004d;
    font-weight: bold;
  }

</style>

