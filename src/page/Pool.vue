<template>
  <div class="container">
    <div class="shadow"></div>

    <div class="grid">
      <create-question></create-question>
      <question-list></question-list>
    </div>
    <div class="modal" v-if="$store.state.ui.searchModal">
      <search-restaurant></search-restaurant>

    </div>
  </div>
</template>

<script>

  import QuestionList from "../components/QuestionsList.vue";
  import CreateQuestion from "../components/CreateQustion.vue";
  import SearchRestaurant from "../components/search/SearchRestaurant.vue";

  export default {
    components: {
      SearchRestaurant,
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

  .modal{
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
