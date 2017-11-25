<template>
  <div class="card" v-if="restaurant">
    <div class="card-image">
      <figure class="image">
        <img v-bind:src="restaurant.featured_image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <div class="control">
            <div class="tags has-addons">
              <span class="tag">{{restaurant.user_rating.rating_text}}</span>
              <span class="tag is-success" v-bind:style="{ 'background-color': '#' + restaurant.user_rating.rating_color}">{{restaurant.user_rating.aggregate_rating}}</span>
            </div>
            <div class="tags has-addons">
              <span class="tag">~{{restaurant.average_cost_for_two / 2}}</span>
              <span class="tag is-info">ZAR</span>
            </div>
          </div>
        </div>
        <div class="media-content">
          <p class="title is-4"> {{restaurant.name}}</p>
          <p>{{restaurant.cuisines}}</p>
        </div>
      </div>

      <div class="content">
        <!--{{restaurant.cuisines}}-->
        <br>
        {{restaurant.location.address}}
      </div>
    </div>
    <footer class="card-footer">
      <a v-on:click="addRestaurant(restaurant)" v-if="!restaurant.isSelected" class="card-footer-item">Select</a>
      <a v-on:click="removeRestaurant(restaurant)" v-if="restaurant.isSelected" class="card-footer-item">Remove</a>
      <a v-bind:href="restaurant.menu_url" target="_blank" class="card-footer-item">Menu</a>
    </footer>

  </div>

</template>

<script>


  export default {
    name: 'restaurantCard',
    props: ['restaurant'],
    data() {
      return {
      }
    },
    methods: {
      addRestaurant: function (restaurant) {
        console.log('addRestaurant', restaurant);
        this.$store.commit('addRestaurant',restaurant)
      },
      removeRestaurant: function (restaurant) {
        console.log('removeRestaurant', restaurant);
        this.$store.commit('removeRestaurant',restaurant)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .title {
    margin-bottom: 0.5rem;
  }

  .tags {
    margin-bottom: 0;
  }

</style>
