<template>
  <div class="box">

    <div class="vote-arrows">

      <div class="vote-arrow upvote">
        <i class="fa fa-angle-up" aria-hidden="true"></i>
      </div>

      <div class="vote-arrow downvote">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </div>

    </div>
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

</template>


<script>

  export default {
    name: 'VoteCard',
    props: ['restaurant'],
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },


    methods: {
      removeRestaurant: function (restaurant) {
        this.$store.commit('removeRestaurant',restaurant)
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "./../variables";

  .box {
    display: flex;
    padding: 0;
    overflow: hidden;

    article {
      padding: 1.25rem 1.25rem 1.25rem 0;
    }
  }

  .vote-arrows {
    cursor: pointer;
    width: 75px;
    font-size: 20px;
    color: $zai-pink;
    .vote-arrow {
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .vote-arrow:hover {
      background-color: $zai-pink;
      color: white;
    }
  }


</style>
