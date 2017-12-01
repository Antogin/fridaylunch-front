<template>
  <div class="question-list">
    <div class="list-header">
      <h1 class="title">Restaurant</h1>
      <router-link to="search" class="button is-primary">Add restaurant</router-link>
      <!--<a class="button is-primary" v-on:click="openModal" >Add restaurant</a>-->

    </div>
    <div class="box" v-for="restaurant in selectedRestaurants">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img v-bind:src="restaurant.thumb" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <div>
              <small>{{restaurant.cuisines}}</small>
              <br>
              <strong>{{restaurant.name}}</strong>
              <small>
                <div class="tags has-addons">
                  <span class="tag">~{{restaurant.average_cost_for_two / 2}}</span>
                  <span class="tag is-info">ZAR</span>
                </div>
                <div class="tags has-addons">
                  <span class="tag">{{restaurant.user_rating.rating_text}}</span>
                  <span class="tag is-success" v-bind:style="{ 'background-color': '#' + restaurant.user_rating.rating_color}">{{restaurant.user_rating.aggregate_rating}}</span>
                </div>
              </small>
              <br>
            </div>

            <p class="address">
              {{restaurant.location.address}}
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-heart"></i></span>
              </a>
              <a class="level-item" v-on:click="removeRestaurant(restaurant)">
                <span class="icon is-small"><i class="fa fa-trash"></i></span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
  </div>
</template>

<script>

  export default {
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
