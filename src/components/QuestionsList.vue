<template>
  <div class="question-list">
    <div class="list-header">
      <h1 class="title">Restaurant</h1>
      <router-link to="search" class="button is-primary">Add restaurant</router-link>
      <!--<a class="button is-primary" v-on:click="openModal" >Add restaurant</a>-->

    </div>
    <vote-card v-for="restaurant in selectedRestaurants" v-bind:restaurant="restaurant" :key="restaurant.restaurant_id"></vote-card>
  </div>
</template>

<script>

  import VoteCard from "./VoteCard.vue";

  export default {
    components: {VoteCard},
    name: 'QuestionList',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      openModal() {
        this.$store.commit('openModal');
      },
      removeRestaurant: function (restaurant) {
        this.$store.commit('removeRestaurant',restaurant)
      },
    },
    computed: {
      selectedRestaurants() {
        return this.$store.state.selectedRestaurants
      },
    }
  }
</script>

<style lang="scss" scoped>
  .list-header {
    display: flex;
    justify-content: space-between;
  }

  .question-list {
    padding: 0 40px;
  }

  .content {
    .tags, strong {
      float: left;
    }
    .address{
      margin: 25px 0;
    }
  }

  .has-addons{
    margin-left: 10px;
  }

</style>
