<template>
  <div class="container">
    <div class="shadow"></div>
    <div class="box">
      <div class="field">
        <div class="control has-icons-left">
          <input class="input" type="text" placeholder="username" value="">
          <span class="icon is-small is-left">
      <i class="fa fa-user"></i>
    </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left">
          <input class="input" type="password" placeholder="password" value="">
          <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button">Sign In</button>
        </div>
      </div>
      <div class="corner"></div>

    </div>

  </div>

</template>


<script>
  import AuthService from './../services/auth.service'


  export default {
    name: 'Card',
    data() {
      return {}
    },
    created() {
      console.log(AuthService);
      AuthService.auth();
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 300px;
    position: relative;
    background-color: #031e2f;
    .corner{
      width: 40px;
      height: 30px;
      right: 0;
      bottom: -15px;
      border-top: 32px solid rgba(255, 0, 0, 0);
      border-right: 40px solid #000a10;
      position: absolute;
      color: black;
    }
  }

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .shadow {
    box-shadow: 15px 31px 176px 300px #001f34;
    z-index: -1;
    position: absolute;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    height: 500px;
    top: -690px;
    width: 18%;
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

