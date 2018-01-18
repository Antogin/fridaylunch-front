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
          <p class="title is-4">{{restaurant.name}}</p>
          <p class="cuisines">{{restaurant.cuisines}}</p>
        </div>
      </div>

      <div class="content">
        <!--{{restaurant.cuisines}}-->
        <br>
        <a v-bind:href="mapUrl" target="_blank">
          <i class="fas fa-map-marker-alt"></i>
        </a>

        {{restaurant.location.address}}
      </div>
    </div>
    <footer class="card-footer">
      <a v-on:click="addRestaurant(restaurant)" v-if="!restaurant.isSelected" class="card-footer-item">Add</a>
      <a v-on:click="removeRestaurant(restaurant)" v-if="restaurant.isSelected" class="card-footer-item added">
        <i class="fa fa-check" aria-hidden="true"></i>
        <i class="fa fa-times" aria-hidden="true"></i>
      </a>
      <a v-bind:href="restaurant.menu_url" target="_blank" class="card-footer-item">Menu</a>
    </footer>

  </div>

</template>

<script>


  export default {
    name: 'restaurantCard',
    props: ['restaurant'],
    data() {
      return {}
    },
    computed:{
      mapUrl: function () {

        let baseUrl = 'https://www.google.co.za/maps/search/';
        let adress = this.restaurant.location.address.split(' ').join('+');
        console.log(adress);
        return baseUrl + adress
      }
    },
    methods: {
      addRestaurant: function (restaurant) {
        this.$store.commit('addRestaurant', restaurant)
      },
      removeRestaurant: function (restaurant) {
        this.$store.commit('removeRestaurant', restaurant)
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "./../../variables";

  .title {
    margin-bottom: 0.5rem;
  }

  .tags {
    margin-bottom: 0;
  }

  .media-content {
    .cuisines {
      font-size: 12px;
      color: white;
    }
  }

  .card{
    height: 100%;
  }

  .card-footer {
    .added {
      background-color: $zai-pink;
      color: white;
      .fa-times {
        display: none;
      }
    }
  }

</style>
