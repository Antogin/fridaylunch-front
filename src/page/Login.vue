<template>
  <div class="container">
    <div class="shadow"></div>
    <div class="box">
      <form v-on:submit.prevent="logIn(user)">
        <div class="field">
          <div class="control has-icons-left">
            <input class="input" v-model="user.username" type="text" placeholder="username" value="">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>

        <div class="field">
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
        console.log('user', user.username);
        console.log('password', user.password);
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



  .field {
    .control {
      .has-icons-left {
        height: 3.25em;
      }
    }
    .input {
      color: white;
      background-color: #001624;
      border: 0;
      height: 3.25em;
      border-radius: 10px;
      padding-left: 4.25em;
    }
    .input:focus {
    }
    .input::placeholder {
      color: #5b646c;
    }
    .button {
      width: 100%;
      background-color: #001422;
      border: 0;
      color: #e7004d;
      font-weight: bold;
    }
    .icon {
      background-color: #00253c;
      color: #e7004d;
      height: 3.25em;
      width: 3.25em;
      border-radius: 5px 0 0 5px;
    }
    .control.has-icons-left .input:focus ~ .icon {
      color: #e7004d;
      border-color: #e7004d;

    }
  }

</style>

