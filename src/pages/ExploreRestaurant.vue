<template>
  <div>
    <section class="hero is-primary is-medium">
      <!-- Hero head: will stick at the top -->

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Explore
          </h1>
          <h2 class="subtitle">
            Cape Town
          </h2>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <!--<div class="hero-foot">-->
      <!--<nav class="tabs">-->
      <!--<div class="container">-->
      <!--<ul>-->
      <!--<li class="is-active"><a>Overview</a></li>-->
      <!--<li><a>Modifiers</a></li>-->
      <!--<li><a>Grid</a></li>-->
      <!--<li><a>Elements</a></li>-->
      <!--<li><a>Components</a></li>-->
      <!--<li><a>Layout</a></li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--</nav>-->
      <!--</div>-->
    </section>
    <div class="container">

      <div class="grid">
        <!--<div class="box grid-item" v-for="collection in collections">-->

        <!--<article class="media">-->
        <!--<div class="media-left">-->
        <!--<figure class="image is-64x64">-->
        <!--<img v-bind:src="collection.image_url" alt="Image">-->
        <!--</figure>-->
        <!--</div>-->
        <!--<div class="media-content">-->
        <!--<div class="content">-->
        <!--<div>-->
        <!--<strong>{{collection.title}}</strong>-->
        <!--<br>-->
        <!--</div>-->

        <!--<p class="address">-->
        <!--{{collection.description}}-->
        <!--</p>-->
        <!--</div>-->
        <!--<nav class="level is-mobile">-->
        <!--<div class="level-left">-->
        <!--<a class="level-item">-->
        <!--<span class="icon is-small"><i class="fa fa-heart"></i></span>-->
        <!--</a>-->
        <!--</div>-->
        <!--</nav>-->
        <!--</div>-->
        <!--</article>-->
        <!--</div>-->
        <div class="card grid-item" v-for="collection in collections">
          <div class="card-image">
            <figure class="image">
              <img v-bind:src="collection.image_url">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <div class="control">
                  <div class="tags has-addons">
                    <!--<span class="tag">{{restaurant.user_rating.rating_text}}</span>-->
                    <!--<span class="tag is-success" v-bind:style="{ 'background-color': '#' + restaurant.user_rating.rating_color}">{{restaurant.user_rating.aggregate_rating}}</span>-->
                  </div>
                  <div class="tags has-addons">
                    <!--<span class="tag">~{{restaurant.average_cost_for_two / 2}}</span>-->
                    <!--<span class="tag is-info">ZAR</span>-->
                  </div>
                </div>
              </div>
              <div class="media-content">
                <p class="title is-4"> {{collection.title}}</p>
                <!--<p class="cuisines">{{restaurant.cuisines}}</p>-->
              </div>
            </div>

            <div class="content">
              {{collection.description}}
              <br>
              <!--{{restaurant.location.address}}-->
            </div>
          </div>
          <footer class="card-footer">
            <!--<a v-on:click="addRestaurant(restaurant)" v-if="!restaurant.isSelected" class="card-footer-item">Add</a>-->
            <!--<a v-on:click="removeRestaurant(restaurant)" v-if="restaurant.isSelected" class="card-footer-item added">-->
            <!--<i class="fa fa-check" aria-hidden="true"></i>-->
            <!--<i class="fa fa-times" aria-hidden="true"></i>-->
            <!--</a>-->
            <router-link v-bind:to="'collection/'+collection.collection_id" class="card-footer-item">Open</router-link>
            <!--<a v-bind:href="collection.url" class="card-footer-item">Open</a>-->
          </footer>

        </div>
      </div>

    </div>
  </div>
</template>


<script>
  import ZomatoService from "./../services/zomato.service";

  export default {
    name: 'ExploreRestaurant',
    data() {
      return {}
    },
    methods: {
      handleScroll: function (event) {
        if (event.srcElement.scrollHeight - event.srcElement.offsetHeight - event.srcElement.scrollTop < 50) {
          this.nextPage(this.searchQuery)
        }
      },
      nextPage() {
        var self = this;


        if (self.isLoading) {
          return
        }
        self.isLoading = true;
        let query = {
          entity_id: '64',
          entity_type: 'city',
          q: self.searchQuery,
          start: self.nextSearchPage,
          cuisines: this.$store.getters.cuisineFilterIds.toString(),
          establishment_type: this.$store.getters.establishmentFilterIds.toString(),
        };


        ZomatoService.search(query).then((response) => {
          this.$store.commit('pushSearchRestaurant', response.data.restaurants.map((item) => item.restaurant));
          this.$store.commit('setSearchRestaurantPage', {
            step: response.data.results_shown,
            start: response.data.results_start
          });
          self.isLoading = false;
        });
      },
      addEstablishment: function (tag) {
        var self = this;
        self.establishmentFilter.push(tag)
      },
      removeEstablishment: function (establishment) {
        this.$store.commit('removeEstablishment', establishment.id);
      },
      addCuisine: function (cuisine) {
        var self = this;
        self.cuisineFilter.push(cuisine)
      },
      removeCuisine: function (cuisine) {
        this.$store.commit('removeCuisine', cuisine.cuisine_id);
      },
      closeModal: function () {
        this.$store.commit('closeModal');
      },
      search: function (searchQuery, start) {
        var self = this;

        if (self.isLoading) {
          return
        }
        self.isLoading = true;
        let query = {
          entity_id: '64',
          entity_type: 'city',
          q: searchQuery,
          cuisines: this.$store.getters.cuisineFilterIds.toString(),
          establishment_type: this.$store.getters.establishmentFilterIds.toString(),
        };


        ZomatoService.search(query).then((response) => {
          this.$store.commit('setSearchRestaurant', response.data.restaurants.map((item) => item.restaurant));
          this.$store.commit('setSearchRestaurantPage', {
            step: response.data.results_shown,
            start: response.data.results_start
          });
          self.isLoading = false;
        });
      },
    },
    computed: {
      searchedRestaurants() {
        return this.$store.getters.formattedSearchRestaurants
      },

      nextSearchPage() {
        return this.$store.getters.nextSearchPage
      },

      collections() {
        return this.$store.state.explorePage.collections
      },

      selectedEstablishments() {
        return this.$store.state.searchFilter.establishmentFilter.filter((establishment => establishment.isSelected))
      },

    },
    mounted() {


      ZomatoService.getCollections().then(
        (response) => {
          console.log(response.data);
          this.$store.commit('setCollections', response.data.collections.map((item) => item.collection));
        }
      );
    }
  }
</script>


<style scoped lang="scss">
  @import "./../variables";

  .hero.is-medium .hero-body {
    background-color: $zai-pink;
    /*padding-bottom: 0;*/
    /*padding-top: 0;*/
  }

  .grid {
    display: grid;
    /*overflow: auto;*/
    .grid-item {
      margin: 10px;
      display: flex;
      flex-direction: column;
      .card-content {
        flex: 1 0 auto;
      }
      .card-footer-item {
        height: 50px;
      }
    }

    @include breakpoint(notebook) {
      grid-template-columns: 50% 50%;
    }

    @include breakpoint(laptop) {
      grid-template-columns: 33% 33% 33%;
    }

    @include breakpoint(desktop) {
      grid-template-columns: 25% 25% 25% 25%;
    }
    @include breakpoint(mobileonly) {
      float: left;
    }
  }


</style>
