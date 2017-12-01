<template>
  <div class="container">
    <div class="shadow"></div>

    <div class="loader-box">
      <!--<custom-loader></custom-loader>-->
    </div>

    <div class="grid">
      <create-question></create-question>
      <question-list></question-list>
    </div>
    <div class="modal" v-if="$store.state.ui.searchModal">
      <div class="shadow"></div>

      <search-restaurant></search-restaurant>

    </div>
  </div>
</template>

<script>

  import QuestionList from "../components/QuestionsList.vue";
  import CreateQuestion from "../components/CreateQustion.vue";

  export default {
    components: {
      CreateQuestion,
      QuestionList
    },
    name: 'HelloWorld',
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 33% 66%;

  }

  .container {
    height: 100%;
    padding-top: 50px;
  }

  .modal {
    position: fixed;
    background-color: white;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    overflow: hidden;
  }
</style>
