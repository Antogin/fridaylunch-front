<template>

  <div class="collection-list">
    <!--<section class="hero is-primary is-medium" :style="{'background-image':selectedCollection? `url('${selectedCollection.image_url}')`  : ''}">-->
    <nav id="navbar" class="navbar is-fixed-top ">


      <div class="navbar-brand">
        <h2 v-if="selectedCollection" class="title">
          {{selectedCollection.title}}
        </h2>
      </div>
      <router-link class="delete back-to-pool is-large" to="pool"></router-link>
      <router-link to="/pool" class="button is-primary back-to-pool is-right is-pulled-right">
        Restaurant list
      </router-link>

    </nav>

    <div class="container">
      <div class="restaurant-list" v-on:scroll="handleScroll($event)">
        <div class="grid-item" v-for="searchedRestaurant in searchedRestaurants">
          <restaurant-card v-bind:restaurant="searchedRestaurant"></restaurant-card>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import ZomatoService from "./../services/zomato.service";
  import RestaurantCard from "./../components/search/RestaurantCard.vue";

  export default {
    components: {
      RestaurantCard,
    },
    name: 'ExploreRestaurant',
    data() {
      return {
        collection: null
      }
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

      panelFiltersIsCollapsed: function () {
        return this.$store.state.ui.panelFiltersIsCollapsed
      },

      selectedCollection: function () {

        let selectedCollection = this.$store.state.explorePage.collections.filter((collection) => {
          return collection.collection_id.toString() === this.$route.params.id
        });

        if (selectedCollection.length > 0) {
          return selectedCollection[0]
        }

        return null
      }
    },
    mounted() {
      console.log(this.$route);

      if (!this.selectedCollection) {
        ZomatoService.getCollections().then(
          (response) => {
            console.log(response.data);
            this.$store.commit('setCollections', response.data.collections.map((item) => item.collection));
          }
        );
      }

      ZomatoService.getCollection(this.$route.params.id)
        .then(
          (response) => {
            console.log(response.data);
            this.Collection = response.data;
            this.$store.commit('setSearchRestaurant', response.data.restaurants.map((item) => item.restaurant));
            this.$store.commit('setSearchRestaurantPage', {
              step: response.data.results_shown,
              start: response.data.results_start
            });
          }
        );
    }
  }
</script>
<style scoped lang="scss">
  @import "./../variables";

  .hero {
    background-color: #e7004d;
    /*background-position: center;*/
    /*background-repeat: no-repeat;*/
    /*background-size: cover;*/
  }

  .collection-list {
    /*overflow: hidden;*/
    margin-top: 125px;
  }

  .restaurant-list {
    display: grid;
    overflow: auto;
    .grid-item {
      padding: 10px;
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

  .navbar {
    padding: 10px 1.5rem;
    background-color: $d-black;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .delete.back-to-pool {
      display: none;
      @include breakpoint(mobileonly) {
        display: block;
      }
    }

    .back-to-pool.button {
      @include breakpoint(mobileonly) {
        display: none;
      }
    }
  }
</style>
